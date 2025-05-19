import { useState, useCallback } from 'react';
import { processStream } from '@/utils/api-clients/openai/client';

interface UseOpenAIStreamResult {
  chunks: string[];
  isStreaming: boolean;
  text: string;
  processStreamResponse: (stream: ReadableStream) => Promise<void>;
  clearChunks: () => void;
}

// Helper hook for handling streaming responses
export function useOpenAIStream(): UseOpenAIStreamResult {
  const [chunks, setChunks] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  
  const processStreamResponse = useCallback(async (stream: ReadableStream) => {
    setIsStreaming(true);
    setChunks([]);
    
    try {
      for await (const chunk of processStream(stream)) {
        setChunks(prev => [...prev, chunk]);
      }
    } catch (err) {
      console.error('Error processing stream:', err);
    } finally {
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
