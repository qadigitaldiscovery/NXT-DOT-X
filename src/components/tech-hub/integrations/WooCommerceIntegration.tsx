import React, { useState, useEffect } from 'react';
// Update the import path below if the card components are located elsewhere in your project structure
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "../../../../components/ui/alert";

import { ShoppingCart, CheckCircle, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { supabase } from "../../../../integrations/supabase/client";
import { toast } from "sonner";
import { fetchWooConfig, saveWooConfig, testWooConnection } from './wooUtils';

interface WooCommerceFormData {
  url: string;
  consumer_key: string;
  consumer_secret: string;
}

const WooCommerceIntegration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [wooConfig, setWooConfig] = useState<WooCommerceFormData | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<WooCommerceFormData>();

  const loadExistingConfig = async () => {
    try {
      setIsLoading(true);
      const config = await fetchWooConfig();
      if (config) {
        setWooConfig(config);
        setConnectionStatus('success');
        reset(config);
      }
    } catch (err) {
      console.error("Failed to load WooCommerce configuration:", err);
      toast.error("Failed to load existing configuration");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExistingConfig();
  }, []);

  const handleTestConnection = async (data: WooCommerceFormData) => {
    setIsTesting(true);
    try {
      const success = await testWooConnection(data);
      if (success) {
        setConnectionStatus('success');
      } else {
        setConnectionStatus('error');
      }
      return success;
    } catch (error) {
      console.error("Connection test failed:", error);
      setConnectionStatus('error');
      toast.error("Failed to connect to WooCommerce");
      return false;
    } finally {
      setIsTesting(false);
    }
  };

  const handleSaveConfig = async (data: WooCommerceFormData) => {
    try {
      setIsLoading(true);
      const savedConfig = await saveWooConfig(data);
      if (savedConfig) {
        setWooConfig(savedConfig);
        toast.success("WooCommerce configuration saved successfully");
      }
    } catch (err) {
      console.error("Failed to save WooCommerce configuration:", err);
      toast.error("Failed to save configuration");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: WooCommerceFormData) => {
    const connectionSuccessful = await handleTestConnection(data);
    if (connectionSuccessful) {
      await handleSaveConfig(data);
    }
  };

  const handleReset = async () => {
    await loadExistingConfig();
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
        <CardFooter className="flex justify-between">
          {wooConfig?.url && (
            <Button 
              variant="destructive"
              type="button"
              onClick={() => {/* TODO: Implement delete functionality */}}
              disabled={isLoading || isTesting}
            >
              Delete Configuration
            </Button>
          )}
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              type="button"
              onClick={handleReset} 
              disabled={isLoading || isTesting}
            >
              Reset
            </Button>
            <Button 
              type="submit" 
              form="woocommerce-form" 
              disabled={isLoading || isTesting}
            >
              {isTesting ? "Testing..." : isLoading ? "Saving..." : "Save & Test Connection"}
            </Button>
          </div>
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
              <input 
                type="checkbox" 
                id="sync-products" 
                className="mt-1" 
                disabled={connectionStatus !== 'success'} 
                aria-label="Sync products"
              />
              <div>
                <Label htmlFor="sync-products" className="text-base">Products</Label>
                <p className="text-sm text-muted-foreground">
                  Sync product catalog, variations, and pricing
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <input 
                type="checkbox" 
                id="sync-orders" 
                className="mt-1" 
                disabled={connectionStatus !== 'success'}
                aria-label="Sync orders"
              />
              <div>
                <Label htmlFor="sync-orders" className="text-base">Orders</Label>
                <p className="text-sm text-muted-foreground">
                  Sync order data, status updates, and fulfillment
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <input 
                type="checkbox" 
                id="sync-customers" 
                className="mt-1" 
                disabled={connectionStatus !== 'success'}
                aria-label="Sync customers"
              />
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
          <Button 
            variant="secondary" 
            disabled={connectionStatus !== 'success'}
            onClick={() => {/* TODO: Implement sync functionality */}}
          >
            Start Synchronization
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default WooCommerceIntegration;
