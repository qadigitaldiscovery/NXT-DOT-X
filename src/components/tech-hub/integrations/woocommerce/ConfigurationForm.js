import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
const ConfigurationForm = ({ onSaveConfig, initialConfig }) => {
    const [config, setConfig] = useState(initialConfig || {
        storeUrl: '',
        consumerKey: '',
        consumerSecret: '',
        autoSync: false,
        syncInterval: 60,
    });
    const [isTesting, setIsTesting] = useState(false);
    const [testResult, setTestResult] = useState(null);
    const handleChange = (field, value) => {
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
        }
        catch (error) {
            setTestResult({
                success: false,
                message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            });
        }
        finally {
            setIsTesting(false);
        }
    };
    const handleSave = async () => {
        await onSaveConfig(config);
    };
    const isFormValid = config.storeUrl && config.consumerKey && config.consumerSecret;
    return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "WooCommerce Configuration" }), _jsx(CardDescription, { children: "Connect your WooCommerce store to enable product and order synchronization." })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "store-url", children: "Store URL" }), _jsx(Input, { id: "store-url", placeholder: "https://your-store.com", value: config.storeUrl, onChange: (e) => handleChange('storeUrl', e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "consumer-key", children: "Consumer Key" }), _jsx(Input, { id: "consumer-key", placeholder: "ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", value: config.consumerKey, onChange: (e) => handleChange('consumerKey', e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "consumer-secret", children: "Consumer Secret" }), _jsx(Input, { id: "consumer-secret", type: "password", placeholder: "cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", value: config.consumerSecret, onChange: (e) => handleChange('consumerSecret', e.target.value) })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { id: "auto-sync", checked: config.autoSync, onCheckedChange: (checked) => handleChange('autoSync', checked) }), _jsx(Label, { htmlFor: "auto-sync", children: "Enable automatic synchronization" })] }), config.autoSync && (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "sync-interval", children: "Sync Interval (minutes)" }), _jsx(Input, { id: "sync-interval", type: "number", min: 5, max: 1440, value: config.syncInterval, onChange: (e) => handleChange('syncInterval', parseInt(e.target.value) || 60) })] })), testResult && (_jsx(Alert, { variant: testResult.success ? "default" : "destructive", children: _jsx(AlertDescription, { children: testResult.message }) }))] }), _jsxs(CardFooter, { className: "flex justify-between", children: [_jsx(Button, { variant: "outline", onClick: handleTestConnection, disabled: !isFormValid || isTesting, children: isTesting ? 'Testing...' : 'Test Connection' }), _jsx(Button, { onClick: handleSave, disabled: !isFormValid, children: "Save Configuration" })] })] }));
};
export default ConfigurationForm;
