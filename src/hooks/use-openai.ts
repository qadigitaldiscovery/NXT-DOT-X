
import { useState, useCallback, useRef, useEffect } from 'react';
import { callOpenAI, OpenAIResponse, processStream, OpenAIError } from '@/utils/openai-client';

// Custom hook for debouncing
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

// Cache for memoizing identical requests
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_TTL = 30000; // 30 seconds

// Types for the hook
interface UseOpenAIOptions<T extends OpenAIResponse> {
  endpoint: 'chat' | 'embeddings' | 'moderations';
  payload: any;
  apiKey: string;
  enabled?: boolean;
  debounceMs?: number;
}

interface UseOpenAIResult<T extends OpenAIResponse> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  abort: () => void;
}

// Main hook for OpenAI API calls
export function useOpenAI<T extends OpenAIResponse>({
  endpoint,
  payload,
  apiKey,
  enabled = true,
  debounceMs = 500
}: UseOpenAIOptions<T>): UseOpenAIResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Debounce the payload to prevent rapid calls
  const debouncedPayload = useDebounce(payload, debounceMs);
  
  // Generate cache key from request params
  const getCacheKey = useCallback(() => {
    return `${endpoint}:${JSON.stringify(debouncedPayload)}`;
  }, [endpoint, debouncedPayload]);
  
  const fetchData = useCallback(async () => {
    if (!apiKey || !enabled) return;
    
    // Check cache first
    const cacheKey = getCacheKey();
    const cachedResult = cache.get(cacheKey);
    if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_TTL) {
      setData(cachedResult.data);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Create abort controller for this request
      abortControllerRef.current = new AbortController();
      
      // Make the API call
      const result = await callOpenAI<T>({
        endpoint,
        payload: debouncedPayload,
        apiKey,
        signal: abortControllerRef.current.signal
      });
      
      // Handle streaming result separately
      if (endpoint === 'chat' && debouncedPayload.stream) {
        // The processing of the stream should be handled by the component
        setData(result);
      } else {
        // Cache the result
        cache.set(cacheKey, {
          data: result,
          timestamp: Date.now()
        });
        
        setData(result);
      }
    } catch (err) {
      if (!(err instanceof DOMException && err.name === 'AbortError')) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, enabled, endpoint, debouncedPayload, getCacheKey]);
  
  useEffect(() => {
    fetchData();
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);
  
  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);
  
  return { data, error, isLoading, abort };
}

// Helper hook for handling streaming responses
export function useOpenAIStream() {
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
