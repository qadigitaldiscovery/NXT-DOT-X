
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
    } catch (error) {
      console.error("API key verification failed:", error);
      if (error.message === 'quota_exceeded') {
        throw error; // Let the parent component handle this specific error
      }
      return false;
    }
  };

  const modelOptions = [
    { value: 'openai/gpt-4o-mini', label: 'OpenAI GPT-4o Mini' },
    { value: 'openai/gpt-4o', label: 'OpenAI GPT-4o' },
    { value: 'anthropic/claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
    { value: 'mistral/mistral-large', label: 'Mistral Large' }
  ];

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
      footerText="Your API key is stored securely in the database and never exposed to the browser. Visit the Requesty API Keys page to create a new key if needed."
    />
  );
};

export default RequestyKeyForm;
