
import { useCallback, useEffect, useState } from 'react';
import { useApiKeyState } from './hooks/useApiKeyState';
import { useApiKeyStorage } from './hooks/useApiKeyStorage';
import { useApiKeyVerification } from './hooks/useApiKeyVerification';
import { useApiKeyLoader } from './hooks/useApiKeyLoader';

export interface ApiKeyOptions {
  providerName: string;
  localStorageKey?: string;
  initialModel: string;
  preferredModelOptions: Array<{value: string, label: string}>;
  additionalConfig?: Record<string, any>;
  onVerify?: (apiKey: string) => Promise<boolean>;
}

export const useApiKey = (options: ApiKeyOptions) => {
  const {
    state,
    keyStatus,
    setKeyStatus,
    activeTab,
    setActiveTab,
    savedKey,
    setSavedKey,
    setApiKey: stateSetApiKey,
    handleConfigChange,
    handleModelChange,
    handleInputChange,
    setLoading,
    setVerifying,
    setSaving,
    setSavedSuccessfully
  } = useApiKeyState({
    initialModel: options.initialModel,
    additionalConfig: options.additionalConfig || {}
  });

  const [error, setError] = useState<Error | null>(null);
  // Track whether we've already tried to load
  const [hasTriedLoading, setHasTriedLoading] = useState(false);

  // Initialize storage methods
  const storageOptions = {
    providerName: options.providerName,
    localStorageKey: options.localStorageKey || `api_key_${options.providerName.toLowerCase()}`
  };
  
  const {
    saveToLocalStorage,
    loadFromLocalStorage,
    clearFromLocalStorage,
    saveToDatabase,
    loadFromDatabase,
    deleteFromDatabase,
    isSaving: isDbSaving,
    saveError: dbSaveError
  } = useApiKeyStorage(storageOptions);

  // Set up verification
  const { verifyApiKey: verifyKey } = useApiKeyVerification({
    providerName: options.providerName,
    onVerify: options.onVerify,
    saveToLocalStorage,
    saveToDatabase
  });

  // Set up data loading
  const { loadApiKey } = useApiKeyLoader({
    loadFromLocalStorage,
    loadFromDatabase,
    initialModel: options.initialModel,
    initialConfig: options.additionalConfig || {},
    setStateCallbacks: {
      setState: (updates) => {
        if (updates.apiKey !== undefined) stateSetApiKey(updates.apiKey);
        if (updates.preferredModel !== undefined) handleModelChange(updates.preferredModel);
        if (updates.additionalConfig !== undefined) {
          Object.entries(updates.additionalConfig).forEach(([key, value]) => {
            handleConfigChange(key, value);
          });
        }
        if (updates.isLoaded !== undefined) setLoading(!updates.isLoaded);
      },
      setSavedKey: setSavedKey
    }
  });

  // Load API key on component mount - with guard against infinite loops
  useEffect(() => {
    const loadData = async () => {
      if (!hasTriedLoading && !state.isLoaded) {
        console.log('Loading API key data...');
        setHasTriedLoading(true);
        try {
          await loadApiKey();
        } catch (err) {
          console.error("Failed to load API key:", err);
        } finally {
          // Ensure loading state is completed regardless of outcome
          setLoading(false);
        }
      }
    };
    
    loadData();
  }, [loadApiKey, state.isLoaded, hasTriedLoading, setLoading]);

  // Clear API key
  const clearApiKey = useCallback(() => {
    stateSetApiKey('');
    setKeyStatus('unknown');
    clearFromLocalStorage();
    return deleteFromDatabase();
  }, [stateSetApiKey, setKeyStatus, clearFromLocalStorage, deleteFromDatabase]);

  // Verify and save API key
  const verifyApiKey = useCallback(async () => {
    if (!state.apiKey) {
      setError(new Error('API key is required'));
      return false;
    }

    return await verifyKey(
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
    state.apiKey,
    state.preferredModel,
    state.additionalConfig,
    verifyKey,
    setVerifying,
    setSaving,
    setSavedKey,
    setKeyStatus,
    setSavedSuccessfully
  ]);

  // Update model separately
  const updateModel = useCallback(async (model: string) => {
    handleModelChange(model);
    if (state.apiKey) {
      saveToLocalStorage(state.apiKey, model, state.additionalConfig);
      await saveToDatabase(state.apiKey, model, state.additionalConfig);
    }
  }, [state.apiKey, state.additionalConfig, handleModelChange, saveToLocalStorage, saveToDatabase]);

  // Update config separately
  const updateAdvancedConfig = useCallback(async (config: Record<string, any>) => {
    Object.entries(config).forEach(([key, value]) => {
      handleConfigChange(key, value);
    });
    
    if (state.apiKey) {
      saveToLocalStorage(state.apiKey, state.preferredModel, config);
      await saveToDatabase(state.apiKey, state.preferredModel, config);
    }
  }, [state.apiKey, state.preferredModel, handleConfigChange, saveToLocalStorage, saveToDatabase]);

  return {
    apiKey: state.apiKey,
    setApiKey: stateSetApiKey,
    savedKey,
    isVerifying: state.isVerifying,
    isLoading: !state.isLoaded,
    isSaving: state.isSaving || isDbSaving,
    error: error || dbSaveError,
    keyStatus,
    model: state.preferredModel,
    advancedConfig: state.additionalConfig,
    activeTab,
    setActiveTab,
    verifyApiKey,
    clearApiKey,
    handleModelChange: updateModel,
    updateAdvancedConfig
  };
};
