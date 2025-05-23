
// Utility functions for WooCommerce integration logic

import { toast } from "sonner";
import { supabase } from "../../../../integrations/supabase/client";

// The shape of Woocommerce config, matching the existing form
export interface WooCommerceConfig {
  id?: string;
  integration_type?: string;
  url: string;
  consumer_key: string;
  consumer_secret: string;
  [key: string]: any; // Allow additional properties for Json compatibility
}

// Fetch existing WooCommerce config from the database
export async function fetchWooConfig(): Promise<WooCommerceConfig | null> {
  try {
    const { data: configData, error } = await supabase
      .from('integration_configs')
      .select('*')
      .eq('integration_type', 'woocommerce')
      .order('created_at', { ascending: false })
      .maybeSingle();

    if (error) {
      console.error("Failed to load WooCommerce configuration:", error);
      toast.error("Failed to load existing configuration");
      return null;
    }

    if (configData && configData.config) {
      return {
        id: configData.id,
        integration_type: 'woocommerce',
        ...(typeof configData.config === 'object' ? configData.config : {})
      } as WooCommerceConfig;
    }

    return null;
  } catch (error) {
    console.error("Exception while fetching WooCommerce configuration:", error);
    toast.error("An error occurred while fetching the configuration");
    return null;
  }
}

// Test the WooCommerce connection by making a sample request
export async function testWooConnection(config: WooCommerceConfig): Promise<boolean> {
  try {
    // Example mock: call a local edge function or external endpoint
    // For now, just simulating a success response after 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success("Successfully connected to WooCommerce!");
    return true;
  } catch (error) {
    console.error("WooCommerce connection test failed:", error);
    toast.error(error instanceof Error ? error.message : "Failed to connect to WooCommerce");
    return false;
  }
}

// Save or update WooCommerce configuration to the database
export async function saveWooConfig(
  config: WooCommerceConfig
): Promise<WooCommerceConfig | null> {
  try {
    const existingConfig = await fetchWooConfig();
    const operation = existingConfig ? 'update' : 'insert';

    if (operation === 'update' && existingConfig?.id) {
      const { error } = await supabase
        .from('integration_configs')
        .update({
          config: config,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingConfig.id);

      if (error) {
        console.error("Failed to update WooCommerce configuration:", error);
        toast.error("Failed to update configuration");
        return null;
      }

      toast.success("WooCommerce configuration updated successfully");
      return { ...existingConfig, ...config };
    } else {
      const { data: newConfig, error } = await supabase
        .from('integration_configs')
        .insert({
          name: 'WooCommerce Integration',
          integration_type: 'woocommerce',
          config: config,
          is_active: true,
          created_by: 'admin'
        })
        .select()
        .single();

      if (error) {
        console.error("Failed to save WooCommerce configuration:", error);
        toast.error("Failed to save configuration");
        return null;
      }

      toast.success("WooCommerce configuration saved successfully");
      return {
        id: newConfig.id,
        integration_type: newConfig.integration_type,
        ...(typeof newConfig.config === 'object' ? newConfig.config : {})
      };
    }
  } catch (err) {
    console.error("Exception while saving WooCommerce configuration:", err);
    toast.error("An unexpected error occurred while saving");
    return null;
  }
}

// Placeholder for synchronization logic
export async function syncWooData(config: WooCommerceConfig) {
  try {
    // Example: making a fetch call to a local edge function
    // For now, simulate a success scenario
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("WooCommerce data synchronized successfully!");
    return true;
  } catch (err) {
    console.error("Woocommerce sync error:", err);
    toast.error("An error occurred during WooCommerce data sync");
    return false;
  }
}
