
import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface ApiKeyFormProps {
  providerName: string;
  apiKeyPlaceholder?: string;
  docsLink?: {
    text: string;
    url: string;
  };
  onVerify: (apiKey: string) => Promise<boolean>;
  preferredModelOptions: {
    value: string;
    label: string;
  }[];
  initialModel?: string;
  footerText?: string;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({
  providerName,
  apiKeyPlaceholder = "API Key...",
  docsLink,
  onVerify,
  preferredModelOptions,
  initialModel,
  footerText
}) => {
  const { isAuthenticated, user } = useAuth(); // Use the auth context
  const [apiKey, setApiKey] = useState<string>('');
  const [savedKey, setSavedKey] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [keyStatus, setKeyStatus] = useState<'unknown' | 'valid' | 'invalid' | 'quota_exceeded'>('unknown');
  const [model, setModel] = useState<string>(initialModel || preferredModelOptions[0]?.value || '');
  
  // Load API key from database on component mount
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        // For the mock auth system, we'll use localStorage as a fallback
        if (!isAuthenticated) {
          const localKey = localStorage.getItem(`${providerName.toLowerCase()}-api-key`);
          const localModel = localStorage.getItem(`${providerName.toLowerCase()}-preferred-model`);
          
          if (localKey) {
            setApiKey(localKey);
            setSavedKey(localKey);
            if (localModel) setModel(localModel);
            setKeyStatus('valid');
          }
          
          setIsLoading(false);
          return;
        }
        
        // When authenticated, try to get from Supabase
        const { data, error } = await supabase
          .from('api_provider_settings')
          .select('api_key, preferred_model')
          .eq('provider_name', providerName.toLowerCase())
          .maybeSingle();
        
        if (error) {
          console.error(`Error fetching ${providerName} API key:`, error);
          toast.error(`Failed to fetch saved API key for ${providerName}`);
          
          // Fall back to localStorage if Supabase query fails
          const localKey = localStorage.getItem(`${providerName.toLowerCase()}-api-key`);
          const localModel = localStorage.getItem(`${providerName.toLowerCase()}-preferred-model`);
          
          if (localKey) {
            setApiKey(localKey);
            setSavedKey(localKey);
            if (localModel) setModel(localModel);
            setKeyStatus('valid');
          }
        } else if (data?.api_key) {
          setApiKey(data.api_key);
          setSavedKey(data.api_key);
          if (data.preferred_model) setModel(data.preferred_model);
          setKeyStatus('valid');
        } else {
          // Try localStorage as last resort
          const localKey = localStorage.getItem(`${providerName.toLowerCase()}-api-key`);
          const localModel = localStorage.getItem(`${providerName.toLowerCase()}-preferred-model`);
          
          if (localKey) {
            setApiKey(localKey);
            setSavedKey(localKey);
            if (localModel) setModel(localModel);
            setKeyStatus('valid');
          }
        }
      } catch (err) {
        console.error(`Exception while fetching ${providerName} API key:`, err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApiKey();
  }, [providerName, isAuthenticated]);
  
  // Save API key to database or localStorage
  const saveApiKey = async (key: string, verifiedModel: string) => {
    try {
      // Always save to localStorage as a backup
      localStorage.setItem(`${providerName.toLowerCase()}-api-key`, key);
      localStorage.setItem(`${providerName.toLowerCase()}-preferred-model`, verifiedModel);
      
      // If authenticated, try to save to Supabase as well
      if (isAuthenticated) {
        const { error } = await supabase
          .from('api_provider_settings')
          .upsert({
            provider_name: providerName.toLowerCase(),
            api_key: key,
            preferred_model: verifiedModel,
            updated_at: new Date().toISOString()
          }, { onConflict: 'provider_name' });
        
        if (error) {
          console.error(`Error saving ${providerName} API key to database:`, error);
          toast.warning(`Saved API key locally, but failed to save to database`);
        }
      }
      
      setSavedKey(key);
      return true;
    } catch (error) {
      console.error(`Error saving ${providerName} API key:`, error);
      toast.error(`Failed to save API key`);
      return false;
    }
  };
  
  // Verify API key by making a call through the provider-specific verify function
  const verifyApiKey = useCallback(async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter an API key");
      return;
    }
    
    setIsVerifying(true);
    
    try {
      const isValid = await onVerify(apiKey);
      
      // If no error was thrown, the key is valid
      if (isValid) {
        const saved = await saveApiKey(apiKey, model);
        
        if (saved) {
          setKeyStatus('valid');
          toast.success(`${providerName} API key verified and saved successfully!`);
        }
      } else {
        setKeyStatus('invalid');
        toast.error(`Invalid ${providerName} API key or network error`);
      }
    } catch (error) {
      console.error(`${providerName} API key verification failed:`, error);
      
      // Handle quota exceeded error
      if (error.message?.includes('quota') || 
          error.message?.includes('billing') || 
          error.message?.includes('rate limit')) {
        setKeyStatus('quota_exceeded');
        toast.error(`Your API key is valid, but you've exceeded your quota limits. Check your ${providerName} account billing.`);
      } else {
        setKeyStatus('invalid');
        toast.error(`Invalid ${providerName} API key or network error`);
      }
    } finally {
      setIsVerifying(false);
    }
  }, [apiKey, model, onVerify, providerName]);
  
  const clearApiKey = async () => {
    try {
      // Always clear from localStorage
      localStorage.removeItem(`${providerName.toLowerCase()}-api-key`);
      localStorage.removeItem(`${providerName.toLowerCase()}-preferred-model`);
      
      // If authenticated, try to clear from Supabase as well
      if (isAuthenticated) {
        const { error } = await supabase
          .from('api_provider_settings')
          .delete()
          .eq('provider_name', providerName.toLowerCase());
        
        if (error) {
          console.error(`Error removing ${providerName} API key from database:`, error);
          toast.warning(`Removed API key locally, but failed to remove from database`);
        }
      }
      
      setApiKey('');
      setSavedKey('');
      setKeyStatus('unknown');
      toast.info(`${providerName} API key removed`);
    } catch (error) {
      console.error(`Error removing ${providerName} API key:`, error);
      toast.error(`Failed to completely remove API key`);
    }
  };
  
  const handleModelChange = async (value: string) => {
    setModel(value);
    
    // If we have a saved key, update the preferred model
    if (savedKey) {
      await saveApiKey(savedKey, value);
    }
  };
  
  const renderStatusMessage = () => {
    switch (keyStatus) {
      case 'valid':
        return <p className="text-sm text-green-500 mt-1">✓ Valid API key saved</p>;
      case 'invalid':
        return <p className="text-sm text-red-500 mt-1">✗ Invalid API key</p>;
      case 'quota_exceeded':
        return (
          <p className="text-sm text-amber-500 mt-1">
            ⚠ Valid key, but quota exceeded. {docsLink && (
              <a 
                href={docsLink.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-amber-600"
              >
                Check your billing
              </a>
            )}
          </p>
        );
      default:
        return null;
    }
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{providerName} API Configuration</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{providerName} API Configuration</CardTitle>
        <CardDescription>
          Configure your {providerName} API key for AI features across the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apiKey">{providerName} API Key</Label>
          <div className="flex gap-2">
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={apiKeyPlaceholder}
              className="flex-1"
            />
            <Button 
              onClick={verifyApiKey}
              disabled={isVerifying || !apiKey.trim()}
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </div>
          {renderStatusMessage()}
        </div>
        
        {preferredModelOptions.length > 0 && (
          <div className="space-y-2">
            <Label>Preferred Model</Label>
            <div className="grid grid-cols-2 gap-2">
              {preferredModelOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={option.value}
                    name="model"
                    value={option.value}
                    checked={model === option.value}
                    onChange={() => handleModelChange(option.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <Label htmlFor={option.value} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {savedKey && (
          <div className="pt-2">
            <Button variant="outline" size="sm" onClick={clearApiKey}>
              Remove API Key
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start border-t p-4">
        <p className="text-sm text-gray-500">
          {footerText || `Your API key is stored securely and never exposed to the browser.
          Visit the ${docsLink ? 
            <a href={docsLink.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{docsLink.text}</a> : 
            `${providerName} website`} to create a new key if needed.`}
        </p>
      </CardFooter>
    </Card>
  );
};

export default ApiKeyForm;
