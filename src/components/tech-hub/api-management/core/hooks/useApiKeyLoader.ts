
import { useCallback } from 'react';

interface ApiKeyLoaderOptions {
  initialModel: string;
  initialConfig: Record<string, any>;
  loadFromLocalStorage: (initialModel: string, initialConfig: Record<string, any>) => { 
    key: string | null;
    model: string;
    config: Record<string, any>;
  };
  loadFromDatabase: (initialModel: string, initialConfig: Record<string, any>) => Promise<{
    key: string | null;
    model: string;
    config: Record<string, any>;
  }>;
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
    try {
      // Mark as loading
      setState({ isLoaded: false });
      
      // First try localStorage
      const { key: savedKey, model: savedModel, config: savedConfig } = loadFromLocalStorage(initialModel, initialConfig);
      
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
      
      if (dbResult && dbResult.key) {
        setState({
          apiKey: dbResult.key,
          preferredModel: dbResult.model,
          additionalConfig: dbResult.config,
          isLoaded: true
        });
        setSavedKey(true);
        return;
      }
      
      // If we reach here, no key was found in either location
      setState({ isLoaded: true });
    } catch (error) {
      console.error("Error loading API key:", error);
      // Always ensure we set loaded state even on error
      setState({ isLoaded: true });
    }
  }, [initialModel, initialConfig, loadFromLocalStorage, loadFromDatabase, setState, setSavedKey]);
  
  return { loadApiKey };
};
