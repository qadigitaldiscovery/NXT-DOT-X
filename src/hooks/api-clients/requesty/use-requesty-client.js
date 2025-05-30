import { useState, useCallback } from 'react';
import { sendRequestyMessage, streamRequestyMessage } from '@/utils/api-clients/requesty/client';
export const useRequestyClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const sendMessage = useCallback(async (messages, model) => {
        setIsLoading(true);
        setError(null);
        try {
            // Handle the case where a single string is passed instead of a messages array
            const formattedMessages = typeof messages === 'string'
                ? [{ role: 'user', content: messages }]
                : messages;
            return await sendRequestyMessage(formattedMessages, model);
        }
        catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to send message to Requesty'));
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    const streamMessage = useCallback(async function* (messages, model) {
        setIsLoading(true);
        setError(null);
        try {
            // Handle the case where a single string is passed instead of a messages array
            const formattedMessages = typeof messages === 'string'
                ? [{ role: 'user', content: messages }]
                : messages;
            yield* streamRequestyMessage(formattedMessages, model);
        }
        catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to stream message from Requesty'));
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    return {
        sendMessage,
        streamMessage,
        isLoading,
        error
    };
};
