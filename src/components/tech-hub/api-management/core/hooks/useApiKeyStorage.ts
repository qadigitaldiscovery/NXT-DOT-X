
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ApiKeyStorageOptions {
  providerName: string;
  localStorageKey: string;
}

export const useApiKeyStorage = (options: ApiKeyStorageOptions) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<Error | null>(null);
  
  // Save API key to localStorage
  const saveToLocalStorage = (
    apiKey: string, 
    preferredModel: string, 
    additionalConfig: Record<string, any> = {}
  ): boolean => {
    try {
      localStorage.setItem(options.localStorageKey, JSON.stringify({
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
  
  // Load API key from localStorage
  const loadFromLocalStorage = (
    defaultModel: string,
    defaultConfig: Record<string, any> = {}
  ): { 
    key: string | null; 
    model: string; 
    config: Record<string, any>;
  } => {
    try {
      const data = localStorage.getItem(options.localStorageKey);
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

  // Clear API key from localStorage
  const clearFromLocalStorage = (): boolean => {
    try {
      localStorage.removeItem(options.localStorageKey);
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  };
  
  // Save API key to database
  const saveToDatabase = async (
    apiKey: string, 
    preferredModel: string,
    additionalConfig: Record<string, any> = {}
  ): Promise<boolean> => {
    setIsSaving(true);
    setSaveError(null);
    
    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('User is not authenticated');
      }
      
      // Check if record exists
      const { data: existingData, error: queryError } = await supabase
        .from('api_provider_settings')
        .select('id')
        .eq('provider_name', options.providerName)
        .eq('user_id', session.user.id)
        .maybeSingle();
      
      if (queryError && !queryError.message.includes('column')) {
        throw new Error(`Database query error: ${queryError.message}`);
      }
      
      if (existingData) {
        // Update existing record
        const { error } = await supabase
          .from('api_provider_settings')
          .update({
            api_key: apiKey,
            preferred_model: preferredModel,
            // Only include config if the column exists
            ...(await columnExists('api_provider_settings', 'config') 
                ? { config: additionalConfig } 
                : {})
          })
          .eq('id', existingData.id);
        
        if (error) throw new Error(`Database update error: ${error.message}`);
      } else {
        // Insert new record
        const insertData: any = {
          provider_name: options.providerName,
          user_id: session.user.id,
          api_key: apiKey,
          preferred_model: preferredModel
        };

        // Only add config if the column exists
        if (await columnExists('api_provider_settings', 'config')) {
          insertData.config = additionalConfig;
        }
        
        const { error } = await supabase
          .from('api_provider_settings')
          .insert(insertData);
        
        if (error) throw new Error(`Database insert error: ${error.message}`);
      }
      
      return true;
    } catch (error: any) {
      console.error('Error saving to database:', error);
      setSaveError(error instanceof Error ? error : new Error(error.message || 'Unknown error'));
      return false;
    } finally {
      setIsSaving(false);
    }
  };
  
  // Helper function to check if a column exists in a table
  const columnExists = async (table: string, column: string): Promise<boolean> => {
    try {
      // Try a simple query with the column
      const { error } = await supabase
        .from(table)
        .select(column)
        .limit(1);
      
      // If there's an error about the column not existing, return false
      if (error && error.message.includes(`column '${column}' does not exist`)) {
        return false;
      }
      
      // If there's no error related to the column not existing, assume it exists
      return true;
    } catch (error) {
      console.error(`Error checking if column ${column} exists in ${table}:`, error);
      return false;
    }
  };
  
  // Load API key from database
  const loadFromDatabase = async (
    defaultModel: string,
    defaultConfig: Record<string, any> = {}
  ): Promise<{ 
    key: string | null; 
    model: string;
    config: Record<string, any>;
  }> => {
    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        return { key: null, model: defaultModel, config: defaultConfig };
      }
      
      // Determine if the config column exists
      const hasConfigColumn = await columnExists('api_provider_settings', 'config');
      
      // Query database with appropriate columns
      const selectQuery = hasConfigColumn 
        ? 'api_key, preferred_model, config' 
        : 'api_key, preferred_model';
      
      const { data, error } = await supabase
        .from('api_provider_settings')
        .select(selectQuery)
        .eq('provider_name', options.providerName)
        .eq('user_id', session.user.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error loading from database:', error);
        return { key: null, model: defaultModel, config: defaultConfig };
      }
      
      if (data) {
        return { 
          key: data.api_key, 
          model: data.preferred_model || defaultModel,
          config: hasConfigColumn ? (data.config || defaultConfig) : defaultConfig
        };
      }
    } catch (error) {
      console.error('Error loading from database:', error);
    }
    
    return { key: null, model: defaultModel, config: defaultConfig };
  };

  // Delete API key from database
  const deleteFromDatabase = async (): Promise<boolean> => {
    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        return false;
      }
      
      // Delete from database
      const { error } = await supabase
        .from('api_provider_settings')
        .delete()
        .eq('provider_name', options.providerName)
        .eq('user_id', session.user.id);
      
      if (error) {
        console.error('Error deleting from database:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting from database:', error);
      return false;
    }
  };
  
  return {
    saveToLocalStorage,
    loadFromLocalStorage,
    clearFromLocalStorage,
    saveToDatabase,
    loadFromDatabase,
    deleteFromDatabase,
    isSaving,
    saveError
  };
};
