import { useState, useCallback, useEffect, useRef } from 'react';
import { callOpenAI } from '@/utils/api-clients/openai/client';
const cache = new Map();
const CACHE_TTL = 30000; // 30 seconds
// Main hook for OpenAI API calls with automatic fetching
export function useOpenAIQuery({ endpoint, payload, apiKey, enabled = true, cacheKey }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCached, setIsCached] = useState(false);
    const abortControllerRef = useRef(null);
    // Generate cache key from request params if not provided
    const derivedCacheKey = cacheKey || `${endpoint}:${JSON.stringify(payload)}`;
    const fetchData = useCallback(async () => {
        if (!apiKey || !enabled)
            return;
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
            const result = await callOpenAI({
                endpoint,
                payload,
                apiKey,
                signal: abortControllerRef.current.signal
            });
            // Handle streaming result separately
            if (endpoint === 'chat' && payload.stream) {
                // The processing of the stream should be handled separately
                setData(result);
            }
            else {
                // Cache the result
                cache.set(derivedCacheKey, {
                    data: result,
                    timestamp: Date.now()
                });
                setData(result);
            }
        }
        catch (err) {
            if (!(err instanceof DOMException && err.name === 'AbortError')) {
                setError(err instanceof Error ? err : new Error('Unknown error'));
            }
        }
        finally {
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
