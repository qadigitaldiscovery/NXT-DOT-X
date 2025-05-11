
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const RequestyKeyForm: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [savedKey, setSavedKey] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [keyStatus, setKeyStatus] = useState<'unknown' | 'valid' | 'invalid' | 'quota_exceeded'>('unknown');
  const [model, setModel] = useState<string>('openai/gpt-4o-mini');
  
  // Load API key from localStorage on component mount
  React.useEffect(() => {
    const storedKey = localStorage.getItem('requesty-api-key');
    if (storedKey) {
      setApiKey(storedKey);
      setSavedKey(storedKey);
      setKeyStatus('valid'); // Assume valid until tested
    }

    // Also load preferred model if available
    const storedModel = localStorage.getItem('requesty-preferred-model');
    if (storedModel) {
      setModel(storedModel);
    }
  }, []);
  
  // Verify API key by making a simple call
  const verifyApiKey = useCallback(async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter an API key");
      return;
    }
    
    setIsVerifying(true);
    
    try {
      const response = await fetch("https://router.requesty.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "system", content: "Hello, this is a test message to verify API key." }],
          max_tokens: 1
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error?.code === 'insufficient_quota' || errorData.error?.type === 'insufficient_quota') {
          setKeyStatus('quota_exceeded');
          toast.error("Your API key is valid, but you've exceeded your quota limits. Check your Requesty account billing.");
        } else {
          setKeyStatus('invalid');
          toast.error(errorData.error?.message || "Invalid API key");
        }
        return;
      }
      
      // If no error was thrown, the key is valid
      setKeyStatus('valid');
      localStorage.setItem('requesty-api-key', apiKey);
      localStorage.setItem('requesty-preferred-model', model);
      setSavedKey(apiKey);
      toast.success("API key verified successfully!");
    } catch (error) {
      console.error("API key verification failed:", error);
      setKeyStatus('invalid');
      toast.error("Invalid API key or network error");
    } finally {
      setIsVerifying(false);
    }
  }, [apiKey, model]);
  
  const clearApiKey = () => {
    localStorage.removeItem('requesty-api-key');
    setApiKey('');
    setSavedKey('');
    setKeyStatus('unknown');
    toast.info("API key removed");
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
              href="https://requesty.ai/dashboard/billing" 
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

  const handleModelChange = (value: string) => {
    setModel(value);
    if (savedKey) {
      localStorage.setItem('requesty-preferred-model', value);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Requesty API Configuration</CardTitle>
        <CardDescription>
          Configure your Requesty API key for routing requests to different AI providers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apiKey">Requesty API Key</Label>
          <div className="flex gap-2">
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="rty-..."
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
          <RadioGroup value={model} onValueChange={handleModelChange} className="grid grid-cols-1 gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="openai/gpt-4o-mini" id="gpt-4o-mini" />
              <Label htmlFor="gpt-4o-mini">OpenAI GPT-4o Mini</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="openai/gpt-4o" id="gpt-4o" />
              <Label htmlFor="gpt-4o">OpenAI GPT-4o</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="anthropic/claude-3-5-sonnet" id="claude-3-5-sonnet" />
              <Label htmlFor="claude-3-5-sonnet">Anthropic Claude 3.5 Sonnet</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mistral/mistral-large" id="mistral-large" />
              <Label htmlFor="mistral-large">Mistral Large</Label>
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
          Your API key is stored securely in your browser's local storage and is never sent to our servers.
          Visit the <a href="https://requesty.ai/dashboard/api-keys" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Requesty API Keys page</a> to create a new key if needed.
        </p>
      </CardFooter>
    </Card>
  );
};

export default RequestyKeyForm;
