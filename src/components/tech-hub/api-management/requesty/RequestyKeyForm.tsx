
import React from 'react';
import ApiKeyForm from '../core/ApiKeyForm';

const RequestyKeyForm: React.FC = () => {
  // Verify API key by making a simple call
  const verifyRequestyKey = async (apiKey: string): Promise<boolean> => {
    try {
      const response = await fetch("https://router.requesty.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [{ role: "system", content: "Hello, this is a test message to verify API key." }],
          max_tokens: 1
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error?.code === 'insufficient_quota' || errorData.error?.type === 'insufficient_quota') {
          throw new Error('quota_exceeded');
        }
        return false;
      }
      
      return true;
    } catch (error: any) {
      console.error("API key verification failed:", error);
      if (error.message === 'quota_exceeded') {
        throw error; // Let the parent component handle this specific error
      }
      return false;
    }
  };

  const modelOptions = [
    { value: 'openai/gpt-4o-mini', label: 'OpenAI GPT-4o Mini (Default)' },
    { value: 'openai/gpt-4o', label: 'OpenAI GPT-4o' },
    { value: 'anthropic/claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
    { value: 'anthropic/claude-3-opus', label: 'Claude 3 Opus' },
    { value: 'anthropic/claude-3-haiku', label: 'Claude 3 Haiku' },
    { value: 'mistral/mistral-large', label: 'Mistral Large' },
    { value: 'mistral/mistral-small', label: 'Mistral Small' },
    { value: 'meta/llama-3-70b', label: 'Llama 3 70B' },
    { value: 'meta/llama-3-8b', label: 'Llama 3 8B' }
  ];

  const additionalConfig = {
    streaming_default: true,
    max_tokens_default: 2048,
    temperature_default: 0.7,
    response_format: 'text'
  };

  return (
    <ApiKeyForm
      providerName="Requesty"
      apiKeyPlaceholder="rty-..."
      docsLink={{
        text: "Requesty API Keys page",
        url: "https://requesty.ai/dashboard/api-keys"
      }}
      onVerify={verifyRequestyKey}
      preferredModelOptions={modelOptions}
      initialModel="openai/gpt-4o-mini"
      footerText="Your API key is stored securely and never exposed to the browser. Visit the Requesty API Keys page to create a new key if needed."
      additionalConfig={additionalConfig}
    />
  );
};

export default RequestyKeyForm;
