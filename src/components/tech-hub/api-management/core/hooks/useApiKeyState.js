import { useState } from 'react';
/**
 * Hook for managing API key state
 */
export const useApiKeyState = ({ initialModel = '', additionalConfig = {} }) => {
    const [state, setState] = useState({
        apiKey: '',
        preferredModel: initialModel,
        isSaving: false,
        isVerifying: false,
        isLoaded: false,
        isConfigVisible: false,
        savedSuccessfully: false,
        additionalConfig: { ...additionalConfig }
    });
    const [activeTab, setActiveTab] = useState('basic');
    const [keyStatus, setKeyStatus] = useState('unknown');
    const [savedKey, setSavedKey] = useState(false);
    const setApiKey = (value) => {
        setState(prev => ({ ...prev, apiKey: value }));
    };
    const handleConfigChange = (key, value) => {
        setState(prev => ({
            ...prev,
            additionalConfig: {
                ...prev.additionalConfig,
                [key]: value
            }
        }));
    };
    const handleModelChange = (value) => {
        setState(prev => ({ ...prev, preferredModel: value }));
    };
    const handleToggleConfig = () => {
        setState(prev => ({
            ...prev,
            isConfigVisible: !prev.isConfigVisible
        }));
    };
    const handleInputChange = (field, value) => {
        setState(prev => ({ ...prev, [field]: value }));
    };
    const setLoading = (isLoading) => {
        setState(prev => ({ ...prev, isLoaded: !isLoading }));
    };
    const setVerifying = (isVerifying) => {
        setState(prev => ({ ...prev, isVerifying }));
    };
    const setSaving = (isSaving) => {
        setState(prev => ({ ...prev, isSaving }));
    };
    const setSavedSuccessfully = (savedSuccessfully) => {
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
