
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ApiKeyStorageOptions {
  providerName: string;
}

/**
 * Hook for API key storage operations
 */
export const useApiKeyStorage = ({ providerName }: ApiKeyStorageOptions) => {
  const localStorageKeyName = `${providerName.toLowerCase()}-api-key`;
  const localStorageModelName = `${providerName.toLowerCase()}-preferred-model`;
  const localStorageConfigName = `${providerName.toLowerCase()}-additional-config`;
  
  const saveToLocalStorage = useCallback((key: string, model: string, config?: Record<string, any>) => {
    localStorage.setItem(localStorageKeyName, key);
    localStorage.setItem(localStorageModelName, model);
    
    if (config) {
      localStorage.setItem(localStorageConfigName, JSON.stringify(config));
    }
  }, [localStorageKeyName, localStorageModelName, localStorageConfigName]);

  const saveToDatabase = useCallback(async (key: string, model: string, config?: Record<string, any>) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Check if the record exists
        const { data, error } = await supabase
          .from('api_provider_settings')
          .select('id')
          .eq('provider_name', providerName.toLowerCase())
          .eq('user_id', session.user.id)
          .maybeSingle();
          
        const settingsData: {
          api_key: string;
          preferred_model: string;
          provider_name: string;
          user_id: string;
          updated_at: string;
          config?: Record<string, any>;
        } = {
          api_key: key,
          preferred_model: model,
          provider_name: providerName.toLowerCase(),
          user_id: session.user.id,
          updated_at: new Date().toISOString()
        };
        
        // Add config if the column exists and we have a value
        if (config) {
          try {
            // Check if the config column exists
            const { error: checkError } = await supabase.rpc(
              'column_exists',
              { 
                p_table: 'api_provider_settings' as string,
                p_column: 'config' as string
              }
            );
            
            if (!checkError) {
              settingsData.config = config;
            }
          } catch (e) {
            console.error("Error checking if config column exists:", e);
          }
        }

        if (!error && data) {
          // Update existing record
          const { error: updateError } = await supabase
            .from('api_provider_settings')
            .update(settingsData)
            .eq('id', data.id);
            
          if (updateError) {
            throw updateError;
          }
        } else {
          // Insert new record
          const { error: insertError } = await supabase
            .from('api_provider_settings')
            .insert(settingsData);
            
          if (insertError) {
            throw insertError;
          }
        }
        
        return true;
      }
    } catch (err) {
      console.error(`Error saving ${providerName} API key to database:`, err);
      throw err;
    }
    
    return false;
  }, [providerName]);

  const loadFromLocalStorage = useCallback((initialModel: string, initialConfig: Record<string, any>) => {
    const savedKey = localStorage.getItem(localStorageKeyName);
    const savedModel = localStorage.getItem(localStorageModelName) || initialModel;
    let savedConfig = { ...initialConfig };
    
    try {
      const localConfig = localStorage.getItem(localStorageConfigName);
      if (localConfig) {
        savedConfig = { ...savedConfig, ...JSON.parse(localConfig) };
      }
    } catch (e) {
      console.error("Error parsing saved config:", e);
    }
    
    return { savedKey, savedModel, savedConfig };
  }, [localStorageKeyName, localStorageModelName, localStorageConfigName]);

  const loadFromDatabase = useCallback(async (initialModel: string, initialConfig: Record<string, any>) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        try {
          const { data, error } = await supabase
            .from('api_provider_settings')
            .select('api_key, preferred_model, config')
            .eq('provider_name', providerName.toLowerCase())
            .eq('user_id', session.user.id)
            .maybeSingle();
            
          if (error) {
            if (error.message?.includes("column 'config' does not exist")) {
              // If config column doesn't exist, try a simpler query
              const { data: simpleData, error: simpleError } = await supabase
                .from('api_provider_settings')
                .select('api_key, preferred_model')
                .eq('provider_name', providerName.toLowerCase())
                .eq('user_id', session.user.id)
                .maybeSingle();
                
              if (!simpleError && simpleData) {
                // These are type-checked by TypeScript but we use optional chaining and type checking
                // for safety as we're dealing with potentially unknown data
                const apiKey = simpleData?.api_key || '';
                const preferredModel = simpleData?.preferred_model || initialModel;
                
                return {
                  apiKey,
                  preferredModel,
                  additionalConfig: { ...initialConfig },
                  found: Boolean(apiKey)
                };
              }
            }
            console.error(`Error loading ${providerName} API key:`, error);
            return null;
          } else if (data) {
            // Handle config if it exists in the database
            let configFromDb = { ...initialConfig };
            
            // These are type-checked by TypeScript but we use optional chaining and type checking
            // for safety as we're dealing with potentially unknown data
            if (data.config && typeof data.config === 'object') {
              configFromDb = { ...configFromDb, ...data.config };
            }
            
            return {
              apiKey: data?.api_key || '',
              preferredModel: data?.preferred_model || initialModel,
              additionalConfig: configFromDb,
              found: Boolean(data?.api_key)
            };
          }
        } catch (err) {
          console.error(`Error fetching ${providerName} API key:`, err);
        }
      }
    } catch (err) {
      console.error("Error checking authentication:", err);
    }
    
    return null;
  }, [providerName]);

  const clearFromStorage = useCallback(() => {
    localStorage.removeItem(localStorageKeyName);
    localStorage.removeItem(localStorageModelName);
    localStorage.removeItem(localStorageConfigName);
  }, [localStorageKeyName, localStorageModelName, localStorageConfigName]);
  
  return {
    saveToLocalStorage,
    saveToDatabase,
    loadFromLocalStorage,
    loadFromDatabase,
    clearFromStorage,
    storageKeys: {
      localStorageKeyName,
      localStorageModelName,
      localStorageConfigName
    }
  };
};
