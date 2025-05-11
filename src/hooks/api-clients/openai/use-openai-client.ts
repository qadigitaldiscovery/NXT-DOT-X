
import { useState, useCallback, useRef } from 'react';
import { callOpenAI } from '@/utils/api-clients/openai/client';
import { OpenAIResponse } from '@/utils/api-clients/openai/types';

// Types for the hook
interface UseOpenAIClientOptions<T extends OpenAIResponse> {
  endpoint: 'chat' | 'embeddings' | 'moderations';
  payload: any;
  apiKey?: string;
  enabled?: boolean;
}

interface UseOpenAIClientResult<T extends OpenAIResponse> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  abort: () => void;
  execute: () => Promise<void>;
}

// Main hook for OpenAI API calls
export function useOpenAIClient<T extends OpenAIResponse>({
  endpoint,
  payload,
  apiKey,
  enabled = false
}: UseOpenAIClientOptions<T>): UseOpenAIClientResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const execute = useCallback(async () => {
    if (!enabled) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Create abort controller for this request
      abortControllerRef.current = new AbortController();
      
      // Make the API call
      const result = await callOpenAI<T>({
        endpoint,
        payload,
        apiKey,
        signal: abortControllerRef.current.signal
      });
      
      setData(result);
    } catch (err) {
      if (!(err instanceof DOMException && err.name === 'AbortError')) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, enabled, endpoint, payload]);
  
  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);
  
  return { data, error, isLoading, abort, execute };
}
