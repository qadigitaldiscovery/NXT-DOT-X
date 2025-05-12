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
  preferredModel?: string
): Promise<boolean> {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('User not authenticated:', userError);
      toast.error('Authentication required to store API keys');
      return false;
    }
    
    // Check if provider already exists
    const { data: existingData, error: checkError } = await supabase
      .from('api_provider_settings')
      .select('id')
      .eq('provider_name', provider)
      .eq('user_id', user.id)
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
          updated_at: new Date().toISOString()
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
          provider_name: provider,
          api_key: apiKey,
          preferred_model: preferredModel,
          user_id: user.id
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
export async function getApiKey(provider: ApiKeyProvider): Promise<{key: string | null; model: string | null; config: any | null}> {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('User not authenticated:', userError);
      return { key: null, model: null, config: null };
    }
    
    const { data, error } = await supabase
      .from('api_provider_settings')
      .select('api_key, preferred_model')
      .eq('provider_name', provider)
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      // Try to handle specific errors gracefully
      console.error('Error retrieving API key:', error);
      return { key: null, model: null, config: null };
    }

    if (!data) {
      console.log(`No ${provider} API key found in database`);
      return { key: null, model: null, config: null };
    }

    return {
      key: data.api_key,
      model: data.preferred_model,
      config: null // Config handling will need to be added if column exists
    };
  } catch (error) {
    console.error('Error retrieving API key:', error);
    return { key: null, model: null, config: null };
  }
}

// Function to delete API key from database
export async function deleteApiKeyFromDatabase(provider: ApiKeyProvider): Promise<boolean> {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('User not authenticated:', userError);
      toast.error('Authentication required to delete API keys');
      return false;
    }
    
    const { error } = await supabase
      .from('api_provider_settings')
      .delete()
      .eq('provider_name', provider)
      .eq('user_id', user.id);

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
