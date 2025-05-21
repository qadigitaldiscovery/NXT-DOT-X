import { useState, useCallback } from 'react';
import { processStream } from '@/utils/api-clients/openai/client';
// Helper hook for handling streaming responses
export function useOpenAIStream() {
    const [chunks, setChunks] = useState([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const processStreamResponse = useCallback(async (stream) => {
        setIsStreaming(true);
        setChunks([]);
        try {
            for await (const chunk of processStream(stream)) {
                setChunks(prev => [...prev, chunk]);
            }
        }
        catch (err) {
            console.error('Error processing stream:', err);
        }
        finally {
            setIsStreaming(false);
        }
    }, []);
    return {
        chunks,
        isStreaming,
        text: chunks.join(''),
        processStreamResponse,
        clearChunks: () => setChunks([])
    };
}
