
import { supabase } from '@/integrations/supabase/client';

export interface WooCommerceConfig {
  id: string;
  integration_type: string;
  url: string;
  consumer_key: string;
  consumer_secret: string;
}

export const getWooConfig = async (): Promise<WooCommerceConfig | null> => {
  try {
    const { data, error } = await supabase
      .from('integrations')
      .select('*')
      .eq('integration_type', 'woocommerce')
      .single();
    
    if (error) {
      console.error('Error fetching WooCommerce config:', error);
      return null;
    }
    
    if (!data) return null;
    
    if (!data.url || !data.consumer_key || !data.consumer_secret) {
      console.error('Incomplete WooCommerce configuration found');
      return null;
    }
    
    return data as WooCommerceConfig;
  } catch (error) {
    console.error('Error in getWooConfig:', error);
    return null;
  }
};

export const saveWooConfig = async (config: {
  url: string;
  consumer_key: string;
  consumer_secret: string;
}): Promise<{ success: boolean; error?: any }> => {
  try {
    // Check if config already exists
    const { data: existingConfig, error: fetchError } = await supabase
      .from('integrations')
      .select('id')
      .eq('integration_type', 'woocommerce')
      .single();
    
    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error checking existing config:', fetchError);
      return { success: false, error: fetchError };
    }
    
    const { error } = await supabase
      .from('integrations')
      .upsert({
        id: existingConfig?.id || undefined,
        integration_type: 'woocommerce',
        ...config,
        updated_at: new Date()
      });
    
    if (error) {
      console.error('Error saving WooCommerce config:', error);
      return { success: false, error };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error in saveWooConfig:', error);
    return { success: false, error };
  }
};

export const testWooConnection = async (config?: {
  url: string;
  consumer_key: string;
  consumer_secret: string;
}): Promise<{ success: boolean; message?: string; error?: any }> => {
  try {
    // If no config provided, fetch from database
    let testConfig = config;
    
    if (!testConfig) {
      const savedConfig = await getWooConfig();
      if (!savedConfig) {
        return { success: false, message: 'No WooCommerce configuration found' };
      }
      testConfig = {
        url: savedConfig.url,
        consumer_key: savedConfig.consumer_key,
        consumer_secret: savedConfig.consumer_secret
      };
    }
    
    // In a real implementation, this would call an edge function or API to test the connection
    // For now, we'll simulate a successful connection if all fields are present
    if (testConfig.url && testConfig.consumer_key && testConfig.consumer_secret) {
      return { success: true, message: 'Connection successful' };
    } else {
      return { success: false, message: 'Incomplete configuration' };
    }
  } catch (error) {
    console.error('Error testing WooCommerce connection:', error);
    return { success: false, error };
  }
};

export const fetchWooProducts = async (): Promise<{ success: boolean; data?: any[]; error?: any }> => {
  try {
    // Get WooCommerce config
    const config = await getWooConfig();
    
    if (!config) {
      return { success: false, error: 'WooCommerce configuration not found' };
    }
    
    // In real implementation, this would call an edge function or API to get products
    // For demo purposes, return mock data
    return {
      success: true,
      data: [
        { id: 1, name: 'Product 1', price: '19.99', stock_status: 'instock' },
        { id: 2, name: 'Product 2', price: '29.99', stock_status: 'instock' },
        { id: 3, name: 'Product 3', price: '39.99', stock_status: 'outofstock' }
      ]
    };
  } catch (error) {
    console.error('Error fetching WooCommerce products:', error);
    return { success: false, error };
  }
};
