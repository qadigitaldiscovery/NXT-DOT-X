
import { useState } from 'react';

export interface ApiKeyState {
  apiKey: string;
  preferredModel: string;
  isSaving: boolean;
  isVerifying: boolean;
  isLoaded: boolean;
  isConfigVisible: boolean;
  savedSuccessfully: boolean;
  additionalConfig: Record<string, any>;
}

export interface ApiKeyStateOptions {
  initialModel: string;
  additionalConfig: Record<string, any>;
}

/**
 * Hook for managing API key state
 */
export const useApiKeyState = ({ 
  initialModel = '',
  additionalConfig = {}
}: ApiKeyStateOptions) => {
  const [state, setState] = useState<ApiKeyState>({
    apiKey: '',
    preferredModel: initialModel,
    isSaving: false,
    isVerifying: false,
    isLoaded: false,
    isConfigVisible: false,
    savedSuccessfully: false,
    additionalConfig: { ...additionalConfig }
  });
  
  const [activeTab, setActiveTab] = useState<string>('basic');
  const [keyStatus, setKeyStatus] = useState<'unknown' | 'valid' | 'invalid' | 'quota_exceeded'>('unknown');
  const [savedKey, setSavedKey] = useState<boolean>(false);
  
  const setApiKey = (value: string) => {
    setState(prev => ({ ...prev, apiKey: value }));
  };

  const handleConfigChange = (key: string, value: any) => {
    setState(prev => ({
      ...prev,
      additionalConfig: {
        ...prev.additionalConfig,
        [key]: value
      }
    }));
  };

  const handleModelChange = (value: string) => {
    setState(prev => ({ ...prev, preferredModel: value }));
  };

  const handleToggleConfig = () => {
    setState(prev => ({
      ...prev,
      isConfigVisible: !prev.isConfigVisible
    }));
  };
  
  const handleInputChange = (field: keyof ApiKeyState, value: string | boolean | Record<string, any>) => {
    setState(prev => ({ ...prev, [field]: value }));
  };
  
  const setLoading = (isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoaded: !isLoading }));
  };
  
  const setVerifying = (isVerifying: boolean) => {
    setState(prev => ({ ...prev, isVerifying }));
  };
  
  const setSaving = (isSaving: boolean) => {
    setState(prev => ({ ...prev, isSaving }));
  };
  
  const setSavedSuccessfully = (savedSuccessfully: boolean) => {
    setState(prev => ({ ...prev, savedSuccessfully }));
    
    if (savedSuccessfully) {
      // Reset after 3 seconds
      setTimeout(() => {
        setState(prev => ({ ...prev, savedSuccessfully: false }));
      }, 3000);
    }
  };
  
  return {
    state,
    keyStatus,
    setKeyStatus,
    activeTab,
    setActiveTab,
    savedKey,
    setSavedKey,
    setApiKey,
    handleConfigChange,
    handleModelChange,
    handleToggleConfig,
    handleInputChange,
    setLoading,
    setVerifying,
    setSaving,
    setSavedSuccessfully
  };
};
