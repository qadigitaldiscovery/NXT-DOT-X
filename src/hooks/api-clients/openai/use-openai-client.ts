
import { useState, useCallback, useEffect } from 'react';
import OpenAI from 'openai';
import { toast } from 'sonner';

interface OpenAIClient {
  client: OpenAI | null;
  isValid: boolean;
  isValidating: boolean;
  error: string | null;
  validateKey: (key: string) => Promise<boolean>;
}

export const useOpenAIClient = (apiKey?: string) => {
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

  return {
    client,
    isValid,
    isValidating,
    error,
    validateKey
  };
};

// Also export as useOpenAI for backward compatibility
export const useOpenAI = useOpenAIClient;
