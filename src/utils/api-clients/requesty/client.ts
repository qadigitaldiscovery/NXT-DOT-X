
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { RequestyMessage } from './types';

// Get API key from storage or database
const getApiKey = async (): Promise<{ key: string | null, model: string | null, config: any | null }> => {
  // Try to get from localStorage first as it's simpler
  const localKey = localStorage.getItem('requesty-api-key');
  const localModel = localStorage.getItem('requesty-preferred-model');
  const localConfig = localStorage.getItem('requesty-additional-config');
  
  if (localKey) {
    let config = null;
    try {
      if (localConfig) {
        config = JSON.parse(localConfig);
      }
    } catch (e) {
      console.error("Error parsing config from localStorage:", e);
    }
    
    return { 
      key: localKey,
      model: localModel || 'openai/gpt-4o-mini',
      config 
    };
  }
  
  // Try to get from database if no key in localStorage
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      // First try with config column
      const { data, error } = await supabase
        .from('api_provider_settings')
        .select('api_key, preferred_model, config')
        .eq('provider_name', 'requesty')
        .eq('user_id', session.user.id)
        .maybeSingle();
        
      if (error) {
        // If error mentions missing config column, try simpler query
        if (error.message?.includes("column 'config' does not exist")) {
          const { data: simpleData, error: simpleError } = await supabase
            .from('api_provider_settings')
            .select('api_key, preferred_model')
            .eq('provider_name', 'requesty')
            .eq('user_id', session.user.id)
            .maybeSingle();
            
          if (!simpleError && simpleData && 'api_key' in simpleData) {
            return { 
              key: simpleData.api_key,
              model: 'preferred_model' in simpleData && simpleData.preferred_model ? simpleData.preferred_model : 'openai/gpt-4o-mini',
              config: null 
            };
          } else if (simpleError) {
            console.error("Error fetching API key with simple query:", simpleError);
          }
        } else {
          console.error("Error fetching API key:", error);
        }
      } else if (data) {
        return { 
          key: data.api_key,
          model: data.preferred_model || 'openai/gpt-4o-mini',
          config: data.config 
        };
      }
    }
  } catch (err) {
    console.error("Error fetching API key from database:", err);
  }
  
  return { 
    key: null, 
    model: 'openai/gpt-4o-mini',
    config: null
  };
};

/**
 * Sends a request to the Requesty API
 */
export const sendRequestyMessage = async (
  messages: RequestyMessage[],
  model?: string
): Promise<string> => {
  try {
    // Get API key from database or local storage
    const { key: apiKey, model: preferredModel, config } = await getApiKey();
    
    if (!apiKey) {
      toast.error("Requesty API key not configured. Please add your API key in the settings.");
      throw new Error("API key not configured");
    }

    // Use specified model or fallback to preferred model
    const modelToUse = model || preferredModel || "openai/gpt-4o-mini";
    
    // Build the request payload
    const payload: any = {
      model: modelToUse,
      messages,
    };
    
    // Add configuration options if available
    if (config) {
      if (config.max_tokens_default) {
        payload.max_tokens = config.max_tokens_default;
      }
      
      if (config.temperature_default !== undefined) {
        payload.temperature = config.temperature_default;
      }
      
      if (config.streaming_default !== undefined) {
        payload.stream = config.streaming_default;
      }
      
      if (config.response_format) {
        payload.response_format = { type: config.response_format };
      }
    }
    
    // First try to use our secure proxy if available
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Call via the edge function for better security
        const { data, error } = await supabase.functions.invoke('api-proxy', {
          body: {
            provider: 'requesty',
            endpoint: 'chat/completions',
            payload
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
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to get response from Requesty");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling Requesty API:", error);
    toast.error("Failed to get a response from Requesty");
    throw error;
  }
};

/**
 * Stream messages from Requesty API
 */
export async function* streamRequestyMessage(
  messages: RequestyMessage[],
  model?: string
): AsyncGenerator<string, void, unknown> {
  try {
    // Get API key from database or local storage
    const { key: apiKey, model: preferredModel, config } = await getApiKey();
    
    if (!apiKey) {
      toast.error("Requesty API key not configured. Please add your API key in the settings.");
      throw new Error("API key not configured");
    }

    // Use specified model or fallback to preferred model
    const modelToUse = model || preferredModel || "openai/gpt-4o-mini";
    
    // Build the request payload
    const payload: any = {
      model: modelToUse,
      messages,
      stream: true,
    };
    
    // Add configuration options if available
    if (config) {
      if (config.max_tokens_default) {
        payload.max_tokens = config.max_tokens_default;
      }
      
      if (config.temperature_default !== undefined) {
        payload.temperature = config.temperature_default;
      }
      
      if (config.response_format) {
        payload.response_format = { type: config.response_format };
      }
    }

    const response = await fetch("https://router.requesty.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to get response from Requesty");
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ') && line !== 'data: [DONE]') {
          const data = line.substring(6);
          try {
            const parsed = JSON.parse(data);
            if (parsed.choices && parsed.choices[0]?.delta?.content) {
              yield parsed.choices[0].delta.content;
            }
          } catch (e) {
            console.error('Error parsing stream data:', e);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error streaming from Requesty API:", error);
    toast.error("Failed to stream response from Requesty");
    throw error;
  }
}
