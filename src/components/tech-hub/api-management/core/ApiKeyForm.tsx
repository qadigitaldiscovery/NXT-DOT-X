
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApiKey } from './useApiKey';
import { ApiKeyInput } from './components/ApiKeyInput';
import { ModelSelector } from './components/ModelSelector';
import { AdvancedConfigSection } from './components/AdvancedConfigSection';

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
  const {
    apiKey,
    setApiKey,
    savedKey,
    isVerifying,
    isLoading,
    keyStatus,
    model,
    activeTab, 
    setActiveTab,
    advancedConfig,
    verifyApiKey,
    clearApiKey,
    handleModelChange,
    updateAdvancedConfig
  } = useApiKey({
    providerName,
    initialModel,
    preferredModelOptions,
    additionalConfig,
    onVerify
  });
  
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
  
  // Bridge function to handle the parameter type mismatch
  const handleConfigUpdate = (key: string, value: any) => {
    // Create a new config object with the updated value
    const updatedConfig = {
      ...advancedConfig,
      [key]: value
    };
    
    // Call the updateAdvancedConfig with the full config object
    updateAdvancedConfig(updatedConfig);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{providerName} API Configuration</CardTitle>
        <CardDescription>
          Configure your {providerName} API key for AI features across the platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ApiKeyInput
          apiKey={apiKey}
          isVerifying={isVerifying}
          keyStatus={keyStatus}
          placeholder={apiKeyPlaceholder}
          docsLink={docsLink}
          onApiKeyChange={setApiKey}
          onVerify={verifyApiKey}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="basic">Basic Settings</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <ModelSelector 
              modelOptions={preferredModelOptions} 
              selectedModel={model} 
              onModelChange={handleModelChange} 
            />
          </TabsContent>
          
          <TabsContent value="advanced">
            <AdvancedConfigSection 
              config={advancedConfig} 
              onConfigUpdate={handleConfigUpdate}
            />
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
