
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ApiKeyForm from '../core/ApiKeyForm';
import { callOpenAI } from '@/utils/api-clients/openai/client';
import { ChatCompletionResponse } from '@/utils/api-clients/openai/types';

const OpenAIKeyForm: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [config, setConfig] = useState({
    model: 'gpt-4o-mini',
    temperature: 0.7,
    max_tokens: 2048,
    organization_id: ''
  });
  
  // Load saved key and config on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('openai_api_key');
    const savedConfig = localStorage.getItem('openai_config');
    
    if (savedKey) {
      setApiKey(savedKey);
    }
    
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(prev => ({ ...prev, ...parsedConfig }));
      } catch (e) {
        console.error("Failed to parse saved config", e);
      }
    }
  }, []);

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
      toast.success("API key validated successfully");
      
      // Save the key and config
      localStorage.setItem('openai_api_key', apiKey);
      localStorage.setItem('openai_config', JSON.stringify(config));
      
      return true;
    } catch (error: any) {
      console.error("API key verification failed:", error);
      
      // Handle quota exceeded error separately
      if (error.message?.includes('quota') || 
          error.message?.includes('rate_limit') || 
          error.message?.includes('insufficient_quota')) {
        toast.warning("API key valid but quota exceeded");
        return false;
      }
      
      toast.error("Invalid API key");
      return false;
    }
  };
  
  const handleConfigUpdate = (key: string, value: any) => {
    setConfig(prev => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem('openai_config', JSON.stringify(updated));
      return updated;
    });
  };

  const modelOptions = [
    { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Default)' },
    { value: 'gpt-4o', label: 'GPT-4o' },
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { value: 'text-embedding-3-large', label: 'Text Embedding 3 Large' },
    { value: 'text-embedding-3-small', label: 'Text Embedding 3 Small' }
  ];

  return (
    <ApiKeyForm
      providerName="OpenAI"
      apiKey={apiKey}
      isVisible={isVisible}
      config={config}
      onApiKeyChange={setApiKey}
      onVisibilityToggle={() => setIsVisible(!isVisible)}
      onConfigUpdate={handleConfigUpdate}
      apiKeyPlaceholder="sk-..."
      docsLink={{
        text: "OpenAI API Keys page",
        url: "https://platform.openai.com/api-keys"
      }}
      onVerify={verifyOpenAIKey}
      preferredModelOptions={modelOptions}
      initialModel="gpt-4o-mini"
      footerText="Your API key is stored securely and never exposed to the browser. Visit the OpenAI API Keys page to create a new key if needed."
    />
  );
};

export default OpenAIKeyForm;
