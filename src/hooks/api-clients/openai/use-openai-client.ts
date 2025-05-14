
import { useState, useCallback } from 'react';
import { createOpenAIClient } from './client';
import { useToast } from '@/components/ui/use-toast';

// Main hook for using OpenAI in components
export const useOpenAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Get API key - in a real app, this would be fetched securely
  const getApiKey = () => {
    // This is a simplified version; in production, you'd use a more secure method
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }
    return apiKey;
  };

  const sendMessage = useCallback(async (
    userMessage: string,
    model: string = 'gpt-4o-mini',
    options: {
      systemPrompt?: string,
      temperature?: number,
      maxTokens?: number
    } = {}
  ) => {
    const {
      systemPrompt = 'You are a helpful assistant.',
      temperature = 0.7,
      maxTokens = 1000
    } = options;

    setLoading(true);
    setError(null);

    try {
      const apiKey = getApiKey();
      const client = createOpenAIClient(apiKey);

      const response = await client.createChatCompletion({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature,
        max_tokens: maxTokens
      });

      return response.choices[0].message.content;
    } catch (err: any) {
      console.error('OpenAI API error:', err);
      const errorMessage = err.message || 'Failed to get response from AI';
      setError(errorMessage);
      toast({
        title: 'AI Request Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    sendMessage,
    loading,
    error
  };
};
