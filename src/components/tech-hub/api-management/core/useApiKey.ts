
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { 
  storeApiKey, 
  retrieveApiKey, 
  removeApiKey 
} from './hooks/api-key-storage/localStorageUtils';

interface ApiKeyState {
  apiKey: string;
  isKeySet: boolean;
  isVisible: boolean;
  config: Record<string, any>;
}

export function useApiKey(provider: string, initialConfig: Record<string, any> = {}) {
  const { toast } = useToast();
  
  const [state, setState] = useState<ApiKeyState>({
    apiKey: '',
    isKeySet: false,
    isVisible: false,
    config: initialConfig,
  });

  useEffect(() => {
    const storedData = retrieveApiKey(provider);
    if (storedData) {
      setState(prev => ({
        ...prev,
        apiKey: storedData.key,
        isKeySet: true,
        config: { ...initialConfig, ...(storedData.options || {}) }
      }));
    }
  }, [provider, initialConfig]);

  const setApiKey = (key: string) => {
    if (key) {
      storeApiKey(provider, key, state.config);
      setState(prev => ({ ...prev, apiKey: key, isKeySet: true }));
      toast({
        title: 'API Key Saved',
        description: `Your ${provider} API key has been saved securely.`,
      });
    } else {
      removeApiKey(provider);
      setState(prev => ({ ...prev, apiKey: '', isKeySet: false }));
      toast({
        title: 'API Key Removed',
        description: `Your ${provider} API key has been removed.`,
      });
    }
  };

  const toggleVisibility = () => {
    setState(prev => ({ ...prev, isVisible: !prev.isVisible }));
  };

  const updateConfig = (key: string, value: any) => {
    const updatedConfig = { ...state.config, [key]: value };
    setState(prev => ({ ...prev, config: updatedConfig }));
    
    // If key is set, update it in storage with the new config
    if (state.isKeySet) {
      storeApiKey(provider, state.apiKey, updatedConfig);
    }
  };

  return {
    apiKey: state.apiKey,
    isKeySet: state.isKeySet,
    isVisible: state.isVisible,
    config: state.config,
    setApiKey,
    toggleVisibility,
    updateConfig,
  };
}
