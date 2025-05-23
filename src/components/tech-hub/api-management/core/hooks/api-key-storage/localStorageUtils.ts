
import { useUserPreferences } from '@/hooks/useUserPreferences';

/**
 * Save API key data to localStorage
 */
export const saveToLocalStorage = (
  localStorageKey: string,
  apiKey: string, 
  preferredModel: string, 
  additionalConfig: Record<string, any> = {}
): boolean => {
  try {
    localStorage.setItem(localStorageKey, JSON.stringify({
      key: apiKey,
      model: preferredModel,
      config: additionalConfig,
      timestamp: Date.now()
    }));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

/**
 * Load API key data from localStorage
 */
export const loadFromLocalStorage = (
  localStorageKey: string,
  defaultModel: string,
  defaultConfig: Record<string, any> = {}
): { 
  key: string | null; 
  model: string; 
  config: Record<string, any>;
} => {
  try {
    const data = localStorage.getItem(localStorageKey);
    if (data) {
      const parsed = JSON.parse(data);
      return { 
        key: parsed.key || null, 
        model: parsed.model || defaultModel,
        config: parsed.config || defaultConfig
      };
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  
  return { key: null, model: defaultModel, config: defaultConfig };
};

/**
 * Clear API key data from localStorage
 */
export const clearFromLocalStorage = (localStorageKey: string): boolean => {
  try {
    localStorage.removeItem(localStorageKey);
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};
