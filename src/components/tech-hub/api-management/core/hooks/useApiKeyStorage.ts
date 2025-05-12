
import { useState } from 'react';
import { saveToLocalStorage, loadFromLocalStorage, clearFromLocalStorage } from './api-key-storage/localStorageUtils';
import { saveToDatabase, loadFromDatabase, deleteFromDatabase } from './api-key-storage/databaseUtils';

export interface ApiKeyStorageOptions {
  providerName: string;
  localStorageKey: string;
}

/**
 * Hook for API key storage operations
 */
export const useApiKeyStorage = (options: ApiKeyStorageOptions) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<Error | null>(null);
  
  // Save API key to localStorage
  const saveToLocalStorageWrapper = (
    apiKey: string, 
    preferredModel: string, 
    additionalConfig: Record<string, any> = {}
  ): boolean => {
    return saveToLocalStorage(options.localStorageKey, apiKey, preferredModel, additionalConfig);
  };
  
  // Load API key from localStorage
  const loadFromLocalStorageWrapper = (
    defaultModel: string,
    defaultConfig: Record<string, any> = {}
  ): { 
    key: string | null; 
    model: string; 
    config: Record<string, any>;
  } => {
    return loadFromLocalStorage(options.localStorageKey, defaultModel, defaultConfig);
  };

  // Clear API key from localStorage
  const clearFromLocalStorageWrapper = (): boolean => {
    return clearFromLocalStorage(options.localStorageKey);
  };
  
  // Save API key to database
  const saveToDatabaseWrapper = async (
    apiKey: string, 
    preferredModel: string,
    additionalConfig: Record<string, any> = {}
  ): Promise<boolean> => {
    setIsSaving(true);
    setSaveError(null);
    
    try {
      const result = await saveToDatabase(options.providerName, apiKey, preferredModel, additionalConfig);
      return result;
    } catch (error: any) {
      setSaveError(error instanceof Error ? error : new Error(error.message || 'Unknown error'));
      return false;
    } finally {
      setIsSaving(false);
    }
  };
  
  // Load API key from database
  const loadFromDatabaseWrapper = async (
    defaultModel: string,
    defaultConfig: Record<string, any> = {}
  ): Promise<{ 
    key: string | null; 
    model: string;
    config: Record<string, any>;
  }> => {
    return await loadFromDatabase(options.providerName, defaultModel, defaultConfig);
  };

  // Delete API key from database
  const deleteFromDatabaseWrapper = async (): Promise<boolean> => {
    return await deleteFromDatabase(options.providerName);
  };
  
  return {
    saveToLocalStorage: saveToLocalStorageWrapper,
    loadFromLocalStorage: loadFromLocalStorageWrapper,
    clearFromLocalStorage: clearFromLocalStorageWrapper,
    saveToDatabase: saveToDatabaseWrapper,
    loadFromDatabase: loadFromDatabaseWrapper,
    deleteFromDatabase: deleteFromDatabaseWrapper,
    isSaving,
    saveError
  };
};
