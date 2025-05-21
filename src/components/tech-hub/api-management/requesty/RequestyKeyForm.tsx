
import { useState, useEffect } from 'react';
import ApiKeyForm from '../core/ApiKeyForm';
import { toast } from 'sonner';

const RequestyKeyForm: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [config, setConfig] = useState({
    model: 'openai/gpt-4o-mini',
    temperature: 0.7,
    max_tokens: 2048,
    streaming: true
  });

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
          toast.warning("API key valid but quota exceeded");
          return false;
        }
        toast.error("Invalid API key");
        return false;
      }
      
      toast.success("API key validated successfully");
      // Save the key locally
      localStorage.setItem('requesty_api_key', apiKey);
      localStorage.setItem('requesty_config', JSON.stringify(config));
      return true;
    } catch (error: any) {
      console.error("API key verification failed:", error);
      if (error.message === 'quota_exceeded') {
        toast.warning("API key valid but quota exceeded");
      } else {
        toast.error("Failed to verify API key");
      }
      return false;
    }
  };

  const handleConfigUpdate = (key: string, value: any) => {
    setConfig(prev => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem('requesty_config', JSON.stringify(updated));
      return updated;
    });
  };

  // Initialize from localStorage if available
  useEffect(() => {
    const savedKey = localStorage.getItem('requesty_api_key');
    const savedConfig = localStorage.getItem('requesty_config');
    
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

  return (
    <ApiKeyForm
      providerName="Requesty"
      apiKey={apiKey}
      isVisible={isVisible}
      config={config}
      onApiKeyChange={setApiKey}
      onVisibilityToggle={() => setIsVisible(!isVisible)}
      onConfigUpdate={handleConfigUpdate}
      apiKeyPlaceholder="rty-..."
      docsLink={{
        text: "Requesty API Keys page",
        url: "https://requesty.ai/dashboard/api-keys"
      }}
      onVerify={verifyRequestyKey}
      preferredModelOptions={modelOptions}
      initialModel="openai/gpt-4o-mini"
      footerText="Your API key is stored securely and never exposed to the browser. Visit the Requesty API Keys page to create a new key if needed."
    />
  );
};

export default RequestyKeyForm;
