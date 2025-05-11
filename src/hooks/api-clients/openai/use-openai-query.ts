
import { useState, useCallback, useEffect, useRef } from 'react';
import { callOpenAI } from '@/utils/api-clients/openai/client';
import { OpenAIResponse } from '@/utils/api-clients/openai/types';

// Cache for memoizing identical requests
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_TTL = 30000; // 30 seconds

// Types for the hook
interface UseOpenAIQueryOptions<T extends OpenAIResponse> {
  endpoint: 'chat' | 'embeddings' | 'moderations';
  payload: any;
  apiKey: string;
  enabled?: boolean;
  cacheKey?: string;
}

interface UseOpenAIQueryResult<T extends OpenAIResponse> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  abort: () => void;
  refetch: () => Promise<void>;
  isCached: boolean;
}

// Main hook for OpenAI API calls with automatic fetching
export function useOpenAIQuery<T extends OpenAIResponse>({
  endpoint,
  payload,
  apiKey,
  enabled = true,
  cacheKey
}: UseOpenAIQueryOptions<T>): UseOpenAIQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCached, setIsCached] = useState<boolean>(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  
  // Generate cache key from request params if not provided
  const derivedCacheKey = cacheKey || `${endpoint}:${JSON.stringify(payload)}`;
  
  const fetchData = useCallback(async () => {
    if (!apiKey || !enabled) return;
    
    // Check cache first
    const cachedResult = cache.get(derivedCacheKey);
    if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_TTL) {
      setData(cachedResult.data);
      setIsCached(true);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setIsCached(false);
    
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
      
      // Handle streaming result separately
      if (endpoint === 'chat' && payload.stream) {
        // The processing of the stream should be handled separately
        setData(result);
      } else {
        // Cache the result
        cache.set(derivedCacheKey, {
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
  }, [apiKey, enabled, endpoint, payload, derivedCacheKey]);
  
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
  
  return { 
    data, 
    error, 
    isLoading, 
    abort, 
    refetch: fetchData,
    isCached
  };
}
