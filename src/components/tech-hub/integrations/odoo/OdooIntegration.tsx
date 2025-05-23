
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { OdooConfig, SyncSetting } from './types';
import OdooConnectionForm from './OdooConnectionForm';
import SyncSettings from './SyncSettings';
import { typedSupabaseQuery } from '@/utils/supabase-helpers';

const OdooIntegration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [odooConfig, setOdooConfig] = useState<OdooConfig | null>(null);
  const [syncSettings, setSyncSettings] = useState<SyncSetting[]>([]);

  // Fetch existing configuration from the database
  const fetchExistingConfig = async () => {
    try {
      setIsLoading(true);
      
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        toast.error("You must be logged in to manage integrations");
        setIsLoading(false);
        return;
      }
      
      const { data: configs, error } = await typedSupabaseQuery<OdooConfig>('integration_configs')
        .select('*')
        .eq('integration_type', 'odoo')
        .order('created_at', { ascending: false })
        .maybeSingle();
      
      if (error) {
        console.error("Failed to load Odoo configuration:", error);
        toast.error("Failed to load saved configuration");
        setIsLoading(false);
        return;
      }
      
      if (configs) {
        setOdooConfig(configs as OdooConfig);
        
        // Set connection status to success if config exists
        setConnectionStatus('success');
        
        // Fetch sync settings for this integration
        if (configs.id) {
          fetchSyncSettings(configs.id);
        }
      } else {
        setOdooConfig(null);
        setConnectionStatus('idle');
      }
    } catch (err) {
      console.error("Exception while fetching Odoo configuration:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch sync settings for an integration
  const fetchSyncSettings = async (integrationId: string) => {
    try {
      const { data, error } = await typedSupabaseQuery<SyncSetting>('integration_sync_settings')
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

  useEffect(() => {
    fetchExistingConfig();
  }, []);

  return (
    <div className="container max-w-4xl mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Odoo ERP Integration</h1>
      <p className="text-muted-foreground">
        Connect your Odoo ERP instance to synchronize products, orders, and inventory.
      </p>
      
      <OdooConnectionForm 
        odooConfig={odooConfig}
        setOdooConfig={setOdooConfig}
        fetchExistingConfig={fetchExistingConfig}
        connectionStatus={connectionStatus}
        setConnectionStatus={setConnectionStatus}
      />
      
      {connectionStatus === 'success' && (
        <SyncSettings 
          odooConfig={odooConfig as OdooConfig}
          syncSettings={syncSettings}
          setSyncSettings={setSyncSettings}
        />
      )}
    </div>
  );
};

export default OdooIntegration;
