
import { useState } from 'react';
import OpenAI from 'openai';

interface OpenAIHookReturn {
  client: OpenAI | null;
  isValid: boolean;
  isValidating: boolean;
  error: string | null;
  validateKey: (key: string) => Promise<boolean>;
  sendMessage: (message: string) => Promise<string>;
}

export const useOpenAI = (): OpenAIHookReturn => {
  const [client, setClient] = useState<OpenAI | null>(null);
  const [isValid, setIsValid] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateKey = async (key: string): Promise<boolean> => {
    setIsValidating(true);
    setError(null);
    
    try {
      const openai = new OpenAI({
        apiKey: key,
        dangerouslyAllowBrowser: true
      });
      
      // Test the API key with a simple request
      await openai.models.list();
      
      setClient(openai);
      setIsValid(true);
      setIsValidating(false);
      return true;
    } catch (err) {
      setError('Invalid API key');
      setIsValid(false);
      setClient(null);
      setIsValidating(false);
      return false;
    }
  };

  const sendMessage = async (message: string): Promise<string> => {
    if (!client) {
      throw new Error('OpenAI client not initialized');
    }

    try {
      const response = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        max_tokens: 150
      });

      return response.choices[0]?.message?.content || 'No response';
    } catch (err) {
      throw new Error('Failed to send message');
    }
  };

  return {
    client,
    isValid,
    isValidating,
    error,
    validateKey,
    sendMessage
  };
};
