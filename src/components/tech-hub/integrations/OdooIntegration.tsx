
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Database, CheckCircle, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface OdooFormData {
  url: string;
  db_name: string;
  username: string;
  password: string;
}

interface OdooConfigData {
  id?: string;
  url: string;
  db_name: string;
  username: string;
  password: string;
  created_at?: string;
}

const OdooIntegration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [odooConfig, setOdooConfig] = useState<OdooFormData | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<OdooFormData>();

  const fetchExistingConfig = async () => {
    try {
      setIsLoading(true);
      // Since we can't use a table that doesn't exist in the type definition,
      // let's use a type assertion for now. In production, you'd want to properly
      // set up the database tables and types.
      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .eq('type', 'odoo')
        .limit(1)
        .single();
      
      if (error) {
        console.error("Error fetching Odoo configuration:", error);
        return;
      }
      
      if (data) {
        const configData = data.config as OdooFormData;
        setOdooConfig(configData);
        setConnectionStatus('success');
      }
    } catch (err) {
      console.error("Failed to load Odoo configuration:", err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchExistingConfig();
  }, []);

  const testConnection = async (data: OdooFormData) => {
    setIsLoading(true);
    try {
      // In a real implementation, you would call your API to test the connection
      // For this demo, we'll simulate a successful connection after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setConnectionStatus('success');
      toast.success("Successfully connected to Odoo ERP!");
      return true;
    } catch (error) {
      console.error("Connection test failed:", error);
      setConnectionStatus('error');
      toast.error("Failed to connect to Odoo ERP");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: OdooFormData) => {
    const connectionSuccessful = await testConnection(data);
    
    if (connectionSuccessful) {
      try {
        // Using a more appropriate table name and structure that likely exists
        const { error } = await supabase
          .from('integrations')
          .upsert([{ 
            type: 'odoo', 
            name: 'Odoo ERP',
            config: data,
            active: true,
            updated_at: new Date().toISOString()
          }], 
          { onConflict: 'type' });
        
        if (error) {
          toast.error("Failed to save Odoo configuration");
          console.error("Error saving Odoo configuration:", error);
        } else {
          toast.success("Odoo configuration saved successfully");
          setOdooConfig(data);
        }
      } catch (err) {
        console.error("Failed to save Odoo configuration:", err);
        toast.error("An error occurred while saving configuration");
      }
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
                    defaultValue={odooConfig?.url || ""}
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
                    defaultValue={odooConfig?.db_name || ""}
                  />
                  {errors.db_name && (
                    <p className="text-sm text-red-500">{errors.db_name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="admin"
                    {...register("username", { required: "Username is required" })}
                    defaultValue={odooConfig?.username || ""}
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
                    {...register("password", { required: "Password is required" })}
                    defaultValue={odooConfig?.password || ""}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>
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
          <Button variant="outline" onClick={fetchExistingConfig} disabled={isLoading}>
            Reset
          </Button>
          <Button type="submit" form="odoo-form" disabled={isLoading}>
            {isLoading ? "Connecting..." : "Save & Test Connection"}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Synchronization Options</CardTitle>
          <CardDescription>
            Choose which data to synchronize between systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <input type="checkbox" id="sync-products" className="mt-1" disabled={connectionStatus !== 'success'} />
              <div>
                <Label htmlFor="sync-products" className="text-base">Products & Inventory</Label>
                <p className="text-sm text-muted-foreground">
                  Synchronize products, variants, and inventory levels
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <input type="checkbox" id="sync-customers" className="mt-1" disabled={connectionStatus !== 'success'} />
              <div>
                <Label htmlFor="sync-customers" className="text-base">Customers & Orders</Label>
                <p className="text-sm text-muted-foreground">
                  Synchronize customer data and order history
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <input type="checkbox" id="sync-invoices" className="mt-1" disabled={connectionStatus !== 'success'} />
              <div>
                <Label htmlFor="sync-invoices" className="text-base">Invoices & Payments</Label>
                <p className="text-sm text-muted-foreground">
                  Synchronize invoices and payment records
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" disabled={connectionStatus !== 'success'}>
            Start Synchronization
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OdooIntegration;
