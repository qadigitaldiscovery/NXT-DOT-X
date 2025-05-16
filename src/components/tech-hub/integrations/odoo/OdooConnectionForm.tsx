
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
import { tryUseEdgeFunction } from "@/utils/api-clients/common/edge-function-utils";
import { OdooConfig } from './types';

interface OdooFormData {
  url: string;
  db_name: string;
  username?: string;
  password?: string;
  api_key?: string;
  auth_method: 'credentials' | 'api_key';
}

interface OdooConnectionFormProps {
  odooConfig: OdooConfig | null;
  setOdooConfig: React.Dispatch<React.SetStateAction<OdooConfig | null>>;
  fetchExistingConfig: () => Promise<void>;
  connectionStatus: 'idle' | 'success' | 'error';
  setConnectionStatus: React.Dispatch<React.SetStateAction<'idle' | 'success' | 'error'>>;
}

const OdooConnectionForm: React.FC<OdooConnectionFormProps> = ({
  odooConfig,
  setOdooConfig,
  fetchExistingConfig,
  connectionStatus,
  setConnectionStatus
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [authMethod, setAuthMethod] = useState<'credentials' | 'api_key'>('credentials');

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<OdooFormData>({
    defaultValues: {
      auth_method: 'credentials'
    }
  });
  
  const currentAuthMethod = watch('auth_method');

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
      console.log("Testing connection with auth method:", data.auth_method);
      
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
      
      let result;
      
      // Using tryUseEdgeFunction with API key when applicable
      if (data.auth_method === 'api_key' && data.api_key) {
        console.log("Testing with API key authentication");
        result = await tryUseEdgeFunction('api-integrations', {
          endpoint: 'odoo',
          action: 'test_connection',
          url: data.url,
          db_name: data.db_name,
          api_key: data.api_key
        }, {
          apiKey: data.api_key
        });
      } else {
        console.log("Testing with credentials authentication");
        result = await tryUseEdgeFunction('api-integrations', {
          endpoint: 'odoo',
          action: 'test_connection',
          url: data.url,
          db_name: data.db_name,
          username: data.username,
          password: data.password
        });
      }
      
      if (!result) {
        throw new Error("Connection test failed - no response from server");
      }
      
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

  // Delete configuration
  const deleteConfiguration = async () => {
    if (!odooConfig?.id) return;
    
    try {
      const confirmed = window.confirm("Are you sure you want to delete this Odoo integration configuration?");
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

  return (
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
                    API keys can be generated from your Odoo ERP account settings. You'll also need to set this API key in the Supabase Edge Function secrets.
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
  );
};

export default OdooConnectionForm;
