
import { useCallback } from 'react';

interface ApiKeyLoaderOptions {
  initialModel: string;
  initialConfig: Record<string, any>;
  loadFromLocalStorage: (initialModel: string, initialConfig: Record<string, any>) => { 
    savedKey: string | null;
    savedModel: string;
    savedConfig: Record<string, any>;
  };
  loadFromDatabase: (initialModel: string, initialConfig: Record<string, any>) => Promise<{
    apiKey: string;
    preferredModel: string;
    additionalConfig: Record<string, any>;
    found: boolean;
  } | null>;
  setStateCallbacks: {
    setState: (updates: Partial<{
      apiKey: string;
      preferredModel: string;
      additionalConfig: Record<string, any>;
      isLoaded: boolean;
    }>) => void;
    setSavedKey: (saved: boolean) => void;
  };
}

/**
 * Hook for loading API key data
 */
export const useApiKeyLoader = ({
  initialModel,
  initialConfig,
  loadFromLocalStorage,
  loadFromDatabase,
  setStateCallbacks
}: ApiKeyLoaderOptions) => {
  const { setState, setSavedKey } = setStateCallbacks;
  
  const loadApiKey = useCallback(async () => {
    // First try localStorage
    const { savedKey, savedModel, savedConfig } = loadFromLocalStorage(initialModel, initialConfig);
    
    if (savedKey) {
      setState({
        apiKey: savedKey,
        preferredModel: savedModel,
        additionalConfig: savedConfig,
        isLoaded: true
      });
      setSavedKey(true);
      return;
    }
    
    // Try to load from database if localStorage failed
    const dbResult = await loadFromDatabase(initialModel, initialConfig);
    
    if (dbResult) {
      setState({
        apiKey: dbResult.apiKey,
        preferredModel: dbResult.preferredModel,
        additionalConfig: dbResult.additionalConfig,
        isLoaded: true
      });
      setSavedKey(dbResult.found);
      return;
    }
    
    // If no data found anywhere, just set loaded state
    setState({ isLoaded: true });
  }, [initialModel, initialConfig, loadFromLocalStorage, loadFromDatabase, setState, setSavedKey]);
  
  return { loadApiKey };
};
