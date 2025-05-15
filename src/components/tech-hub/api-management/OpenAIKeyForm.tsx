import React, { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage, clearFromLocalStorage } from '@/components/tech-hub/api-management/core/hooks/api-key-storage/localStorageUtils';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ReloadIcon } from '@radix-ui/react-icons';

const localStorageKey = 'openAIKey';

interface OpenAIKeyFormProps {
  defaultModel?: string;
  additionalConfig?: Record<string, any>;
  onApiKeySaved?: (apiKey: string, preferredModel: string, additionalConfig?: Record<string, any>) => void;
}

const OpenAIKeyForm = ({ defaultModel = 'gpt-3.5-turbo', additionalConfig = {}, onApiKeySaved }: OpenAIKeyFormProps) => {
  const { user } = useAuth();
  const [apiKey, setApiKey] = useState('');
  const [preferredModel, setPreferredModel] = useState(defaultModel);
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const { preferences, setPreferences, isLoading } = useUserPreferences({
    module: 'openai',
    key: 'settings',
    defaultValue: { apiKey: '', preferredModel: defaultModel }
  });

  useEffect(() => {
    if (!user) {
      const storedData = loadFromLocalStorage(localStorageKey, defaultModel, additionalConfig);
      setApiKey(storedData.key || '');
      setPreferredModel(storedData.model);
      setIsApiKeySet(!!storedData.key);
    } else {
      if (preferences && typeof preferences === 'object' && 'apiKey' in preferences) {
        setApiKey(preferences.apiKey || '');
        setPreferredModel(preferences.preferredModel || defaultModel);
        setIsApiKeySet(!!preferences.apiKey);
      }
    }
  }, [user, preferences, defaultModel, additionalConfig]);

  const handleSaveApiKey = async () => {
    setIsSaving(true);
    try {
      if (user) {
        await setPreferences({ apiKey, preferredModel });
      } else {
        saveToLocalStorage(localStorageKey, apiKey, preferredModel, additionalConfig);
      }
      setIsApiKeySet(true);
      toast.success('API Key saved successfully!');
      if (onApiKeySaved) {
        onApiKeySaved(apiKey, preferredModel, additionalConfig);
      }
    } catch (error) {
      console.error('Error saving API key:', error);
      toast.error('Failed to save API Key.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearApiKey = async () => {
    setIsClearing(true);
    try {
      if (user) {
        await setPreferences({ apiKey: '', preferredModel: defaultModel });
      } else {
        clearFromLocalStorage(localStorageKey);
      }
      setApiKey('');
      setIsApiKeySet(false);
      toast.success('API Key cleared successfully!');
    } catch (error) {
      console.error('Error clearing API key:', error);
      toast.error('Failed to clear API Key.');
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <Label htmlFor="openAIKey">OpenAI API Key</Label>
        <Input
          id="openAIKey"
          placeholder="sk-..."
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="preferredModel">Preferred Model</Label>
        <Select value={preferredModel} onValueChange={setPreferredModel} disabled={isLoading}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-3.5-turbo">gpt-3.5-turbo</SelectItem>
            <SelectItem value="gpt-4">gpt-4</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        {isApiKeySet ? (
          <Button
            variant="destructive"
            onClick={handleClearApiKey}
            disabled={isLoading || isClearing}
            className={cn(isClearing && "animate-pulse")}
          >
            {isClearing ? (
              <>
                Clearing <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              "Clear API Key"
            )}
          </Button>
        ) : (
          <Button
            onClick={handleSaveApiKey}
            disabled={isLoading || isSaving || !apiKey}
            className={cn(isSaving && "animate-pulse")}
          >
            {isSaving ? (
              <>
                Saving <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              "Save API Key"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default OpenAIKeyForm;
