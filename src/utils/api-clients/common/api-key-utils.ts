
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ApiError } from './errors';

// Function to get API key from storage
export async function getApiKey(
  providerName: string, 
  localStorageKey: string
): Promise<{key: string | null; model: string | null; config: any | null}> {
  try {
    // Check local storage first
    const localData = localStorage.getItem(localStorageKey);
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        if (parsed && parsed.key) {
          return {
            key: parsed.key,
            model: parsed.model || null,
            config: parsed.config || null
          };
        }
      } catch (e) {
        console.error('Error parsing local storage:', e);
      }
    }
    
    // Try database
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return { key: null, model: null, config: null };
    }
    
    // Check if config column exists
    try {
      const { data, error } = await supabase
        .from('api_provider_settings')
        .select('api_key, preferred_model, config')
        .eq('provider_name', providerName)
        .eq('user_id', session.user.id)
        .maybeSingle();
      
      if (error) {
        // If error relates to config column not existing, try without it
        if (error.message && error.message.includes('config')) {
          const { data: dataNoConfig, error: errorNoConfig } = await supabase
            .from('api_provider_settings')
            .select('api_key, preferred_model')
            .eq('provider_name', providerName)
            .eq('user_id', session.user.id)
            .maybeSingle();
            
          if (errorNoConfig) {
            console.error('Error getting API key from database:', errorNoConfig);
            return { key: null, model: null, config: null };
          }
          
          // Safely handle dataNoConfig with strict null checking
          if (!dataNoConfig) {
            return { key: null, model: null, config: null };
          }
          
          // Extract values safely after confirming dataNoConfig is not null
          const apiKey = dataNoConfig.api_key || null;
          const preferredModel = dataNoConfig.preferred_model || null;
          
          return { 
            key: apiKey, 
            model: preferredModel, 
            config: null 
          };
        }
        
        console.error('Error getting API key from database:', error);
        return { key: null, model: null, config: null };
      }
      
      // Additional null check before accessing data properties
      if (!data) {
        return { key: null, model: null, config: null };
      }
      
      // Extract values safely after confirming data is not null
      const apiKey = data.api_key || null;
      const preferredModel = data.preferred_model || null;
      const configValue = data.config || null;
      
      // Return the values after safely extracting them
      return { 
        key: apiKey, 
        model: preferredModel,
        config: configValue
      };
    } catch (error) {
      console.error('Exception getting API key from database:', error);
      return { key: null, model: null, config: null };
    }
  } catch (e) {
    console.error('Error in getApiKey:', e);
    return { key: null, model: null, config: null };
  }
}
