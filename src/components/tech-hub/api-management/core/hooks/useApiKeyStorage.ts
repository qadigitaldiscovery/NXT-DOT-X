
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Types for the local storage API key data
interface ApiKeyLocalData {
  key: string;
  model?: string;
  config?: Record<string, any>;
  timestamp: number; 
}

interface ApiKeyStorageOptions {
  providerName: string;
  localStorageKey: string;
}

/**
 * Hook for managing API key storage (localStorage and database)
 */
export const useApiKeyStorage = ({ 
  providerName,
  localStorageKey
}: ApiKeyStorageOptions) => {
  // Save key to localStorage
  const saveToLocalStorage = useCallback((
    apiKey: string, 
    preferredModel: string,
    additionalConfig?: Record<string, any>
  ) => {
    try {
      // Format the data for storage
      const storageData: ApiKeyLocalData = {
        key: apiKey,
        model: preferredModel,
        config: additionalConfig,
        timestamp: Date.now()
      };
      
      // Save to localStorage
      localStorage.setItem(localStorageKey, JSON.stringify(storageData));
      return true;
    } catch (error) {
      console.error(`Error saving ${providerName} API key to localStorage:`, error);
      return false;
    }
  }, [localStorageKey, providerName]);
  
  // Load key from localStorage
  const loadFromLocalStorage = useCallback((
    defaultModel: string,
    defaultConfig: Record<string, any> = {}
  ) => {
    try {
      // Get from localStorage
      const savedData = localStorage.getItem(localStorageKey);
      
      if (!savedData) {
        return {
          savedKey: null,
          savedModel: defaultModel,
          savedConfig: defaultConfig
        };
      }
      
      // Parse the data
      const parsedData = JSON.parse(savedData) as ApiKeyLocalData;
      
      return {
        savedKey: parsedData.key || null,
        savedModel: parsedData.model || defaultModel,
        savedConfig: parsedData.config || defaultConfig
      };
    } catch (error) {
      console.error(`Error loading ${providerName} API key from localStorage:`, error);
      return {
        savedKey: null,
        savedModel: defaultModel,
        savedConfig: defaultConfig
      };
    }
  }, [localStorageKey, providerName]);
  
  // Save key to database
  const saveToDatabase = useCallback(async (
    apiKey: string, 
    preferredModel: string, 
    additionalConfig?: Record<string, any>
  ) => {
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.info(`Not saving ${providerName} API key to database: User not authenticated`);
        return false;
      }
      
      // Check if record already exists for this user
      const { data: existing } = await supabase
        .from('api_provider_settings')
        .select('id')
        .eq('provider_name', providerName)
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (existing) {
        // Update existing record
        const { error } = await supabase
          .from('api_provider_settings')
          .update({
            api_key: apiKey,
            preferred_model: preferredModel,
            config: additionalConfig || {},
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id);
        
        if (error) {
          console.error(`Error updating ${providerName} API key in database:`, error);
          return false;
        }
      } else {
        // Insert new record
        const { error } = await supabase
          .from('api_provider_settings')
          .insert({
            provider_name: providerName,
            api_key: apiKey,
            preferred_model: preferredModel,
            config: additionalConfig || {},
            user_id: user.id,
          });
        
        if (error) {
          console.error(`Error inserting ${providerName} API key in database:`, error);
          return false;
        }
      }
      
      return true;
    } catch (error) {
      console.error(`Error saving ${providerName} API key to database:`, error);
      return false;
    }
  }, [providerName]);
  
  // Load key from database
  const loadFromDatabase = useCallback(async (
    defaultModel: string,
    defaultConfig: Record<string, any> = {}
  ) => {
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.info(`Not loading ${providerName} API key from database: User not authenticated`);
        return null;
      }
      
      // Query for the API key
      const { data, error } = await supabase
        .from('api_provider_settings')
        .select('*')
        .eq('provider_name', providerName)
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) {
        // If error is about missing column, it might be that the migration hasn't run yet
        if (error.message.includes('config')) {
          console.warn(`The 'config' column might be missing. Make sure migrations have run.`);
          // Try to get data without relying on the config column
          const { data: basicData } = await supabase
            .from('api_provider_settings')
            .select('api_key, preferred_model')
            .eq('provider_name', providerName)
            .eq('user_id', user.id)
            .maybeSingle();
          
          if (basicData) {
            return {
              apiKey: basicData.api_key,
              preferredModel: basicData.preferred_model || defaultModel,
              additionalConfig: defaultConfig,
              found: true
            };
          }
        } else {
          console.error(`Error loading ${providerName} API key from database:`, error);
        }
        return null;
      }
      
      if (!data) {
        return null;
      }
      
      return {
        apiKey: data.api_key,
        preferredModel: data.preferred_model || defaultModel,
        additionalConfig: data.config || defaultConfig,
        found: true
      };
    } catch (error) {
      console.error(`Error loading ${providerName} API key from database:`, error);
      return null;
    }
  }, [providerName]);
  
  // Clear key from localStorage and database
  const clearSavedKey = useCallback(async () => {
    try {
      // Clear from localStorage
      localStorage.removeItem(localStorageKey);
      
      // Check if user is authenticated for database operations
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { localCleared: true, dbCleared: false };
      }
      
      // Clear from database
      const { error } = await supabase
        .from('api_provider_settings')
        .delete()
        .eq('provider_name', providerName)
        .eq('user_id', user.id);
      
      if (error) {
        console.error(`Error clearing ${providerName} API key from database:`, error);
        return { localCleared: true, dbCleared: false };
      }
      
      toast.success(`${providerName} API key removed successfully`);
      return { localCleared: true, dbCleared: true };
    } catch (error) {
      console.error(`Error clearing ${providerName} API key:`, error);
      return { localCleared: false, dbCleared: false };
    }
  }, [localStorageKey, providerName]);
  
  return {
    saveToLocalStorage,
    loadFromLocalStorage,
    saveToDatabase,
    loadFromDatabase,
    clearSavedKey
  };
};
