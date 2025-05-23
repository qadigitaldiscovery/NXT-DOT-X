
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Save } from 'lucide-react';

export const OpenAIKeyForm: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [preferredModel, setPreferredModel] = useState('gpt-4');

  const { preferences, setPreferences, isLoading, error } = useUserPreferences({
    module: 'openai',
    key: 'settings',
    defaultValue: { apiKey: '', preferredModel: 'gpt-4' }
  });

  useEffect(() => {
    if (preferences) {
      if (typeof preferences === 'object' && preferences.apiKey) {
        setApiKey(preferences.apiKey || '');
      }
      if (typeof preferences === 'object' && preferences.preferredModel) {
        setPreferredModel(preferences.preferredModel || 'gpt-4');
      }
    }
  }, [preferences]);

  const handleSave = async () => {
    try {
      await setPreferences({ apiKey, preferredModel });
      toast.success('OpenAI settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>OpenAI API Configuration</CardTitle>
        <CardDescription>
          Configure your OpenAI API settings for AI assistants
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="OpenAI API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred-model">Preferred Model</Label>
            <Select value={preferredModel} onValueChange={setPreferredModel}>
              <SelectTrigger id="preferred-model">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full" 
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Settings
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpenAIKeyForm;
