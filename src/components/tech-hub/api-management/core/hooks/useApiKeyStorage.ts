import { useState } from 'react';
import { saveToLocalStorage, loadFromLocalStorage, clearFromLocalStorage } from './api-key-storage/localStorageUtils';
import { saveToDatabase, loadFromDatabase, deleteFromDatabase } from './api-key-storage/databaseUtils';
import { useAuth } from '@/context/AuthContext';
import { useUserPreferences } from '@/hooks/useUserPreferences';

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
  const { user } = useAuth();
  
  // Use user preferences for authenticated users
  const { preferences, setPreferences } = useUserPreferences({
    module: 'api_keys',
    key: options.providerName,
    defaultValue: null
  });
  
  // Save API key to localStorage and database
  const saveToLocalStorageWrapper = (
    apiKey: string, 
    preferredModel: string, 
    additionalConfig: Record<string, any> = {}
  ): boolean => {
    // Always save to localStorage as fallback
    const result = saveToLocalStorage(options.localStorageKey, apiKey, preferredModel, additionalConfig);
    
    // If authenticated, also save to user preferences
    if (user) {
      setPreferences({
        key: apiKey,
        model: preferredModel,
        config: additionalConfig,
        timestamp: Date.now()
      });
    }
    
    return result;
  };
  
  // Load API key from localStorage or user preferences
  const loadFromLocalStorageWrapper = (
    defaultModel: string,
    defaultConfig: Record<string, any> = {}
  ): { 
    key: string | null; 
    model: string; 
    config: Record<string, any>;
  } => {
    // If authenticated and we have preferences, use them
    if (user && preferences) {
      const prefData = preferences as any;
      return {
        key: prefData?.key || null,
        model: prefData?.model || defaultModel,
        config: prefData?.config || defaultConfig
      };
    }
    
    // Otherwise fall back to localStorage
    return loadFromLocalStorage(options.localStorageKey, defaultModel, defaultConfig);
  };

  // Clear API key from localStorage and user preferences
  const clearFromLocalStorageWrapper = (): boolean => {
    // Always clear localStorage
    const result = clearFromLocalStorage(options.localStorageKey);
    
    // If authenticated, also clear from user preferences
    if (user) {
      setPreferences(null);
    }
    
    return result;
  };
  
  // Keep the original database methods for compatibility
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
