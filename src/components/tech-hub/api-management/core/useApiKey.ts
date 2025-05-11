
import { useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useApiKeyState, type ApiKeyState } from './hooks/useApiKeyState';
import { useApiKeyStorage } from './hooks/useApiKeyStorage';
import { useApiKeyVerification } from './hooks/useApiKeyVerification';
import { useApiKeyLoader } from './hooks/useApiKeyLoader';

export interface ApiKeyFormProps {
  providerName: string;
  apiKeyPlaceholder?: string;
  docsLink?: {
    text: string;
    url: string;
  };
  onVerify?: (apiKey: string) => Promise<boolean>;
  preferredModelOptions?: Array<{
    value: string;
    label: string;
  }>;
  initialModel?: string;
  footerText?: string;
  additionalConfig?: Record<string, any>;
}

/**
 * Main hook for API key management
 */
export const useApiKey = ({ 
  providerName,
  onVerify,
  initialModel = '',
  additionalConfig = {}
}: ApiKeyFormProps) => {
  // Get state management functions
  const {
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
  } = useApiKeyState({ 
    initialModel,
    additionalConfig 
  });

  // Get storage functions
  const {
    saveToLocalStorage,
    saveToDatabase,
    loadFromLocalStorage,
    loadFromDatabase,
    clearFromStorage
  } = useApiKeyStorage({ providerName });
  
  // Get verification functions
  const { verifyApiKey } = useApiKeyVerification({
    providerName,
    onVerify,
    saveToLocalStorage,
    saveToDatabase
  });

  // Set up a setState helper for the loader
  const setStateHelper = useCallback((updates: Partial<{
    apiKey: string;
    preferredModel: string;
    additionalConfig: Record<string, any>;
    isLoaded: boolean;
  }>) => {
    handleInputChange('apiKey', updates.apiKey || '');
    if (updates.preferredModel) handleModelChange(updates.preferredModel);
    if (updates.additionalConfig) handleInputChange('additionalConfig', updates.additionalConfig);
    if (updates.isLoaded !== undefined) setLoading(!updates.isLoaded);
  }, [handleInputChange, handleModelChange, setLoading]);

  // Get loader functions
  const { loadApiKey } = useApiKeyLoader({
    initialModel,
    initialConfig: additionalConfig,
    loadFromLocalStorage,
    loadFromDatabase,
    setStateCallbacks: {
      setState: setStateHelper,
      setSavedKey
    }
  });

  // Load API key data on mount
  useEffect(() => {
    loadApiKey();
  }, [loadApiKey]);

  // Helper function for clearing API key
  const clearApiKey = useCallback(() => {
    clearFromStorage();
    
    handleInputChange('apiKey', '');
    handleModelChange(initialModel);
    handleInputChange('additionalConfig', { ...additionalConfig });
    
    setSavedKey(false);
    setKeyStatus('unknown');
    
    toast.success(`${providerName} API key removed`);
  }, [clearFromStorage, handleInputChange, handleModelChange, initialModel, additionalConfig, setSavedKey, setKeyStatus, providerName]);

  // Handler for verification
  const handleVerifyApiKey = useCallback(() => {
    return verifyApiKey(
      state.apiKey, 
      state.preferredModel, 
      state.additionalConfig, 
      {
        setVerifying,
        setSaving,
        setSavedKey,
        setKeyStatus,
        setSavedSuccessfully
      }
    );
  }, [
    verifyApiKey, 
    state.apiKey, 
    state.preferredModel, 
    state.additionalConfig, 
    setVerifying, 
    setSaving, 
    setSavedKey, 
    setKeyStatus, 
    setSavedSuccessfully
  ]);

  // Return hook values and methods
  return {
    apiKey: state.apiKey,
    setApiKey,
    savedKey,
    isVerifying: state.isVerifying,
    isLoading: !state.isLoaded,
    keyStatus,
    model: state.preferredModel,
    activeTab,
    setActiveTab,
    advancedConfig: state.additionalConfig,
    verifyApiKey: handleVerifyApiKey,
    clearApiKey,
    handleModelChange,
    updateAdvancedConfig: handleConfigChange,
    state,
    handleInputChange,
    handleConfigChange,
    handleToggleConfig,
    verifyAndSave: handleVerifyApiKey,
    loadApiKey
  };
};

export default useApiKey;
