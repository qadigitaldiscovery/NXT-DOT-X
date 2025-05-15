import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { callOpenAI, OpenAIError, RateLimitError } from '@/utils/openai-client';
import { useUserPreferences } from '@/utils/user-preferences';

const OpenAIKeyForm: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [savedKey, setSavedKey] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [keyStatus, setKeyStatus] = useState<'unknown' | 'valid' | 'invalid' | 'quota_exceeded'>('unknown');
  const [model, setModel] = useState<string>('gpt-4o-mini');
  
  // Use preferences hook for API key settings
  const { preferences, setPreferences } = useUserPreferences({
    module: 'api_provider_settings',
    key: 'openai',
    defaultValue: {
      api_key: '',
      preferred_model: 'gpt-4o-mini'
    }
  });
  
  // Load API key from database on component mount
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        // First try to get from user preferences
        if (preferences && !loading) {
          const prefData = preferences as any;
          if (prefData.api_key) {
            setApiKey(prefData.api_key);
            setSavedKey(prefData.api_key);
            if (prefData.preferred_model) setModel(prefData.preferred_model);
            setKeyStatus('valid'); // Assume valid until tested
            setIsLoading(false);
            return;
          }
        }
        
        // Fall back to querying the database table directly
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsLoading(false);
          return;
        }
        
        const { data, error } = await supabase
          .from('api_provider_settings')
          .select('api_key, preferred_model')
          .eq('provider_name', 'openai')
          .maybeSingle();
        
        if (error) {
          console.error("Error fetching API key:", error);
          toast.error("Failed to fetch saved API key");
        } else if (data?.api_key) {
          // Set the actual API key
          setApiKey(data.api_key);
          setSavedKey(data.api_key);
          if (data.preferred_model) setModel(data.preferred_model);
          setKeyStatus('valid'); // Assume valid until tested
        }
      } catch (err) {
        console.error("Exception while fetching API key:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApiKey();
  }, [preferences, loading]);
  
  // Save API key to database and preferences
  const saveApiKey = async (key: string, verifiedModel: string) => {
    try {
      // First update preferences
      await setPreferences({
        api_key: key,
        preferred_model: verifiedModel
      });
      
      // Then update the database table
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("You must be logged in to save API keys");
        return false;
      }

      const { error } = await supabase
        .from('api_provider_settings')
        .upsert({
          provider_name: 'openai',
          api_key: key,
          preferred_model: verifiedModel,
          user_id: session.user.id,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id, provider_name' });
      
      if (error) {
        console.error("Error saving API key:", error);
        toast.error("Failed to save API key to database");
        return false;
      }
      
      setSavedKey(key);
      return true;
    } catch (error) {
      console.error("Error saving API key:", error);
      toast.error("Failed to save API key to database");
      return false;
    }
  };
  
  // Verify API key by making a simple call
  const verifyApiKey = useCallback(async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter an API key");
      return;
    }
    
    setIsVerifying(true);
    
    try {
      await callOpenAI({
        endpoint: 'chat',
        payload: {
          model,
          messages: [{ role: "system", content: "Hello, this is a test message to verify API key." }],
          max_tokens: 1
        },
        apiKey
      });
      
      // If no error was thrown, the key is valid
      const saved = await saveApiKey(apiKey, model);
      
      if (saved) {
        setKeyStatus('valid');
        toast.success("API key verified and saved successfully!");
      }
    } catch (error) {
      console.error("API key verification failed:", error);
      
      // Handle different error types
      if (error instanceof RateLimitError || 
          (error instanceof OpenAIError && error.code === 'insufficient_quota')) {
        setKeyStatus('quota_exceeded');
        toast.error("Your API key is valid, but you've exceeded your quota limits. Check your OpenAI account billing.");
      } else {
        setKeyStatus('invalid');
        toast.error("Invalid API key or network error");
      }
    } finally {
      setIsVerifying(false);
    }
  }, [apiKey, model]);
  
  // Update the clear API key method to also clear preferences
  const clearApiKey = async () => {
    try {
      // Clear preferences first
      await setPreferences(null);
      
      // Then clear from database
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("You must be logged in to remove API keys");
        return;
      }
      
      const { error } = await supabase
        .from('api_provider_settings')
        .delete()
        .eq('provider_name', 'openai')
        .eq('user_id', session.user.id);
      
      if (error) {
        console.error("Error removing API key:", error);
        toast.error("Failed to remove API key from database");
        return;
      }
      
      setApiKey('');
      setSavedKey('');
      setKeyStatus('unknown');
      toast.info("API key removed");
    } catch (error) {
      console.error("Error removing API key:", error);
      toast.error("Failed to remove API key from database");
    }
  };
  
  const handleModelChange = async (value: string) => {
    setModel(value);
    
    // If we have a saved key, update the preferred model in the database
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
            ⚠ Valid key, but quota exceeded. <a 
              href="https://platform.openai.com/account/billing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-amber-600"
            >
              Check your billing
            </a>
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
          <CardTitle>OpenAI API Configuration</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>OpenAI API Configuration</CardTitle>
        <CardDescription>
          Configure your OpenAI API key for AI features across the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apiKey">OpenAI API Key</Label>
          <div className="flex gap-2">
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
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
        
        <div className="space-y-2">
          <Label>Preferred Model</Label>
          <RadioGroup value={model} onValueChange={handleModelChange} className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gpt-4o-mini" id="gpt-4o-mini" />
              <Label htmlFor="gpt-4o-mini">GPT-4o Mini</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gpt-4o" id="gpt-4o" />
              <Label htmlFor="gpt-4o">GPT-4o</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gpt-3.5-turbo" id="gpt-3.5" />
              <Label htmlFor="gpt-3.5">GPT-3.5 Turbo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gpt-4-turbo" id="gpt-4-turbo" />
              <Label htmlFor="gpt-4-turbo">GPT-4 Turbo</Label>
            </div>
          </RadioGroup>
        </div>
        
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
          Your API key is stored securely in the database and never exposed to the browser.
          Visit the <a href="https://platform.openai.com/api-keys" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">OpenAI API Keys page</a> to create a new key if needed.
        </p>
      </CardFooter>
    </Card>
  );
};

export default OpenAIKeyForm;
