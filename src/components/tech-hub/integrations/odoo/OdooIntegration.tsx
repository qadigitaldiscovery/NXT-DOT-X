
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';

export interface OdooConfig {
  url: string;
  database: string;
  username: string;
  apiKey: string;
}

interface OdooIntegrationProps {
  onSaveConfig: (config: OdooConfig) => Promise<void>;
  initialConfig?: OdooConfig;
}

const OdooIntegration: React.FC<OdooIntegrationProps> = ({ onSaveConfig, initialConfig }) => {
  const [config, setConfig] = useState<OdooConfig>(
    initialConfig || {
      url: '',
      database: '',
      username: '',
      apiKey: '',
    }
  );
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  const handleChange = (key: keyof OdooConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    // Clear test result when config changes
    setTestResult(null);
  };
  
  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    try {
      // In a real implementation, this would make an actual API call to test the connection
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      
      // For demo purposes, let's consider it successful if all fields are filled
      const isConfigValid = Object.values(config).every((value) => value.trim() !== '');
      
      if (isConfigValid) {
        setTestResult({
          success: true,
          message: 'Successfully connected to Odoo API!',
        });
      } else {
        setTestResult({
          success: false,
          message: 'Failed to connect. Please check your configuration.',
        });
      }
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
  
  const isFormValid = Object.values(config).every((value) => value.trim() !== '');
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Odoo ERP Integration</CardTitle>
        <CardDescription>
          Connect your Odoo ERP system to enable product, customer, and order synchronization.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">Odoo Instance URL</Label>
          <Input
            id="url"
            placeholder="https://your-instance.odoo.com"
            value={config.url}
            onChange={(e) => handleChange('url', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="database">Database Name</Label>
          <Input
            id="database"
            placeholder="odoo_db"
            value={config.database}
            onChange={(e) => handleChange('database', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="admin@example.com"
            value={config.username}
            onChange={(e) => handleChange('username', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <Input
            id="apiKey"
            type="password"
            placeholder="Your Odoo API key"
            value={config.apiKey}
            onChange={(e) => handleChange('apiKey', e.target.value)}
          />
        </div>
        
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

export default OdooIntegration;
