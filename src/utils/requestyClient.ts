
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

// Interface for the chat completion request
interface RequestyChatCompletionRequest {
  messages: {
    role: "system" | "user" | "assistant";
    content: string;
  }[];
  model?: string;
}

// Interface for the chat completion response
interface RequestyChatCompletionResponse {
  choices: {
    message: {
      content: string;
      role: string;
    };
    index: number;
  }[];
}

// Get API key from storage or database
const getApiKey = async (): Promise<{ key: string | null, model: string | null }> => {
  // Try to get from database first if user is logged in
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    const { data, error } = await supabase
      .from('api_provider_settings')
      .select('api_key, preferred_model')
      .eq('provider_name', 'requesty')
      .maybeSingle();
      
    if (!error && data?.api_key) {
      return { 
        key: data.api_key,
        model: data.preferred_model || 'openai/gpt-4o-mini'
      };
    }
  }
  
  // Fallback to localStorage if no key in DB or user not logged in
  return { 
    key: localStorage.getItem('requesty-api-key'), 
    model: localStorage.getItem('requesty-preferred-model') || 'openai/gpt-4o-mini' 
  };
};

/**
 * Sends a request to the Requesty API
 */
export const sendRequestyMessage = async (
  messages: RequestyChatCompletionRequest["messages"],
  model?: string
): Promise<string> => {
  try {
    // Get API key from database or local storage
    const { key: apiKey, model: preferredModel } = await getApiKey();
    
    if (!apiKey) {
      toast.error("Requesty API key not configured. Please add your API key in the settings.");
      throw new Error("API key not configured");
    }

    // Use specified model or fallback to preferred model
    const modelToUse = model || preferredModel || "openai/gpt-4o-mini";
    
    // First try to use our secure proxy if available
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Call via the edge function for better security
        const { data, error } = await supabase.functions.invoke('api-proxy', {
          body: {
            provider: 'requesty',
            endpoint: 'chat/completions',
            payload: {
              model: modelToUse,
              messages
            }
          }
        });
        
        if (!error) {
          return data.choices[0].message.content;
        }
        
        // If the edge function fails, fall back to direct API call
        console.warn("Edge function failed, falling back to direct API call", error);
      }
    } catch (err) {
      console.warn("Could not use edge function, falling back to direct API call", err);
    }

    // Fallback to direct API call
    const response = await fetch("https://router.requesty.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelToUse,
        messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to get response from Requesty");
    }

    const data = await response.json() as RequestyChatCompletionResponse;
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling Requesty API:", error);
    toast.error("Failed to get a response from Requesty");
    throw error;
  }
};

// Hook for using Requesty in components
export const useRequestyClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (prompt: string, systemMessage?: string) => {
    setIsLoading(true);
    setError(null);
    
    const messages = [
      ...(systemMessage ? [{ role: "system" as const, content: systemMessage }] : []),
      { role: "user" as const, content: prompt }
    ];
    
    try {
      const response = await sendRequestyMessage(messages);
      setIsLoading(false);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setIsLoading(false);
      throw err;
    }
  };

  return {
    sendMessage,
    isLoading,
    error
  };
};
