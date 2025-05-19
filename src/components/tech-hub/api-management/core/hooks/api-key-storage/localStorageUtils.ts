
import { useEffect } from 'react';

export const API_KEY_STORAGE_KEY = 'api_keys';

interface StoredApiKey {
  provider: string;
  key: string;
  options?: Record<string, any>;
}

export const storeApiKey = (provider: string, key: string, options?: Record<string, any>): void => {
  try {
    // Get existing keys
    const storedKeysJson = localStorage.getItem(API_KEY_STORAGE_KEY);
    const storedKeys: StoredApiKey[] = storedKeysJson ? JSON.parse(storedKeysJson) : [];
    
    // Check if key for this provider already exists
    const existingKeyIndex = storedKeys.findIndex(k => k.provider === provider);
    
    if (existingKeyIndex >= 0) {
      // Update existing key
      storedKeys[existingKeyIndex] = { provider, key, options };
    } else {
      // Add new key
      storedKeys.push({ provider, key, options });
    }
    
    // Save back to storage
    localStorage.setItem(API_KEY_STORAGE_KEY, JSON.stringify(storedKeys));
  } catch (error) {
    console.error('Error storing API key:', error);
  }
};

export const retrieveApiKey = (provider: string): { key: string; options?: Record<string, any> } | null => {
  try {
    const storedKeysJson = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (!storedKeysJson) return null;
    
    const storedKeys: StoredApiKey[] = JSON.parse(storedKeysJson);
    const keyData = storedKeys.find(k => k.provider === provider);
    
    return keyData ? { key: keyData.key, options: keyData.options } : null;
  } catch (error) {
    console.error('Error retrieving API key:', error);
    return null;
  }
};

export const removeApiKey = (provider: string): boolean => {
  try {
    const storedKeysJson = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (!storedKeysJson) return false;
    
    const storedKeys: StoredApiKey[] = JSON.parse(storedKeysJson);
    const updatedKeys = storedKeys.filter(k => k.provider !== provider);
    
    localStorage.setItem(API_KEY_STORAGE_KEY, JSON.stringify(updatedKeys));
    return true;
  } catch (error) {
    console.error('Error removing API key:', error);
    return false;
  }
};
