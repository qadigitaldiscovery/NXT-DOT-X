
import { useState } from 'react';
import { saveToLocalStorage, loadFromLocalStorage, clearFromLocalStorage } from './api-key-storage/localStorageUtils';

export const useApiKeyStorage = (providerKey: string, defaultModel: string = '', defaultConfig: Record<string, any> = {}) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [model, setModel] = useState<string>(defaultModel);
  const [additionalConfig, setAdditionalConfig] = useState<Record<string, any>>(defaultConfig);

  // Load the API key from storage on component mount
  const loadApiKey = () => {
    const storedData = loadFromLocalStorage(providerKey, defaultModel, defaultConfig);
    setApiKey(storedData.key || '');
    setModel(storedData.model || defaultModel);
    setAdditionalConfig(storedData.config || defaultConfig);
  };

  // Save the API key to storage
  const saveApiKey = (newKey: string, newModel: string = model, newConfig: Record<string, any> = additionalConfig) => {
    saveToLocalStorage(providerKey, newKey, newModel, newConfig);
    setApiKey(newKey);
    setModel(newModel);
    setAdditionalConfig(newConfig);
    return true; // Return true to fix the TS2322 error
  };

  // Clear the API key from storage
  const clearApiKey = () => {
    clearFromLocalStorage(providerKey);
    setApiKey('');
    setModel(defaultModel);
    setAdditionalConfig(defaultConfig);
    return true; // Return true to fix the TS2322 error
  };

  // Update just the model without changing the key
  const updateModel = (newModel: string) => {
    saveToLocalStorage(providerKey, apiKey, newModel, additionalConfig);
    setModel(newModel);
  };

  // Update additional configuration
  const updateConfig = (newConfig: Record<string, any>) => {
    const updatedConfig = { ...additionalConfig, ...newConfig };
    saveToLocalStorage(providerKey, apiKey, model, updatedConfig);
    setAdditionalConfig(updatedConfig);
  };

  return {
    apiKey,
    model,
    additionalConfig,
    loadApiKey,
    saveApiKey,
    clearApiKey,
    updateModel,
    updateConfig
  };
};
