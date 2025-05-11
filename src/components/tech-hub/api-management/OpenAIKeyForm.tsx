
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { callOpenAI, OpenAIError, RateLimitError } from '@/utils/openai-client';

const OpenAIKeyForm: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [savedKey, setSavedKey] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [keyStatus, setKeyStatus] = useState<'unknown' | 'valid' | 'invalid' | 'quota_exceeded'>('unknown');
  const [model, setModel] = useState<string>('gpt-4o-mini');
  
  // Load API key from localStorage on component mount
  React.useEffect(() => {
    const storedKey = localStorage.getItem('openai-api-key');
    if (storedKey) {
      setApiKey(storedKey);
      setSavedKey(storedKey);
      setKeyStatus('valid'); // Assume valid until tested
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
      setKeyStatus('valid');
      localStorage.setItem('openai-api-key', apiKey);
      setSavedKey(apiKey);
      toast.success("API key verified successfully!");
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
  
  const clearApiKey = () => {
    localStorage.removeItem('openai-api-key');
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
          <RadioGroup value={model} onValueChange={setModel} className="grid grid-cols-2 gap-2">
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
          Your API key is stored securely in your browser's local storage and is never sent to our servers.
          Visit the <a href="https://platform.openai.com/api-keys" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">OpenAI API Keys page</a> to create a new key if needed.
        </p>
      </CardFooter>
    </Card>
  );
};

export default OpenAIKeyForm;
