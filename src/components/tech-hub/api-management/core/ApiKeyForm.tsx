
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AdvancedConfigSection } from './components/AdvancedConfigSection';

export interface ApiKeyFormProps {
  providerName: string;
  apiKey?: string;
  isKeySet?: boolean;
  isVisible?: boolean;
  config?: Record<string, any>;
  onApiKeyChange?: (apiKey: string) => void;
  onVisibilityToggle?: () => void;
  onConfigUpdate?: (key: string, value: any) => void;
  // Added props that were missing but being used in other components
  apiKeyPlaceholder?: string;
  docsLink?: { text: string; url: string };
  onVerify?: (apiKey: string) => Promise<boolean>;
  preferredModelOptions?: { value: string; label: string }[];
  initialModel?: string;
  footerText?: string;
  additionalConfig?: Record<string, any>;
}

export const ApiKeyForm: React.FC<ApiKeyFormProps> = ({
  providerName,
  apiKey = '',
  isVisible = false,
  config = {},
  onApiKeyChange = () => {},
  onVisibilityToggle = () => {},
  onConfigUpdate = () => {},
  apiKeyPlaceholder,
  docsLink,
  onVerify,
  preferredModelOptions,
  footerText,
}) => {
  const [showAdvancedConfig, setShowAdvancedConfig] = React.useState(false);

  const handleConfigUpdate = (key: string, value: any) => {
    onConfigUpdate(key, value);
  };

  const advancedConfigFields = [
    { key: 'model', label: 'Model', type: 'string' as const },
    { key: 'temperature', label: 'Temperature', type: 'number' as const },
    { key: 'max_tokens', label: 'Max Tokens', type: 'number' as const },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="api-key">{providerName} API Key</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="api-key"
            type={isVisible ? "text" : "password"}
            placeholder={apiKeyPlaceholder || "Enter your API key"}
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
          />
          <Button variant="outline" size="sm" onClick={onVisibilityToggle}>
            {isVisible ? "Hide" : "Show"}
          </Button>
        </div>
        {docsLink && (
          <p className="text-xs mt-1 text-gray-500">
            Need a key? Visit <a href={docsLink.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">{docsLink.text}</a>
          </p>
        )}
      </div>
      
      {showAdvancedConfig && (
        <AdvancedConfigSection
          title="Advanced Configuration"
          config={config}
          onUpdate={handleConfigUpdate}
          fieldDefinitions={advancedConfigFields}
        />
      )}
      
      <Button variant="link" onClick={() => setShowAdvancedConfig(!showAdvancedConfig)}>
        {showAdvancedConfig ? "Hide Advanced Configuration" : "Show Advanced Configuration"}
      </Button>

      {footerText && (
        <p className="text-xs text-gray-500 border-t pt-4">
          {footerText}
        </p>
      )}
    </div>
  );
};

export default ApiKeyForm;
