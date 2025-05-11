
import { useState, useCallback } from 'react';
import { callOpenAI, processStream } from '@/utils/api-clients/openai/client';
import { ChatCompletionResponse } from '@/utils/api-clients/openai/types';

export const useOpenAIClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = useCallback(async (
    content: string,
    model: string = 'gpt-4o-mini',
    options: {
      temperature?: number;
      maxTokens?: number;
      systemPrompt?: string;
    } = {}
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const messages = [
        ...(options.systemPrompt ? [{ role: 'system' as const, content: options.systemPrompt }] : []),
        { role: 'user' as const, content }
      ];
      
      const result = await callOpenAI<ChatCompletionResponse>({
        endpoint: 'chat',
        payload: {
          model,
          messages,
          temperature: options.temperature,
          max_tokens: options.maxTokens
        }
      });
      
      return result.choices[0]?.message.content || '';
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to send message to OpenAI'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const streamMessage = useCallback(async function* (
    content: string,
    model: string = 'gpt-4o-mini',
    options: {
      temperature?: number;
      maxTokens?: number;
      systemPrompt?: string;
    } = {}
  ) {
    setIsLoading(true);
    setError(null);
    
    try {
      const messages = [
        ...(options.systemPrompt ? [{ role: 'system' as const, content: options.systemPrompt }] : []),
        { role: 'user' as const, content }
      ];
      
      const stream = await callOpenAI({
        endpoint: 'chat',
        payload: {
          model,
          messages,
          temperature: options.temperature,
          max_tokens: options.maxTokens,
          stream: true
        }
      });
      
      if (stream && typeof stream === 'object' && 'getReader' in stream) {
        yield* processStream(stream as unknown as ReadableStream<Uint8Array>);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to stream message from OpenAI'));
      throw err;
    } finally {
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
