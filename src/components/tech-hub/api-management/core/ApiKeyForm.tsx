
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AdvancedConfigSection } from './components/AdvancedConfigSection';

export interface ApiKeyFormProps {
  providerName: string;
  apiKey: string;
  isKeySet: boolean;
  isVisible: boolean;
  config: Record<string, any>;
  onApiKeyChange: (apiKey: string) => void;
  onVisibilityToggle: () => void;
  onConfigUpdate: (key: string, value: any) => void;
}

export const ApiKeyForm: React.FC<ApiKeyFormProps> = ({
  providerName,
  apiKey,
  isVisible,
  config,
  onApiKeyChange,
  onVisibilityToggle,
  onConfigUpdate
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
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
          />
          <Button variant="outline" size="sm" onClick={onVisibilityToggle}>
            {isVisible ? "Hide" : "Show"}
          </Button>
        </div>
      </div>
      
      {/* Advanced configuration section with fixed props */}
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
    </div>
  );
};

export default ApiKeyForm;
