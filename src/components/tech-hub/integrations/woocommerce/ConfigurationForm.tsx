
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Label } from "../../../../components/ui/label";
import { ShoppingCart } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { fetchWooConfig, saveWooConfig, testWooConnection } from './wooUtils';
import ConnectionStatus from './ConnectionStatus';

interface WooCommerceFormData {
  url: string;
  consumer_key: string;
  consumer_secret: string;
}

const ConfigurationForm = () => {
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
  
  const handleDeleteConfig = () => {
    // TODO: Implement delete functionality
    toast.info("Delete functionality will be implemented in a future update");
  };

  return (
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
        
        <ConnectionStatus status={connectionStatus} />
      </CardContent>
      <CardFooter className="flex justify-between">
        {wooConfig?.url && (
          <Button 
            variant="destructive"
            type="button"
            onClick={handleDeleteConfig}
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
  );
};

export default ConfigurationForm;
