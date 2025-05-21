import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { storeApiKey, retrieveApiKey, removeApiKey } from './hooks/api-key-storage/localStorageUtils';
export function useApiKey(provider, initialConfig = {}) {
    const { toast } = useToast();
    const defaultModel = 'default'; // Default model if none is provided
    const [state, setState] = useState({
        apiKey: '',
        isKeySet: false,
        isVisible: false,
        model: defaultModel,
        config: initialConfig,
    });
    useEffect(() => {
        const storedData = retrieveApiKey(provider, defaultModel, initialConfig);
        if (storedData && storedData.key) {
            setState(prev => ({
                ...prev,
                apiKey: storedData.key,
                isKeySet: true,
                model: storedData.model || defaultModel,
                config: storedData.config || initialConfig
            }));
        }
    }, [provider, initialConfig, defaultModel]);
    const setApiKey = (key) => {
        if (key) {
            storeApiKey(provider, key, state.model, state.config);
            setState(prev => ({ ...prev, apiKey: key, isKeySet: true }));
            toast({
                description: `Your ${provider} API key has been saved securely.`,
            });
        }
        else {
            removeApiKey(provider);
            setState(prev => ({ ...prev, apiKey: '', isKeySet: false }));
            toast({
                description: `Your ${provider} API key has been removed.`,
            });
        }
    };
    const toggleVisibility = () => {
        setState(prev => ({ ...prev, isVisible: !prev.isVisible }));
    };
    const updateConfig = (key, value) => {
        const updatedConfig = { ...state.config, [key]: value };
        setState(prev => ({ ...prev, config: updatedConfig }));
        // If key is set, update it in storage with the new config
        if (state.isKeySet) {
            storeApiKey(provider, state.apiKey, state.model, updatedConfig);
        }
    };
    const updateModel = (model) => {
        setState(prev => ({ ...prev, model }));
        // If key is set, update it in storage with the new model
        if (state.isKeySet) {
            storeApiKey(provider, state.apiKey, model, state.config);
        }
    };
    return {
        apiKey: state.apiKey,
        isKeySet: state.isKeySet,
        isVisible: state.isVisible,
        model: state.model,
        config: state.config,
        setApiKey,
        toggleVisibility,
        updateConfig,
        updateModel,
    };
}
