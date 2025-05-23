
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { OdooConfig, SyncSetting } from './types';
import { supabase } from "@/integrations/supabase/client";
import { typedSupabaseQuery } from '@/utils/supabase-helpers';

interface SyncSettingsProps {
  odooConfig: OdooConfig;
  syncSettings: SyncSetting[];
  setSyncSettings: React.Dispatch<React.SetStateAction<SyncSetting[]>>;
}

interface EntityOption {
  id: string;
  name: string;
}

const entityOptions: EntityOption[] = [
  { id: 'products', name: 'Products' },
  { id: 'customers', name: 'Customers' },
  { id: 'suppliers', name: 'Suppliers' },
  { id: 'orders', name: 'Orders' },
  { id: 'inventory', name: 'Inventory Levels' }
];

const frequencyOptions = [
  { value: '15min', label: 'Every 15 minutes' },
  { value: 'hourly', label: 'Hourly' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'manual', label: 'Manual only' },
];

const SyncSettings: React.FC<SyncSettingsProps> = ({ 
  odooConfig, 
  syncSettings,
  setSyncSettings
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState<Record<string, boolean>>({});
  const [lastSyncStatus, setLastSyncStatus] = useState<Record<string, {status: 'success' | 'error', message?: string}>>({});
  
  useEffect(() => {
    // Initialize sync settings for each entity if they don't exist
    const initialSettings: SyncSetting[] = [...syncSettings];
    
    entityOptions.forEach(entity => {
      const existingSetting = syncSettings.find(s => s.entity_type === entity.id);
      if (!existingSetting) {
        initialSettings.push({
          integration_id: odooConfig.id,
          entity_type: entity.id,
          is_enabled: false,
          sync_frequency: 'daily'
        });
      }
    });
    
    if (initialSettings.length > syncSettings.length) {
      setSyncSettings(initialSettings);
    }
  }, [odooConfig.id, syncSettings, setSyncSettings]);
  
  const handleSaveSettings = async () => {
    setIsLoading(true);
    
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        toast.error("You must be logged in to save sync settings");
        setIsLoading(false);
        return;
      }
      
      // Upsert settings
      for (const setting of syncSettings) {
        if (setting.id) {
          // Update existing setting
          await typedSupabaseQuery('integration_sync_settings')
            .update({
              is_enabled: setting.is_enabled,
              sync_frequency: setting.sync_frequency,
              updated_at: new Date().toISOString()
            })
            .eq('id', setting.id);
        } else {
          // Insert new setting
          await typedSupabaseQuery('integration_sync_settings')
            .insert({
              integration_id: setting.integration_id,
              entity_type: setting.entity_type,
              is_enabled: setting.is_enabled,
              sync_frequency: setting.sync_frequency,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
        }
      }
      
      toast.success("Sync settings saved successfully");
      
      // Refresh settings from database
      const { data } = await typedSupabaseQuery<SyncSetting>('integration_sync_settings')
        .select('*')
        .eq('integration_id', odooConfig.id);
      
      if (data) {
        setSyncSettings(data);
      }
    } catch (err) {
      console.error("Error saving sync settings:", err);
      toast.error("Failed to save sync settings");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSyncNow = async (entityType: string) => {
    setIsSyncing(prev => ({ ...prev, [entityType]: true }));
    
    try {
      // Here you would call your sync API or function
      // For demo purposes we'll just simulate a successful sync
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update last sync status
      setLastSyncStatus(prev => ({ 
        ...prev, 
        [entityType]: { 
          status: 'success',
          message: `Last synced: ${new Date().toLocaleTimeString()}`
        }
      }));
      toast.success(`${entityType} sync completed successfully`);
    } catch (err) {
      console.error(`Error syncing ${entityType}:`, err);
      setLastSyncStatus(prev => ({ 
        ...prev, 
        [entityType]: { 
          status: 'error',
          message: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`
        }
      }));
      toast.error(`Failed to sync ${entityType}`);
    } finally {
      setIsSyncing(prev => ({ ...prev, [entityType]: false }));
    }
  };
  
  const handleToggleEntity = (entityType: string, enabled: boolean) => {
    setSyncSettings(prev => 
      prev.map(setting => 
        setting.entity_type === entityType 
          ? { ...setting, is_enabled: enabled } 
          : setting
      )
    );
  };
  
  const handleFrequencyChange = (entityType: string, frequency: string) => {
    setSyncSettings(prev => 
      prev.map(setting => 
        setting.entity_type === entityType 
          ? { ...setting, sync_frequency: frequency } 
          : setting
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Synchronization Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {entityOptions.map(entity => {
            const setting = syncSettings.find(s => s.entity_type === entity.id) || {
              integration_id: odooConfig.id,
              entity_type: entity.id,
              is_enabled: false,
              sync_frequency: 'daily'
            };
            
            return (
              <div key={entity.id} className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={setting.is_enabled}
                      onCheckedChange={(checked) => handleToggleEntity(entity.id, checked)}
                    />
                    <Label>{entity.name}</Label>
                  </div>
                </div>
                
                <div className="flex-1 mx-4">
                  <Select
                    disabled={!setting.is_enabled}
                    value={setting.sync_frequency}
                    onValueChange={(value) => handleFrequencyChange(entity.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {frequencyOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-4">
                  {lastSyncStatus[entity.id] && (
                    <span className="text-sm flex items-center">
                      {lastSyncStatus[entity.id].status === 'success' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      {lastSyncStatus[entity.id].message}
                    </span>
                  )}
                  
                  <Button 
                    size="sm" 
                    disabled={!setting.is_enabled || isSyncing[entity.id]} 
                    onClick={() => handleSyncNow(entity.id)}
                  >
                    {isSyncing[entity.id] ? (
                      <>
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" /> 
                        Syncing...
                      </>
                    ) : 'Sync Now'}
                  </Button>
                </div>
              </div>
            );
          })}
          
          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleSaveSettings}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : 'Save Settings'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SyncSettings;
