import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Database, CheckCircle, XCircle, Key } from "lucide-react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

interface OdooFormData {
  url: string;
  db_name: string;
  username?: string;
  password?: string;
  api_key?: string;
  auth_method: 'credentials' | 'api_key';
}

interface OdooConfig {
  id?: string;
  name: string;
  integration_type: string;
  config: {
    url: string;
    db_name: string;
    username?: string;
    password?: string;
    api_key?: string;
    auth_method: 'credentials' | 'api_key';
  };
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
}

interface SyncSetting {
  id?: string;
  integration_id: string;
  entity_type: string;
  is_enabled: boolean;
  sync_frequency: string;
  last_synced_at?: string;
}

const OdooIntegration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [odooConfig, setOdooConfig] = useState<OdooConfig | null>(null);
  const [syncSettings, setSyncSettings] = useState<SyncSetting[]>([]);
  const [authMethod, setAuthMethod] = useState<'credentials' | 'api_key'>('credentials');
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<OdooFormData>({
    defaultValues: {
      auth_method: 'credentials'
    }
  });
  
  const currentAuthMethod = watch('auth_method');

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
      
      const { data: configs, error } = await supabase
        .from('integration_configs')
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
        
        // Safely access config properties with type checking
        if (configs.config && typeof configs.config === 'object') {
          const configObj = configs.config as Record<string, any>;
          setValue("url", configObj.url || "");
          setValue("db_name", configObj.db_name || "");
          
          // Set authentication method
          const storedAuthMethod = configObj.auth_method || 
              (configObj.api_key ? 'api_key' : 'credentials');
          setValue("auth_method", storedAuthMethod);
          setAuthMethod(storedAuthMethod);
          
          // Set appropriate credentials based on auth method
          if (storedAuthMethod === 'api_key') {
            setValue("api_key", configObj.api_key || "");
            // Clear credentials
            setValue("username", "");
            setValue("password", "");
          } else {
            setValue("username", configObj.username || "");
            setValue("password", configObj.password || "");
            // Clear API key
            setValue("api_key", "");
          }
        }
        
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

  useEffect(() => {
    fetchExistingConfig();
  }, []);

  // Handle authentication method change
  useEffect(() => {
    if (currentAuthMethod) {
      setAuthMethod(currentAuthMethod);
    }
  }, [currentAuthMethod]);

  // Test the connection to Odoo
  const testConnection = async (data: OdooFormData) => {
    setIsTesting(true);
    try {
      // Test connection via Edge Function
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session?.access_token) {
        throw new Error("Authentication required");
      }
      
      // Prepare request data based on authentication method
      const requestData: Record<string, any> = {
        action: 'test_connection',
        url: data.url,
        db_name: data.db_name,
      };
      
      // Add authentication details based on method
      if (data.auth_method === 'api_key') {
        requestData.api_key = data.api_key;
      } else {
        requestData.username = data.username;
        requestData.password = data.password;
      }
      
      // Call the edge function to test the connection - use the proper URL
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        throw new Error("Supabase URL not configured");
      }
      
      // Call the edge function with the correct URL
      const response = await fetch(`${supabaseUrl}/functions/v1/api-integrations/odoo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.session.access_token}`
        },
        body: JSON.stringify(requestData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Connection test failed");
      }
      
      const result = await response.json();
      
      if (result.success) {
        setConnectionStatus('success');
        toast.success("Successfully connected to Odoo ERP!");
        return true;
      } else {
        throw new Error(result.message || "Connection test failed");
      }
    } catch (error) {
      console.error("Connection test failed:", error);
      setConnectionStatus('error');
      toast.error(error instanceof Error ? error.message : "Failed to connect to Odoo ERP");
      return false;
    } finally {
      setIsTesting(false);
    }
  };

  // Save the Odoo configuration
  const saveConfiguration = async (data: OdooFormData) => {
    try {
      setIsLoading(true);
      
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        toast.error("You must be logged in to save configurations");
        return false;
      }
      
      // Build the config object based on the authentication method
      const config: Record<string, any> = {
        url: data.url,
        db_name: data.db_name,
        auth_method: data.auth_method,
      };
      
      // Add credentials based on auth method
      if (data.auth_method === 'api_key') {
        config.api_key = data.api_key;
      } else {
        config.username = data.username;
        config.password = data.password;
      }
      
      const operation = odooConfig ? 'update' : 'insert';
      
      if (operation === 'update' && odooConfig?.id) {
        const { error } = await supabase
          .from('integration_configs')
          .update({
            config,
            updated_at: new Date().toISOString()
          })
          .eq('id', odooConfig.id);
        
        if (error) {
          console.error("Failed to update Odoo configuration:", error);
          toast.error("Failed to update configuration");
          return false;
        }
      } else {
        const { data: newConfig, error } = await supabase
          .from('integration_configs')
          .insert({
            name: 'Odoo ERP',
            integration_type: 'odoo',
            config,
            is_active: true,
            created_by: session.session.user.id
          })
          .select()
          .single();
        
        if (error) {
          console.error("Failed to save Odoo configuration:", error);
          toast.error("Failed to save configuration");
          return false;
        }
        
        setOdooConfig(newConfig as OdooConfig);
      }
      
      toast.success(`Odoo configuration ${operation === 'update' ? 'updated' : 'saved'} successfully`);
      await fetchExistingConfig(); // Refresh the config
      return true;
    } catch (err) {
      console.error("Exception while saving Odoo configuration:", err);
      toast.error("An unexpected error occurred");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const onSubmit = async (data: OdooFormData) => {
    const connectionSuccessful = await testConnection(data);
    
    if (connectionSuccessful) {
      await saveConfiguration(data);
    }
  };

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

  // Delete configuration
  const deleteConfiguration = async () => {
    if (!odooConfig?.id) return;
    
    try {
      const confirmed = confirm("Are you sure you want to delete this Odoo integration configuration?");
      if (!confirmed) return;
      
      setIsLoading(true);
      
      const { error } = await supabase
        .from('integration_configs')
        .delete()
        .eq('id', odooConfig.id);
      
      if (error) {
        console.error("Failed to delete Odoo configuration:", error);
        toast.error("Failed to delete configuration");
        return;
      }
      
      setOdooConfig(null);
      setConnectionStatus('idle');
      setSyncSettings([]);
      toast.success("Odoo configuration deleted successfully");
      
      // Reset form
      setValue("url", "");
      setValue("db_name", "");
      setValue("username", "");
      setValue("password", "");
      setValue("api_key", "");
      setValue("auth_method", "credentials");
      setAuthMethod("credentials");
    } catch (err) {
      console.error("Exception while deleting Odoo configuration:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
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
      
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.access_token) {
        toast.error("Authentication required");
        setIsLoading(false);
        return;
      }
      
      // Get the Supabase URL from environment
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        throw new Error("Supabase URL not configured");
      }
      
      // Call the edge function with the correct URL
      const response = await fetch(`${supabaseUrl}/functions/v1/api-integrations/odoo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.session.access_token}`
        },
        body: JSON.stringify({
          action: 'start_sync',
          integration_id: odooConfig.id,
          entities: enabledSettings.map(s => s.entity_type)
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Synchronization failed");
      }
      
      const result = await response.json();
      
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
    <div className="container max-w-4xl mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Odoo ERP Integration</h1>
      <p className="text-muted-foreground">
        Connect your Odoo ERP instance to synchronize products, orders, and inventory.
      </p>
      
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Database className="h-6 w-6 text-primary" />
            <CardTitle>Odoo ERP Configuration</CardTitle>
          </div>
          <CardDescription>
            Enter your Odoo ERP connection details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="odoo-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Odoo URL</Label>
                  <Input
                    id="url"
                    placeholder="https://your-odoo-instance.com"
                    {...register("url", { required: "URL is required" })}
                  />
                  {errors.url && (
                    <p className="text-sm text-red-500">{errors.url.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="db_name">Database Name</Label>
                  <Input
                    id="db_name"
                    placeholder="odoo_db"
                    {...register("db_name", { required: "Database name is required" })}
                  />
                  {errors.db_name && (
                    <p className="text-sm text-red-500">{errors.db_name.message}</p>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <Label>Authentication Method</Label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="credentials"
                        {...register("auth_method")}
                        className="h-4 w-4"
                        checked={authMethod === "credentials"}
                        onChange={() => setAuthMethod("credentials")}
                      />
                      <span>Username & Password</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="api_key"
                        {...register("auth_method")}
                        className="h-4 w-4"
                        checked={authMethod === "api_key"}
                        onChange={() => setAuthMethod("api_key")}
                      />
                      <span>API Key</span>
                    </label>
                  </div>
                </div>

                {authMethod === "credentials" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="admin"
                        {...register("username", { 
                          required: authMethod === "credentials" ? "Username is required" : false 
                        })}
                      />
                      {errors.username && (
                        <p className="text-sm text-red-500">{errors.username.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password", { 
                          required: authMethod === "credentials" ? "Password is required" : false 
                        })}
                      />
                      {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="api_key">API Key</Label>
                    <div className="flex items-center space-x-2">
                      <Key className="h-4 w-4 text-gray-400" />
                      <Input
                        id="api_key"
                        type="password"
                        placeholder="Enter your Odoo API key"
                        {...register("api_key", { 
                          required: authMethod === "api_key" ? "API key is required" : false 
                        })}
                      />
                    </div>
                    {errors.api_key && (
                      <p className="text-sm text-red-500">{errors.api_key.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      API keys can be generated from your Odoo ERP account settings.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </form>
          
          {connectionStatus === 'success' && (
            <Alert className="mt-4 bg-green-50 border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">Connection Successful</AlertTitle>
              <AlertDescription className="text-green-700">
                Your Odoo ERP instance is properly configured and connected.
              </AlertDescription>
            </Alert>
          )}
          
          {connectionStatus === 'error' && (
            <Alert className="mt-4 bg-red-50 border-red-200">
              <XCircle className="h-5 w-5 text-red-600" />
              <AlertTitle className="text-red-800">Connection Failed</AlertTitle>
              <AlertDescription className="text-red-700">
                Unable to connect to your Odoo ERP instance. Please check your credentials.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          {odooConfig && (
            <Button variant="outline" onClick={deleteConfiguration} disabled={isLoading} className="mr-auto text-red-500 hover:text-red-700 hover:bg-red-50">
              Delete Configuration
            </Button>
          )}
          <Button 
            type="button" 
            variant="outline" 
            onClick={fetchExistingConfig} 
            disabled={isLoading || isTesting}
          >
            Reset
          </Button>
          <Button 
            type="submit" 
            form="odoo-form" 
            disabled={isLoading || isTesting}
          >
            {isTesting ? "Testing Connection..." : isLoading ? "Saving..." : "Save & Test Connection"}
          </Button>
        </CardFooter>
      </Card>
      
      {connectionStatus === 'success' && (
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
      )}
    </div>
  );
};

export default OdooIntegration;
