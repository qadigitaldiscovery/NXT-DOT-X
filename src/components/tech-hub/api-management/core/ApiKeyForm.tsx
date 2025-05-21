
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ApiKeyFormProps {
  providerName: string;
  apiKey: string;
  isVisible: boolean;
  config: Record<string, any>;
  apiKeyPlaceholder?: string;
  docsLink?: { text: string; url: string };
  footerText?: string;
  preferredModelOptions?: Array<{ value: string; label: string }>;
  initialModel?: string;
  onApiKeyChange: (apiKey: string) => void;
  onVisibilityToggle: () => void;
  onConfigUpdate: (key: string, value: any) => void;
  onVerify?: (apiKey: string) => Promise<boolean>;
}

export default function ApiKeyForm({
  providerName,
  apiKey,
  isVisible,
  config,
  apiKeyPlaceholder = "API key...",
  docsLink,
  footerText,
  preferredModelOptions,
  initialModel,
  onApiKeyChange,
  onVisibilityToggle,
  onConfigUpdate,
}: ApiKeyFormProps) {

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onApiKeyChange(e.target.value);
  };

  const handleSaveApiKey = async () => {
    // We need to validate and save the API key
    if (apiKey.trim() === '') return;
    onApiKeyChange(apiKey.trim());
  };

  const handleClearApiKey = () => {
    onApiKeyChange('');
  };

  const isApiKeySaved = apiKey && apiKey.trim() !== '';

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{providerName} API Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">API Key</label>
          <div className="flex">
            <div className="relative flex-1">
              <Input
                type={isVisible ? "text" : "password"}
                value={apiKey}
                onChange={handleApiKeyChange}
                placeholder={apiKeyPlaceholder}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={onVisibilityToggle}
              >
                {isVisible ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </Button>
            </div>
            {isApiKeySaved ? (
              <Button
                className="ml-2"
                variant="outline"
                onClick={handleClearApiKey}
              >
                Clear
              </Button>
            ) : (
              <Button
                className="ml-2"
                onClick={handleSaveApiKey}
              >
                Save
              </Button>
            )}
          </div>
          {docsLink && (
            <p className="text-xs text-muted-foreground mt-1">
              Need a key? Visit{" "}
              <a
                href={docsLink.url}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline inline-flex items-center"
              >
                {docsLink.text}
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </p>
          )}
        </div>

        {preferredModelOptions && preferredModelOptions.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Preferred Model</label>
            <Select
              value={config.model || initialModel}
              onValueChange={(value) => onConfigUpdate('model', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {preferredModelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Temperature</label>
            <span className="text-xs text-muted-foreground">
              {config.temperature ?? 0.7}
            </span>
          </div>
          <Input
            type="range"
            min={0}
            max={2}
            step={0.1}
            value={config.temperature ?? 0.7}
            onChange={(e) => onConfigUpdate('temperature', parseFloat(e.target.value))}
          />
          <p className="text-xs text-muted-foreground">
            Higher values produce more creative outputs, lower values more deterministic.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Max Tokens</label>
            <span className="text-xs text-muted-foreground">
              {config.max_tokens ?? 2048}
            </span>
          </div>
          <Input
            type="range"
            min={1}
            max={4096}
            step={1}
            value={config.max_tokens ?? 2048}
            onChange={(e) => onConfigUpdate('max_tokens', parseInt(e.target.value))}
          />
          <p className="text-xs text-muted-foreground">
            The maximum number of tokens to generate in the completion.
          </p>
        </div>
      </CardContent>
      {footerText && (
        <CardFooter>
          <Alert>
            <AlertDescription className="text-xs">{footerText}</AlertDescription>
          </Alert>
        </CardFooter>
      )}
    </Card>
  );
}
