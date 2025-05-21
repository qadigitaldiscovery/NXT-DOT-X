
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';

export interface WooCommerceConfig {
  storeUrl: string;
  consumerKey: string;
  consumerSecret: string;
  autoSync: boolean;
  syncInterval: number;
}

interface ConfigurationFormProps {
  onSaveConfig: (config: WooCommerceConfig) => Promise<void>;
  initialConfig?: WooCommerceConfig;
}

const ConfigurationForm: React.FC<ConfigurationFormProps> = ({ onSaveConfig, initialConfig }) => {
  const [config, setConfig] = useState<WooCommerceConfig>(
    initialConfig || {
      storeUrl: '',
      consumerKey: '',
      consumerSecret: '',
      autoSync: false,
      syncInterval: 60,
    }
  );
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (field: keyof WooCommerceConfig, value: string | boolean | number) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    // Clear test result when config changes
    setTestResult(null);
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    try {
      // In a real implementation, this would make an actual API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      // Simple validation for demo purposes
      if (!config.storeUrl.startsWith('https://')) {
        throw new Error('Store URL must start with https://');
      }
      
      if (config.consumerKey.length < 10 || config.consumerSecret.length < 10) {
        throw new Error('API keys must be valid length');
      }
      
      setTestResult({
        success: true,
        message: 'Successfully connected to WooCommerce API!',
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = async () => {
    await onSaveConfig(config);
  };
  
  const isFormValid = config.storeUrl && config.consumerKey && config.consumerSecret;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>WooCommerce Configuration</CardTitle>
        <CardDescription>
          Connect your WooCommerce store to enable product and order synchronization.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="store-url">Store URL</Label>
          <Input
            id="store-url"
            placeholder="https://your-store.com"
            value={config.storeUrl}
            onChange={(e) => handleChange('storeUrl', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="consumer-key">Consumer Key</Label>
          <Input
            id="consumer-key"
            placeholder="ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            value={config.consumerKey}
            onChange={(e) => handleChange('consumerKey', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="consumer-secret">Consumer Secret</Label>
          <Input
            id="consumer-secret"
            type="password"
            placeholder="cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            value={config.consumerSecret}
            onChange={(e) => handleChange('consumerSecret', e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="auto-sync"
            checked={config.autoSync}
            onCheckedChange={(checked) => handleChange('autoSync', checked)}
          />
          <Label htmlFor="auto-sync">Enable automatic synchronization</Label>
        </div>
        
        {config.autoSync && (
          <div className="space-y-2">
            <Label htmlFor="sync-interval">Sync Interval (minutes)</Label>
            <Input
              id="sync-interval"
              type="number"
              min={5}
              max={1440}
              value={config.syncInterval}
              onChange={(e) => handleChange('syncInterval', parseInt(e.target.value) || 60)}
            />
          </div>
        )}
        
        {testResult && (
          <Alert variant={testResult.success ? "default" : "destructive"}>
            <AlertDescription>{testResult.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleTestConnection}
          disabled={!isFormValid || isTesting}
        >
          {isTesting ? 'Testing...' : 'Test Connection'}
        </Button>
        <Button 
          onClick={handleSave}
          disabled={!isFormValid}
        >
          Save Configuration
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConfigurationForm;
