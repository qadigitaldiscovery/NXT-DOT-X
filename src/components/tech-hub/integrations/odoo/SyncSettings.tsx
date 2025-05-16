
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { tryUseEdgeFunction } from "@/utils/api-clients/common/edge-function-utils";
import { OdooConfig, SyncSetting } from './types';

interface SyncSettingsProps {
  odooConfig: OdooConfig;
  syncSettings: SyncSetting[];
  setSyncSettings: React.Dispatch<React.SetStateAction<SyncSetting[]>>;
}

const SyncSettings: React.FC<SyncSettingsProps> = ({
  odooConfig,
  syncSettings,
  setSyncSettings
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Update sync settings
  const updateSyncSetting = async (entityType: string, isEnabled: boolean, frequency?: string) => {
    if (!odooConfig?.id) return;
    
    try {
      setIsLoading(true);
      
      // Check if setting already exists
      const existingSetting = syncSettings.find(s => s.entity_type === entityType);
      
      if (existingSetting) {
        // Update existing setting
        const { error } = await supabase
          .from('integration_sync_settings')
          .update({
            is_enabled: isEnabled,
            sync_frequency: frequency || existingSetting.sync_frequency,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingSetting.id);
        
        if (error) {
          console.error("Failed to update sync setting:", error);
          toast.error("Failed to update synchronization settings");
          return;
        }
      } else {
        // Create new setting
        const { error } = await supabase
          .from('integration_sync_settings')
          .insert({
            integration_id: odooConfig.id,
            entity_type: entityType,
            is_enabled: isEnabled,
            sync_frequency: frequency || 'daily'
          });
        
        if (error) {
          console.error("Failed to create sync setting:", error);
          toast.error("Failed to save synchronization settings");
          return;
        }
      }
      
      // Refresh sync settings
      if (odooConfig.id) {
        await fetchSyncSettings(odooConfig.id);
      }
      toast.success("Synchronization settings updated");
    } catch (err) {
      console.error("Error updating sync settings:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch sync settings for an integration
  const fetchSyncSettings = async (integrationId: string) => {
    try {
      const { data, error } = await supabase
        .from('integration_sync_settings')
        .select('*')
        .eq('integration_id', integrationId);
      
      if (error) {
        console.error("Failed to load sync settings:", error);
        return;
      }
      
      setSyncSettings(data as SyncSetting[]);
    } catch (err) {
      console.error("Error fetching sync settings:", err);
    }
  };

  // Handle sync frequency change
  const handleSyncFrequencyChange = async (entityType: string, frequency: string) => {
    const setting = syncSettings.find(s => s.entity_type === entityType);
    if (setting) {
      await updateSyncSetting(entityType, setting.is_enabled, frequency);
    }
  };

  // Handle sync toggle
  const handleSyncToggle = async (entityType: string, isEnabled: boolean) => {
    await updateSyncSetting(entityType, isEnabled);
  };

  // Get sync setting for an entity type
  const getSyncSetting = (entityType: string): SyncSetting | undefined => {
    return syncSettings.find(s => s.entity_type === entityType);
  };

  // Start manual synchronization
  const startSynchronization = async () => {
    if (!odooConfig?.id) return;
    
    try {
      setIsLoading(true);
      
      // Get enabled sync settings
      const enabledSettings = syncSettings.filter(s => s.is_enabled);
      if (enabledSettings.length === 0) {
        toast.warning("No synchronization options are enabled");
        setIsLoading(false);
        return;
      }
      
      // Use the API key if available in the config
      const apiKey = odooConfig.config.api_key;
      
      // Call the edge function using utility
      const result = await tryUseEdgeFunction('api-integrations', {
        endpoint: 'odoo',
        action: 'start_sync',
        integration_id: odooConfig.id,
        entities: enabledSettings.map(s => s.entity_type)
      }, apiKey ? { apiKey } : undefined);
      
      if (!result) {
        throw new Error("Synchronization failed - no response from server");
      }
      
      if (result.success) {
        toast.success("Synchronization started successfully!");
        // Update last_synced_at for the settings
        for (const setting of enabledSettings) {
          if (setting.id) {
            await supabase
              .from('integration_sync_settings')
              .update({ last_synced_at: new Date().toISOString() })
              .eq('id', setting.id);
          }
        }
        
        // Refresh sync settings to show updated last_synced_at
        if (odooConfig.id) {
          await fetchSyncSettings(odooConfig.id);
        }
      } else {
        throw new Error(result.message || "Synchronization failed");
      }
    } catch (error) {
      console.error("Synchronization failed:", error);
      toast.error(error instanceof Error ? error.message : "Failed to start synchronization");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Synchronization Options</CardTitle>
        <CardDescription>
          Choose which data to synchronize between systems
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border p-4 rounded-md">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="sync-products" 
                checked={getSyncSetting('products')?.is_enabled ?? false}
                onCheckedChange={(checked) => handleSyncToggle('products', checked === true)}
                disabled={isLoading}
              />
              <div className="flex-1">
                <Label htmlFor="sync-products" className="text-base font-medium">Products & Inventory</Label>
                <p className="text-sm text-muted-foreground">
                  Synchronize products, variants, and inventory levels
                </p>
                
                {getSyncSetting('products')?.is_enabled && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="products-sync-frequency" className="text-sm w-32">Sync frequency:</Label>
                      <Select 
                        value={getSyncSetting('products')?.sync_frequency || 'daily'} 
                        onValueChange={(value) => handleSyncFrequencyChange('products', value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger id="products-sync-frequency" className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {getSyncSetting('products')?.last_synced_at && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Last synced: {new Date(getSyncSetting('products')?.last_synced_at || '').toLocaleString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="border p-4 rounded-md">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="sync-customers" 
                checked={getSyncSetting('customers')?.is_enabled ?? false}
                onCheckedChange={(checked) => handleSyncToggle('customers', checked === true)}
                disabled={isLoading}
              />
              <div className="flex-1">
                <Label htmlFor="sync-customers" className="text-base font-medium">Customers & Orders</Label>
                <p className="text-sm text-muted-foreground">
                  Synchronize customer data and order history
                </p>
                
                {getSyncSetting('customers')?.is_enabled && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="customers-sync-frequency" className="text-sm w-32">Sync frequency:</Label>
                      <Select 
                        value={getSyncSetting('customers')?.sync_frequency || 'daily'} 
                        onValueChange={(value) => handleSyncFrequencyChange('customers', value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger id="customers-sync-frequency" className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {getSyncSetting('customers')?.last_synced_at && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Last synced: {new Date(getSyncSetting('customers')?.last_synced_at || '').toLocaleString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="border p-4 rounded-md">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="sync-invoices" 
                checked={getSyncSetting('invoices')?.is_enabled ?? false}
                onCheckedChange={(checked) => handleSyncToggle('invoices', checked === true)}
                disabled={isLoading}
              />
              <div className="flex-1">
                <Label htmlFor="sync-invoices" className="text-base font-medium">Invoices & Payments</Label>
                <p className="text-sm text-muted-foreground">
                  Synchronize invoices and payment records
                </p>
                
                {getSyncSetting('invoices')?.is_enabled && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="invoices-sync-frequency" className="text-sm w-32">Sync frequency:</Label>
                      <Select 
                        value={getSyncSetting('invoices')?.sync_frequency || 'daily'} 
                        onValueChange={(value) => handleSyncFrequencyChange('invoices', value)}
                        disabled={isLoading}
                      >
                        <SelectTrigger id="invoices-sync-frequency" className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {getSyncSetting('invoices')?.last_synced_at && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Last synced: {new Date(getSyncSetting('invoices')?.last_synced_at || '').toLocaleString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="default" 
          onClick={startSynchronization} 
          disabled={isLoading || syncSettings.filter(s => s.is_enabled).length === 0}
          className="w-full"
        >
          {isLoading ? "Processing..." : "Start Synchronization"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SyncSettings;
