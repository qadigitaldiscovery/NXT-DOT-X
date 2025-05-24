
import { useState, useCallback, useEffect } from 'react';
import OpenAI from 'openai';
import { toast } from 'sonner';

interface OpenAIClient {
  client: OpenAI | null;
  isValid: boolean;
  isValidating: boolean;
  error: string | null;
  validateKey: (key: string) => Promise<boolean>;
  sendMessage: (prompt: string, model?: string, options?: { systemPrompt?: string; temperature?: number }) => Promise<string>;
}

export const useOpenAIClient = (apiKey?: string): OpenAIClient => {
  const [client, setClient] = useState<OpenAI | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (apiKey) {
      validateKey(apiKey);
    }
  }, [apiKey]);

  const validateKey = useCallback(async (key: string): Promise<boolean> => {
    if (!key || key.trim() === '') {
      setError('API key is required');
      return false;
    }

    setIsValidating(true);
    setError(null);

    try {
      const testClient = new OpenAI({
        apiKey: key,
        dangerouslyAllowBrowser: true
      });

      await testClient.models.list();
      
      setClient(testClient);
      setIsValid(true);
      setError(null);
      
      toast.success('OpenAI API key validated successfully');
      return true;
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to validate API key';
      setError(errorMessage);
      setClient(null);
      setIsValid(false);
      
      toast.error(`OpenAI API key validation failed: ${errorMessage}`);
      return false;
    } finally {
      setIsValidating(false);
    }
  }, []);

  const sendMessage = useCallback(async (
    prompt: string, 
    model: string = 'gpt-4o-mini',
    options: { systemPrompt?: string; temperature?: number } = {}
  ): Promise<string> => {
    if (!client || !isValid) {
      throw new Error('OpenAI client not initialized or API key not valid');
    }

    try {
      const messages: any[] = [];
      
      if (options.systemPrompt) {
        messages.push({ role: 'system', content: options.systemPrompt });
      }
      
      messages.push({ role: 'user', content: prompt });

      const response = await client.chat.completions.create({
        model,
        messages,
        temperature: options.temperature || 0.7,
      });

      return response.choices[0]?.message?.content || 'No response received';
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to send message';
      throw new Error(errorMessage);
    }
  }, [client, isValid]);

  return {
    client,
    isValid,
    isValidating,
    error,
    validateKey,
    sendMessage
  };
};

// Also export as useOpenAI for backward compatibility
export const useOpenAI = useOpenAIClient;
