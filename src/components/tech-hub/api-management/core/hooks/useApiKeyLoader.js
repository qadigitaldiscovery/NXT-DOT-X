import { useCallback } from 'react';
/**
 * Hook for loading API key data
 */
export const useApiKeyLoader = ({ initialModel, initialConfig, loadFromLocalStorage, loadFromDatabase, setStateCallbacks }) => {
    const { setState, setSavedKey } = setStateCallbacks;
    const loadApiKey = useCallback(async () => {
        try {
            console.log("Loading API key...");
            // Mark as loading
            setState({ isLoaded: false });
            // First try localStorage
            const localStorageResult = loadFromLocalStorage(initialModel, initialConfig);
            const savedKey = localStorageResult.key;
            const savedModel = localStorageResult.model;
            const savedConfig = localStorageResult.config;
            if (savedKey) {
                console.log("Found API key in localStorage");
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
            console.log("No API key in localStorage, trying database...");
            const dbResult = await loadFromDatabase(initialModel, initialConfig);
            if (dbResult && dbResult.key) {
                console.log("Found API key in database");
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
            console.log("No API key found");
            setState({ isLoaded: true });
        }
        catch (error) {
            console.error("Error loading API key:", error);
            // Always ensure we set loaded state even on error
            setState({ isLoaded: true });
        }
    }, [initialModel, initialConfig, loadFromLocalStorage, loadFromDatabase, setState, setSavedKey]);
    return { loadApiKey };
};
