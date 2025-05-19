
export const saveToLocalStorage = (key: string, apiKey: string, model: string, additionalConfig: Record<string, any> = {}) => {
  localStorage.setItem(key, JSON.stringify({
    key: apiKey,
    model,
    config: additionalConfig,
    timestamp: Date.now()
  }));
};

export const loadFromLocalStorage = (key: string, defaultModel: string, defaultConfig: Record<string, any> = {}) => {
  const storedData = localStorage.getItem(key);
  
  if (!storedData) {
    return { key: '', model: defaultModel, config: defaultConfig };
  }
  
  try {
    const parsed = JSON.parse(storedData);
    return {
      key: parsed.key || '',
      model: parsed.model || defaultModel,
      config: parsed.config || defaultConfig
    };
  } catch (error) {
    console.error('Error parsing stored API key data:', error);
    return { key: '', model: defaultModel, config: defaultConfig };
  }
};

export const clearFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

// Add aliases for the functions to support the API used in useApiKey.ts
export const storeApiKey = saveToLocalStorage;
export const retrieveApiKey = loadFromLocalStorage;
export const removeApiKey = clearFromLocalStorage;
