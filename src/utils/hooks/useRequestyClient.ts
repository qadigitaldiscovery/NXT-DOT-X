
import { useState } from "react";
import { sendRequestyMessage } from "../api-clients/requesty/client";
import { RequestyMessage } from "../api-clients/requesty/types";

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
