
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShoppingCart, CheckCircle, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface WooCommerceFormData {
  url: string;
  consumer_key: string;
  consumer_secret: string;
}

const WooCommerceIntegration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [wooConfig, setWooConfig] = useState<WooCommerceFormData | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<WooCommerceFormData>();

  const fetchExistingConfig = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('woocommerce_integrations')
        .select('*')
        .limit(1)
        .single();
      
      if (error) {
        console.error("Error fetching WooCommerce configuration:", error);
        return;
      }
      
      if (data) {
        setWooConfig({
          url: data.url,
          consumer_key: data.consumer_key,
          consumer_secret: data.consumer_secret
        });
        setConnectionStatus('success');
      }
    } catch (err) {
      console.error("Failed to load WooCommerce configuration:", err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchExistingConfig();
  }, []);

  const testConnection = async (data: WooCommerceFormData) => {
    setIsLoading(true);
    try {
      // In a real implementation, you would call your API to test the connection
      // For this demo, we'll simulate a successful connection after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setConnectionStatus('success');
      toast.success("Successfully connected to WooCommerce!");
      return true;
    } catch (error) {
      console.error("Connection test failed:", error);
      setConnectionStatus('error');
      toast.error("Failed to connect to WooCommerce");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: WooCommerceFormData) => {
    const connectionSuccessful = await testConnection(data);
    
    if (connectionSuccessful) {
      try {
        const { error } = await supabase
          .from('woocommerce_integrations')
          .upsert([data], { onConflict: 'id' });
        
        if (error) {
          toast.error("Failed to save WooCommerce configuration");
          console.error("Error saving WooCommerce configuration:", error);
        } else {
          toast.success("WooCommerce configuration saved successfully");
          setWooConfig(data);
        }
      } catch (err) {
        console.error("Failed to save WooCommerce configuration:", err);
        toast.error("An error occurred while saving configuration");
      }
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">WooCommerce Integration</h1>
      <p className="text-muted-foreground">
        Connect your WooCommerce store to synchronize products, orders, and customers.
      </p>
      
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <CardTitle>WooCommerce Configuration</CardTitle>
          </div>
          <CardDescription>
            Enter your WooCommerce API credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="woocommerce-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Store URL</Label>
                  <Input
                    id="url"
                    placeholder="https://your-store.com"
                    {...register("url", { required: "URL is required" })}
                    defaultValue={wooConfig?.url || ""}
                  />
                  {errors.url && (
                    <p className="text-sm text-red-500">{errors.url.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="consumer_key">Consumer Key</Label>
                  <Input
                    id="consumer_key"
                    placeholder="ck_xxxxxxxxxxxxxxxxxxxx"
                    {...register("consumer_key", { required: "Consumer Key is required" })}
                    defaultValue={wooConfig?.consumer_key || ""}
                  />
                  {errors.consumer_key && (
                    <p className="text-sm text-red-500">{errors.consumer_key.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="consumer_secret">Consumer Secret</Label>
                  <Input
                    id="consumer_secret"
                    type="password"
                    placeholder="cs_xxxxxxxxxxxxxxxxxxxx"
                    {...register("consumer_secret", { required: "Consumer Secret is required" })}
                    defaultValue={wooConfig?.consumer_secret || ""}
                  />
                  {errors.consumer_secret && (
                    <p className="text-sm text-red-500">{errors.consumer_secret.message}</p>
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
                Your WooCommerce store is properly configured and connected.
              </AlertDescription>
            </Alert>
          )}
          
          {connectionStatus === 'error' && (
            <Alert className="mt-4 bg-red-50 border-red-200">
              <XCircle className="h-5 w-5 text-red-600" />
              <AlertTitle className="text-red-800">Connection Failed</AlertTitle>
              <AlertDescription className="text-red-700">
                Unable to connect to your WooCommerce store. Please check your API credentials.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={fetchExistingConfig} disabled={isLoading}>
            Reset
          </Button>
          <Button type="submit" form="woocommerce-form" disabled={isLoading}>
            {isLoading ? "Connecting..." : "Save & Test Connection"}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Import/Export Options</CardTitle>
          <CardDescription>
            Configure what data to synchronize between systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <input type="checkbox" id="sync-products" className="mt-1" disabled={connectionStatus !== 'success'} />
              <div>
                <Label htmlFor="sync-products" className="text-base">Products</Label>
                <p className="text-sm text-muted-foreground">
                  Sync product catalog, variations, and pricing
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <input type="checkbox" id="sync-orders" className="mt-1" disabled={connectionStatus !== 'success'} />
              <div>
                <Label htmlFor="sync-orders" className="text-base">Orders</Label>
                <p className="text-sm text-muted-foreground">
                  Sync order data, status updates, and fulfillment
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <input type="checkbox" id="sync-customers" className="mt-1" disabled={connectionStatus !== 'success'} />
              <div>
                <Label htmlFor="sync-customers" className="text-base">Customers</Label>
                <p className="text-sm text-muted-foreground">
                  Sync customer profiles and purchase history
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

export default WooCommerceIntegration;
