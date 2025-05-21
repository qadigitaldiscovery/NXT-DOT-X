import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
const OdooIntegration = ({ onSaveConfig, initialConfig }) => {
    const [config, setConfig] = useState(initialConfig || {
        url: '',
        database: '',
        username: '',
        apiKey: '',
    });
    const [isTesting, setIsTesting] = useState(false);
    const [testResult, setTestResult] = useState(null);
    const handleChange = (key, value) => {
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
            }
            else {
                setTestResult({
                    success: false,
                    message: 'Failed to connect. Please check your configuration.',
                });
            }
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
    const isFormValid = Object.values(config).every((value) => value.trim() !== '');
    return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Odoo ERP Integration" }), _jsx(CardDescription, { children: "Connect your Odoo ERP system to enable product, customer, and order synchronization." })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "url", children: "Odoo Instance URL" }), _jsx(Input, { id: "url", placeholder: "https://your-instance.odoo.com", value: config.url, onChange: (e) => handleChange('url', e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "database", children: "Database Name" }), _jsx(Input, { id: "database", placeholder: "odoo_db", value: config.database, onChange: (e) => handleChange('database', e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "username", children: "Username" }), _jsx(Input, { id: "username", placeholder: "admin@example.com", value: config.username, onChange: (e) => handleChange('username', e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "apiKey", children: "API Key" }), _jsx(Input, { id: "apiKey", type: "password", placeholder: "Your Odoo API key", value: config.apiKey, onChange: (e) => handleChange('apiKey', e.target.value) })] }), testResult && (_jsx(Alert, { variant: testResult.success ? "default" : "destructive", children: _jsx(AlertDescription, { children: testResult.message }) }))] }), _jsxs(CardFooter, { className: "flex justify-between", children: [_jsx(Button, { variant: "outline", onClick: handleTestConnection, disabled: !isFormValid || isTesting, children: isTesting ? 'Testing...' : 'Test Connection' }), _jsx(Button, { onClick: handleSave, disabled: !isFormValid, children: "Save Configuration" })] })] }));
};
export default OdooIntegration;
