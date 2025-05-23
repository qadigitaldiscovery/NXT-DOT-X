
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RequestyKeyForm: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSaveKey = async () => {
    if (!apiKey) {
      toast.error('Please enter an API key');
      return;
    }

    if (!isAuthenticated) {
      toast.error('You must be logged in to save API keys');
      localStorage.setItem('returnUrl', window.location.pathname);
      navigate('/landing');
      return;
    }

    try {
      setIsSaving(true);
      
      // In a real implementation, we would store this in the database
      // using the api_provider_settings table, but it doesn't exist yet
      localStorage.setItem('requesty_api_key', apiKey);
      
      toast.success('API key saved successfully');
      setApiKey('');
    } catch (error) {
      console.error('Error saving API key:', error);
      toast.error('Failed to save API key');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Configure Requesty API</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="bg-blue-50 border-blue-200">
          <InfoIcon className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700">
            Enter your Requesty API key to enable AI chat functionality
          </AlertDescription>
        </Alert>
        
        <div className="space-y-2">
          <label htmlFor="api-key" className="text-sm font-medium">API Key</label>
          <Input
            id="api-key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Requesty API key"
            type="password"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSaveKey} 
          disabled={isSaving}
          className="w-full"
        >
          {isSaving ? 'Saving...' : 'Save API Key'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RequestyKeyForm;
