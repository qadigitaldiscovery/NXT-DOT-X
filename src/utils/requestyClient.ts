
// Requesty API client utility
import { useState } from "react";
import { toast } from "sonner";

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

/**
 * Sends a request to the Requesty API
 * Note: This should ideally be handled server-side through an edge function
 * to avoid exposing API keys in client-side code
 */
export const sendRequestyMessage = async (
  messages: RequestyChatCompletionRequest["messages"],
  model: string = "openai/gpt-4o"
): Promise<string> => {
  try {
    // In a production environment, this should be handled through a backend API or edge function
    // to avoid exposing the API key on the client side
    const response = await fetch("https://router.requesty.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // API key should be securely stored in a backend environment
        // This is just for demonstration - DO NOT use API keys directly in frontend code
        "Authorization": `Bearer ${process.env.REQUESTY_API_KEY || ""}`,
      },
      body: JSON.stringify({
        model,
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
