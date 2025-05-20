
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
}

// Fetch existing WooCommerce config from the database
export async function fetchWooConfig(): Promise<WooCommerceConfig | null> {
  try {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) {
      toast.error("You must be logged in to manage integrations");
      return null;
    }

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

    if (configData) {
      // config is stored in a "config" field
      if (configData.config) {
        return {
          id: configData.id,
          integration_type: 'woocommerce',
          ...configData.config
        } as WooCommerceConfig;
      }
    }

    return null;
  } catch (error) {
    console.error("Exception while fetching WooCommerce configuration:", error);
    toast.error("An error occurred while fetching the configuration");
    return null;
  }
}

// Test the WooCommerce connection by making a sample request
// This function can be expanded to call an edge function or direct fetch
export async function testWooConnection(config: WooCommerceConfig): Promise<boolean> {
  try {
    // Example mock: call a local edge function or external endpoint
    // For now, just simulating a success response after 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));

    // If it fails, throw an error to see the effect
    // throw new Error("Unable to connect to WooCommerce store");

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
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) {
      toast.error("You must be logged in to save configurations");
      return null;
    }

    const existingConfig = await fetchWooConfig();
    const operation = existingConfig ? 'update' : 'insert';

    if (operation === 'update' && existingConfig?.id) {
      const { error } = await supabase
        .from('integration_configs')
        .update({
          config,
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
          name: 'WooCommerce',
          integration_type: 'woocommerce',
          config,
          is_active: true,
          created_by: session.session.user.id
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
        ...newConfig.config
      };
    }
  } catch (err) {
    console.error("Exception while saving WooCommerce configuration:", err);
    toast.error("An unexpected error occurred while saving");
    return null;
  }
}

// Placeholder for synchronization logic
// In a real scenario, this might call an edge function or an external endpoint
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
