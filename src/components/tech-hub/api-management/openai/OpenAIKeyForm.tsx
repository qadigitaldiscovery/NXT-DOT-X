
import React from 'react';
import ApiKeyForm from '../core/ApiKeyForm';
import { callOpenAI } from '@/utils/api-clients/openai/client';
import { ChatCompletionResponse } from '@/utils/api-clients/openai/types';

const OpenAIKeyForm: React.FC = () => {
  // Verify API key by making a simple call
  const verifyOpenAIKey = async (apiKey: string): Promise<boolean> => {
    try {
      await callOpenAI<ChatCompletionResponse>({
        endpoint: 'chat',
        payload: {
          model: 'gpt-4o-mini',
          messages: [{ role: "system", content: "Hello, this is a test message to verify API key." }],
          max_tokens: 1
        },
        apiKey
      });
      
      // If no error was thrown, the key is valid
      return true;
    } catch (error: any) {
      console.error("API key verification failed:", error);
      
      // Handle quota exceeded error separately
      if (error.message?.includes('quota') || 
          error.message?.includes('rate_limit') || 
          error.message?.includes('insufficient_quota')) {
        throw new Error('quota_exceeded');
      }
      
      return false;
    }
  };

  const modelOptions = [
    { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Default)' },
    { value: 'gpt-4o', label: 'GPT-4o' },
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { value: 'text-embedding-3-large', label: 'Text Embedding 3 Large' },
    { value: 'text-embedding-3-small', label: 'Text Embedding 3 Small' }
  ];

  const additionalConfig = {
    organization_id: '',
    max_tokens_default: 2048,
    temperature_default: 0.7,
    frequency_penalty_default: 0,
    presence_penalty_default: 0,
  };

  return (
    <ApiKeyForm
      providerName="OpenAI"
      apiKeyPlaceholder="sk-..."
      docsLink={{
        text: "OpenAI API Keys page",
        url: "https://platform.openai.com/api-keys"
      }}
      onVerify={verifyOpenAIKey}
      preferredModelOptions={modelOptions}
      initialModel="gpt-4o-mini"
      footerText="Your API key is stored securely and never exposed to the browser. Visit the OpenAI API Keys page to create a new key if needed."
      additionalConfig={additionalConfig}
    />
  );
};

export default OpenAIKeyForm;
