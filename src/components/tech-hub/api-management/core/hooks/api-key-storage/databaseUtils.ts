
import { supabase } from '@/integrations/supabase/client';
import { columnExists } from './dbUtils';

/**
 * Save API key data to the database
 */
export const saveToDatabase = async (
  providerName: string,
  apiKey: string, 
  preferredModel: string,
  additionalConfig: Record<string, any> = {}
): Promise<boolean> => {
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
      .eq('provider_name', providerName)
      .eq('user_id', session.user.id)
      .maybeSingle();
    
    if (queryError && !queryError.message.includes('column')) {
      throw new Error(`Database query error: ${queryError.message}`);
    }
    
    // Check if config column exists
    const hasConfigColumn = await columnExists('api_provider_settings', 'config');
    
    if (existingData) {
      // Update existing record
      const updateData: any = {
        api_key: apiKey,
        preferred_model: preferredModel
      };
      
      // Only include config if the column exists
      if (hasConfigColumn) {
        updateData.config = additionalConfig;
      }
      
      const { error } = await supabase
        .from('api_provider_settings')
        .update(updateData)
        .eq('id', existingData.id);
      
      if (error) throw new Error(`Database update error: ${error.message}`);
    } else {
      // Insert new record
      const insertData: any = {
        provider_name: providerName,
        user_id: session.user.id,
        api_key: apiKey,
        preferred_model: preferredModel
      };

      // Only add config if the column exists
      if (hasConfigColumn) {
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
    return false;
  }
};

/**
 * Load API key data from the database
 */
export const loadFromDatabase = async (
  providerName: string,
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
      .eq('provider_name', providerName)
      .eq('user_id', session.user.id)
      .maybeSingle();
    
    if (error && !error.message.includes('column')) {
      console.error('Error loading from database:', error);
      return { key: null, model: defaultModel, config: defaultConfig };
    }
    
    if (!data) {
      return { key: null, model: defaultModel, config: defaultConfig };
    }
    
    // Type guard to check if data has the expected properties
    const isValidData = (
      obj: any
    ): obj is { api_key: string | null; preferred_model: string | null; config?: any } => {
      return obj && typeof obj === 'object';
    };

    // Safely extract properties with defaults if they don't exist
    if (isValidData(data)) {
      const apiKey = data.api_key ?? null;
      const preferredModel = data.preferred_model ?? defaultModel;
      const configValue = hasConfigColumn && 'config' in data ? data.config ?? defaultConfig : defaultConfig;
        
      return { 
        key: apiKey, 
        model: preferredModel, 
        config: configValue
      };
    }

    // Fallback if data is not in expected format
    return { key: null, model: defaultModel, config: defaultConfig };
      
  } catch (error) {
    console.error('Error loading from database:', error);
    return { key: null, model: defaultModel, config: defaultConfig };
  }
};

/**
 * Delete API key data from the database
 */
export const deleteFromDatabase = async (providerName: string): Promise<boolean> => {
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
      .eq('provider_name', providerName)
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
