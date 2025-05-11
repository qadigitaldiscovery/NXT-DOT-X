
import { useCallback } from 'react';
import { useApiKeyState } from './hooks/useApiKeyState';
import { useApiKeyStorage } from './hooks/useApiKeyStorage';
import { useApiKeyVerification } from './hooks/useApiKeyVerification';
import { useApiKeyLoader } from './hooks/useApiKeyLoader';

export interface ApiKeyOptions {
  providerName: string;
  localStorageKey: string;
  initialModel: string;
  additionalConfig?: Record<string, any>;
}

export const useApiKey = (options: ApiKeyOptions) => {
  // Initialize state management
  const {
    apiKey,
    setApiKey,
    preferredModel,
    setPreferredModel,
    additionalConfig,
    setAdditionalConfig,
    isLoading,
    setIsLoading,
    error,
    setError,
    isVerified,
    setIsVerified,
    isDbSaved,
    setIsDbSaved,
    isSaving,
    setIsSaving
  } = useApiKeyState();

  // Initialize storage methods
  const storageOptions = {
    providerName: options.providerName,
    localStorageKey: options.localStorageKey
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
  const { verifyApiKey, isVerifying, verificationError } = useApiKeyVerification();

  // Set up data loading
  const { loadApiKey } = useApiKeyLoader({
    loadFromLocalStorage,
    loadFromDatabase,
    setApiKey,
    setPreferredModel,
    setAdditionalConfig,
    setIsLoading,
    setIsDbSaved,
    initialModel: options.initialModel,
    initialConfig: options.additionalConfig || {}
  });

  // Clear API key
  const clearApiKey = useCallback(() => {
    setApiKey('');
    setIsVerified(false);
    clearFromLocalStorage();
    return deleteFromDatabase();
  }, [setApiKey, setIsVerified, clearFromLocalStorage, deleteFromDatabase]);

  // Save API key
  const saveApiKey = useCallback(async (
    key: string,
    model: string = options.initialModel,
    config: Record<string, any> = {}
  ) => {
    setIsSaving(true);
    setError(null);
    
    try {
      // Set state
      setApiKey(key);
      setPreferredModel(model);
      setAdditionalConfig(config);
      
      // Save to localStorage
      saveToLocalStorage(key, model, config);
      
      // Try to save to database if available
      const dbSaved = await saveToDatabase(key, model, config);
      setIsDbSaved(dbSaved);
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save API key'));
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [
    setApiKey, 
    setPreferredModel, 
    setAdditionalConfig, 
    saveToLocalStorage, 
    saveToDatabase,
    setIsDbSaved,
    options.initialModel,
    setIsSaving,
    setError
  ]);

  // Verify and save API key
  const verifyAndSaveApiKey = useCallback(async (
    key: string, 
    model: string = options.initialModel,
    config: Record<string, any> = {}
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Verify the API key
      const verified = await verifyApiKey(key);
      setIsVerified(verified);
      
      if (verified) {
        // If verified, save the key
        await saveApiKey(key, model, config);
        return true;
      } else {
        setError(new Error('API key verification failed'));
        return false;
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('API key verification failed');
      setError(error);
      setIsVerified(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [
    verifyApiKey,
    saveApiKey,
    setIsVerified,
    setError,
    setIsLoading,
    options.initialModel
  ]);

  return {
    apiKey,
    preferredModel,
    additionalConfig,
    isLoading: isLoading || isVerifying || isDbSaving,
    isSaving: isSaving || isDbSaving,
    error: error || verificationError || dbSaveError,
    isVerified,
    isDbSaved,
    loadApiKey,
    saveApiKey,
    verifyApiKey: verifyAndSaveApiKey,
    clearApiKey,
    updatePreferredModel: async (model: string) => {
      setPreferredModel(model);
      if (apiKey) {
        return await saveApiKey(apiKey, model, additionalConfig);
      }
      return false;
    },
    updateAdditionalConfig: async (config: Record<string, any>) => {
      setAdditionalConfig(config);
      if (apiKey) {
        return await saveApiKey(apiKey, preferredModel, config);
      }
      return false;
    }
  };
};
