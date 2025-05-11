
import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  additionalConfig?: Record<string, any>;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({
  providerName,
  apiKeyPlaceholder = "API Key...",
  docsLink,
  onVerify,
  preferredModelOptions,
  initialModel,
  footerText,
  additionalConfig = {}
}) => {
  const { isAuthenticated, user } = useAuth();
  const [apiKey, setApiKey] = useState<string>('');
  const [savedKey, setSavedKey] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [keyStatus, setKeyStatus] = useState<'unknown' | 'valid' | 'invalid' | 'quota_exceeded'>('unknown');
  const [model, setModel] = useState<string>(initialModel || preferredModelOptions[0]?.value || '');
  const [activeTab, setActiveTab] = useState<string>("basic");
  const [advancedConfig, setAdvancedConfig] = useState(additionalConfig);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Load API key from database or localStorage on component mount
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        // Check localStorage first for any saved keys
        const localKey = localStorage.getItem(`${providerName.toLowerCase()}-api-key`);
        const localModel = localStorage.getItem(`${providerName.toLowerCase()}-preferred-model`);
        const localConfig = localStorage.getItem(`${providerName.toLowerCase()}-additional-config`);
        
        // Initialize with localStorage values if available
        if (localKey) {
          setApiKey(localKey);
          setSavedKey(localKey);
          if (localModel) setModel(localModel);
          if (localConfig) {
            try {
              const parsedConfig = JSON.parse(localConfig);
              setAdvancedConfig({...additionalConfig, ...parsedConfig});
            } catch (e) {
              console.error("Error parsing stored config:", e);
            }
          }
          setKeyStatus('valid');
        }
        
        // If authenticated, also check Supabase
        if (isAuthenticated && user) {
          const { data, error } = await supabase
            .from('api_provider_settings')
            .select('api_key, preferred_model, config')
            .eq('provider_name', providerName.toLowerCase())
            .eq('user_id', user.id)
            .maybeSingle();
          
          if (error) {
            // Handle the specific error for missing column
            if (error.message?.includes("column 'config' does not exist")) {
              console.log("Config column doesn't exist yet, using simpler query");
              // If 'config' column doesn't exist, try again with just api_key and preferred_model
              const { data: simpleData, error: simpleError } = await supabase
                .from('api_provider_settings')
                .select('api_key, preferred_model')
                .eq('provider_name', providerName.toLowerCase())
                .eq('user_id', user.id)
                .maybeSingle();
                
              if (!simpleError && simpleData && 'api_key' in simpleData) {
                setApiKey(simpleData.api_key);
                setSavedKey(simpleData.api_key);
                if ('preferred_model' in simpleData && simpleData.preferred_model) {
                  setModel(simpleData.preferred_model);
                }
                setKeyStatus('valid');
              } else if (simpleError) {
                console.error(`Error in simple fetch for ${providerName} API key:`, simpleError);
              }
            } else {
              console.error(`Error fetching ${providerName} API key:`, error);
              toast.error(`Failed to fetch saved API key for ${providerName}`);
            }
          } else if (data) {
            // Override localStorage values with database values if available
            setApiKey(data.api_key);
            setSavedKey(data.api_key);
            if (data.preferred_model) setModel(data.preferred_model);
            if (data.config) {
              try {
                const parsedConfig = typeof data.config === 'string' ? JSON.parse(data.config) : data.config;
                setAdvancedConfig({...additionalConfig, ...parsedConfig});
              } catch (e) {
                console.error("Error parsing stored config:", e);
              }
            }
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
  }, [providerName, isAuthenticated, user, additionalConfig]);
  
  // Save API key to database or localStorage
  const saveApiKey = async (key: string, verifiedModel: string) => {
    try {
      // Prepare the config data
      const configData = JSON.stringify(advancedConfig);
      
      // Always save to localStorage as a backup
      localStorage.setItem(`${providerName.toLowerCase()}-api-key`, key);
      localStorage.setItem(`${providerName.toLowerCase()}-preferred-model`, verifiedModel);
      localStorage.setItem(`${providerName.toLowerCase()}-additional-config`, configData);
      
      // If authenticated, try to save to Supabase as well
      if (isAuthenticated && user) {
        try {
          // First check if the config column exists
          const { data: columnExists, error: columnCheckError } = await supabase.rpc('column_exists', { 
            table_name: 'api_provider_settings',
            column_name: 'config'
          });

          let upsertData: Record<string, any>;
          
          if (columnCheckError || columnExists === false) {
            console.log("Could not check if config column exists or it doesn't exist:", columnCheckError);
            // Use basic upsert without config column
            upsertData = {
              provider_name: providerName.toLowerCase(),
              api_key: key,
              preferred_model: verifiedModel,
              user_id: user.id,
              updated_at: new Date().toISOString()
            };
          } else {
            // Config column exists, use full upsert
            upsertData = {
              provider_name: providerName.toLowerCase(),
              api_key: key,
              preferred_model: verifiedModel,
              config: advancedConfig,
              user_id: user.id,
              updated_at: new Date().toISOString()
            };
          }
          
          const { error } = await supabase
            .from('api_provider_settings')
            .upsert(upsertData, { onConflict: 'provider_name,user_id' });
          
          if (error) {
            console.error(`Error saving ${providerName} API key to database:`, error);
            toast.warning(`Saved API key locally, but failed to save to database: ${error.message}`);
            console.log("Debug info - user:", user);
            console.log("Debug info - auth state:", isAuthenticated);
          }
        } catch (error) {
          console.error(`Error during database operations for ${providerName}:`, error);
          toast.warning(`Saved API key locally, but failed during database operations`);
        }
      } else if (!isAuthenticated) {
        // If not authenticated, just notify that we saved locally only
        console.log("Not authenticated, saving API key to localStorage only");
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
      localStorage.removeItem(`${providerName.toLowerCase()}-additional-config`);
      
      // If authenticated, try to clear from Supabase as well
      if (isAuthenticated && user) {
        const { error } = await supabase
          .from('api_provider_settings')
          .delete()
          .eq('provider_name', providerName.toLowerCase())
          .eq('user_id', user.id);
        
        if (error) {
          console.error(`Error removing ${providerName} API key from database:`, error);
          toast.warning(`Removed API key locally, but failed to remove from database`);
        }
      }
      
      setApiKey('');
      setSavedKey('');
      setKeyStatus('unknown');
      setAdvancedConfig(additionalConfig); // Reset to defaults
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
  
  const updateAdvancedConfig = (key: string, value: any) => {
    setAdvancedConfig(prev => {
      const updated = { ...prev, [key]: value };
      
      // If we have a saved key, save the updated config
      if (savedKey) {
        saveApiKey(savedKey, model);
      }
      
      return updated;
    });
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

  const renderAdvancedConfigField = (key: string, value: any) => {
    // Determine the field type based on the value type
    const valueType = typeof value;
    
    switch (valueType) {
      case 'boolean':
        return (
          <div className="flex items-center space-x-2" key={key}>
            <Switch 
              id={key} 
              checked={advancedConfig[key]} 
              onCheckedChange={(checked) => updateAdvancedConfig(key, checked)} 
            />
            <Label htmlFor={key} className="capitalize">
              {key.replace(/_/g, ' ')}
            </Label>
          </div>
        );
        
      case 'number':
        if (key.includes('temperature') || (value >= 0 && value <= 1)) {
          return (
            <div className="space-y-2" key={key}>
              <div className="flex justify-between">
                <Label htmlFor={key} className="capitalize">{key.replace(/_/g, ' ')}</Label>
                <span className="text-sm">{advancedConfig[key].toFixed(1)}</span>
              </div>
              <Slider 
                id={key}
                min={0} 
                max={1} 
                step={0.1} 
                value={[advancedConfig[key]]} 
                onValueChange={(values) => updateAdvancedConfig(key, values[0])} 
              />
            </div>
          );
        } else if (key.includes('max_tokens') || key.includes('limit')) {
          return (
            <div className="space-y-2" key={key}>
              <Label htmlFor={key} className="capitalize">{key.replace(/_/g, ' ')}</Label>
              <Input
                id={key}
                type="number"
                value={advancedConfig[key]}
                onChange={(e) => updateAdvancedConfig(key, parseInt(e.target.value) || 0)}
                className="w-full"
              />
            </div>
          );
        }
        // For other number types
        return (
          <div className="space-y-2" key={key}>
            <Label htmlFor={key} className="capitalize">{key.replace(/_/g, ' ')}</Label>
            <Input
              id={key}
              type="number"
              value={advancedConfig[key]}
              onChange={(e) => updateAdvancedConfig(key, parseFloat(e.target.value) || 0)}
              className="w-full"
            />
          </div>
        );
        
      case 'string':
        if (key === 'response_format') {
          return (
            <div className="space-y-2" key={key}>
              <Label htmlFor={key} className="capitalize">{key.replace(/_/g, ' ')}</Label>
              <Select 
                value={advancedConfig[key]} 
                onValueChange={(value) => updateAdvancedConfig(key, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="json_object">JSON Object</SelectItem>
                </SelectContent>
              </Select>
            </div>
          );
        }
        // For other string types
        return (
          <div className="space-y-2" key={key}>
            <Label htmlFor={key} className="capitalize">{key.replace(/_/g, ' ')}</Label>
            <Input
              id={key}
              type="text"
              value={advancedConfig[key]}
              onChange={(e) => updateAdvancedConfig(key, e.target.value)}
              className="w-full"
            />
          </div>
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="basic">Basic Settings</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            {preferredModelOptions.length > 0 && (
              <div className="space-y-2 pt-4">
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
          </TabsContent>
          
          <TabsContent value="advanced">
            <div className="space-y-4 pt-4">
              <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Advanced Configuration Options</h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-4 pt-4">
                  {Object.entries(advancedConfig).map(([key, value]) => (
                    <div key={key}>
                      {renderAdvancedConfigField(key, value)}
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </TabsContent>
        </Tabs>
        
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
