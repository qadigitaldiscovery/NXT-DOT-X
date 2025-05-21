import { useState } from "react";
import { sendRequestyMessage } from "../api-clients/requesty/client";
// Hook for using Requesty in components
export const useRequestyClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const sendMessage = async (prompt, systemMessage) => {
        setIsLoading(true);
        setError(null);
        const messages = [
            ...(systemMessage ? [{ role: "system", content: systemMessage }] : []),
            { role: "user", content: prompt }
        ];
        try {
            const response = await sendRequestyMessage(messages);
            setIsLoading(false);
            return response;
        }
        catch (err) {
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
