
import { ApiError } from './errors';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Types for API key storage
export type ApiKeyProvider = 'openai' | 'requesty' | 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'unsplash' | 'canva';

export interface ApiKeyConfig {
  api_key: string;
  preferred_model?: string;
  config?: Record<string, any>;
}

// Function to store API key in database
export async function storeApiKeyInDatabase(
  provider: ApiKeyProvider, 
  apiKey: string, 
  preferredModel?: string,
  config?: Record<string, any>
): Promise<boolean> {
  try {
    // Check if provider already exists
    const { data: existingData, error: checkError } = await supabase
      .from('api_provider_settings')
      .select('id')
      .eq('provider', provider)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking for existing provider:', checkError);
      toast.error(`Failed to check for existing ${provider} configuration`);
      return false;
    }

    if (existingData) {
      // Update existing provider
      const { error: updateError } = await supabase
        .from('api_provider_settings')
        .update({
          api_key: apiKey,
          preferred_model: preferredModel,
          config: config || {}
        })
        .eq('id', existingData.id);

      if (updateError) {
        console.error('Error updating API key:', updateError);
        toast.error(`Failed to update ${provider} API key`);
        return false;
      }

      toast.success(`${provider} API key updated successfully`);
      return true;
    } else {
      // Insert new provider
      const { error: insertError } = await supabase
        .from('api_provider_settings')
        .insert({
          provider,
          api_key: apiKey,
          preferred_model: preferredModel,
          config: config || {}
        });

      if (insertError) {
        console.error('Error storing API key:', insertError);
        toast.error(`Failed to store ${provider} API key`);
        return false;
      }

      toast.success(`${provider} API key stored successfully`);
      return true;
    }
  } catch (error) {
    console.error('Error storing API key:', error);
    toast.error(`Unexpected error storing ${provider} API key`);
    return false;
  }
}

// Function to retrieve API key from database
export async function getApiKeyFromDatabase(provider: ApiKeyProvider): Promise<ApiKeyConfig | null> {
  try {
    const { data, error } = await supabase
      .from('api_provider_settings')
      .select('api_key, preferred_model, config')
      .eq('provider', provider)
      .maybeSingle();

    if (error) {
      // Handle specific errors
      if (error.message.includes("column 'config' does not exist")) {
        // If the config column doesn't exist, try to fetch without it
        console.warn("Config column doesn't exist, fetching without it");
        const { data: legacyData, error: legacyError } = await supabase
          .from('api_provider_settings')
          .select('api_key, preferred_model')
          .eq('provider', provider)
          .maybeSingle();

        if (legacyError) {
          console.error('Error retrieving API key:', legacyError);
          return null;
        }

        return legacyData ? {
          api_key: legacyData.api_key,
          preferred_model: legacyData.preferred_model
        } : null;
      }
      
      console.error('Error retrieving API key:', error);
      return null;
    }

    if (!data) {
      console.log(`No ${provider} API key found in database`);
      return null;
    }

    return {
      api_key: data.api_key,
      preferred_model: data.preferred_model,
      config: data.config
    };
  } catch (error) {
    console.error('Error retrieving API key:', error);
    return null;
  }
}

// Function to delete API key from database
export async function deleteApiKeyFromDatabase(provider: ApiKeyProvider): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('api_provider_settings')
      .delete()
      .eq('provider', provider);

    if (error) {
      console.error('Error deleting API key:', error);
      toast.error(`Failed to delete ${provider} API key`);
      return false;
    }

    toast.success(`${provider} API key deleted successfully`);
    return true;
  } catch (error) {
    console.error('Error deleting API key:', error);
    toast.error(`Unexpected error deleting ${provider} API key`);
    return false;
  }
}
