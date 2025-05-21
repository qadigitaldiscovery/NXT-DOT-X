import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Database, CheckCircle, XCircle, Key } from "lucide-react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { tryUseEdgeFunction } from "@/utils/api-clients/common/edge-function-utils";
const OdooConnectionForm = ({ odooConfig, setOdooConfig, fetchExistingConfig, connectionStatus, setConnectionStatus }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isTesting, setIsTesting] = useState(false);
    const [authMethod, setAuthMethod] = useState('credentials');
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            auth_method: 'credentials'
        }
    });
    const currentAuthMethod = watch('auth_method');
    // Handle authentication method change
    useEffect(() => {
        if (currentAuthMethod) {
            setAuthMethod(currentAuthMethod);
        }
    }, [currentAuthMethod]);
    // Test the connection to Odoo
    const testConnection = async (data) => {
        setIsTesting(true);
        try {
            console.log("Testing connection with auth method:", data.auth_method);
            // Prepare request data based on authentication method
            const requestData = {
                action: 'test_connection',
                url: data.url,
                db_name: data.db_name,
            };
            // Add authentication details based on method
            if (data.auth_method === 'api_key') {
                requestData.api_key = data.api_key;
            }
            else {
                requestData.username = data.username;
                requestData.password = data.password;
            }
            let result;
            // Using tryUseEdgeFunction with API key when applicable
            if (data.auth_method === 'api_key' && data.api_key) {
                console.log("Testing with API key authentication");
                result = await tryUseEdgeFunction('api-integrations', {
                    endpoint: 'odoo',
                    action: 'test_connection',
                    url: data.url,
                    db_name: data.db_name,
                    api_key: data.api_key
                }, {
                    apiKey: data.api_key
                });
            }
            else {
                console.log("Testing with credentials authentication");
                result = await tryUseEdgeFunction('api-integrations', {
                    endpoint: 'odoo',
                    action: 'test_connection',
                    url: data.url,
                    db_name: data.db_name,
                    username: data.username,
                    password: data.password
                });
            }
            if (!result) {
                throw new Error("Connection test failed - no response from server");
            }
            if (result.success) {
                setConnectionStatus('success');
                toast.success("Successfully connected to Odoo ERP!");
                return true;
            }
            else {
                throw new Error(result.message || "Connection test failed");
            }
        }
        catch (error) {
            console.error("Connection test failed:", error);
            setConnectionStatus('error');
            toast.error(error instanceof Error ? error.message : "Failed to connect to Odoo ERP");
            return false;
        }
        finally {
            setIsTesting(false);
        }
    };
    // Save the Odoo configuration
    const saveConfiguration = async (data) => {
        try {
            setIsLoading(true);
            const { data: session } = await supabase.auth.getSession();
            if (!session?.session) {
                toast.error("You must be logged in to save configurations");
                return false;
            }
            // Build the config object based on the authentication method
            const config = {
                url: data.url,
                db_name: data.db_name,
                auth_method: data.auth_method,
            };
            // Add credentials based on auth method
            if (data.auth_method === 'api_key') {
                config.api_key = data.api_key;
            }
            else {
                config.username = data.username;
                config.password = data.password;
            }
            const operation = odooConfig ? 'update' : 'insert';
            if (operation === 'update' && odooConfig?.id) {
                const { error } = await supabase
                    .from('integration_configs')
                    .update({
                    config,
                    updated_at: new Date().toISOString()
                })
                    .eq('id', odooConfig.id);
                if (error) {
                    console.error("Failed to update Odoo configuration:", error);
                    toast.error("Failed to update configuration");
                    return false;
                }
            }
            else {
                const { data: newConfig, error } = await supabase
                    .from('integration_configs')
                    .insert({
                    name: 'Odoo ERP',
                    integration_type: 'odoo',
                    config,
                    is_active: true,
                    created_by: session.session.user.id
                })
                    .select()
                    .single();
                if (error) {
                    console.error("Failed to save Odoo configuration:", error);
                    toast.error("Failed to save configuration");
                    return false;
                }
                setOdooConfig(newConfig);
            }
            toast.success(`Odoo configuration ${operation === 'update' ? 'updated' : 'saved'} successfully`);
            await fetchExistingConfig(); // Refresh the config
            return true;
        }
        catch (err) {
            console.error("Exception while saving Odoo configuration:", err);
            toast.error("An unexpected error occurred");
            return false;
        }
        finally {
            setIsLoading(false);
        }
    };
    // Handle form submission
    const onSubmit = async (data) => {
        const connectionSuccessful = await testConnection(data);
        if (connectionSuccessful) {
            await saveConfiguration(data);
        }
    };
    // Delete configuration
    const deleteConfiguration = async () => {
        if (!odooConfig?.id)
            return;
        try {
            const confirmed = window.confirm("Are you sure you want to delete this Odoo integration configuration?");
            if (!confirmed)
                return;
            setIsLoading(true);
            const { error } = await supabase
                .from('integration_configs')
                .delete()
                .eq('id', odooConfig.id);
            if (error) {
                console.error("Failed to delete Odoo configuration:", error);
                toast.error("Failed to delete configuration");
                return;
            }
            setOdooConfig(null);
            setConnectionStatus('idle');
            toast.success("Odoo configuration deleted successfully");
            // Reset form
            setValue("url", "");
            setValue("db_name", "");
            setValue("username", "");
            setValue("password", "");
            setValue("api_key", "");
            setValue("auth_method", "credentials");
            setAuthMethod("credentials");
        }
        catch (err) {
            console.error("Exception while deleting Odoo configuration:", err);
            toast.error("An unexpected error occurred");
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Database, { className: "h-6 w-6 text-primary" }), _jsx(CardTitle, { children: "Odoo ERP Configuration" })] }), _jsx(CardDescription, { children: "Enter your Odoo ERP connection details" })] }), _jsxs(CardContent, { children: [_jsx("form", { id: "odoo-form", onSubmit: handleSubmit(onSubmit), children: _jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "grid grid-cols-1 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "url", children: "Odoo URL" }), _jsx(Input, { id: "url", placeholder: "https://your-odoo-instance.com", ...register("url", { required: "URL is required" }) }), errors.url && (_jsx("p", { className: "text-sm text-red-500", children: errors.url.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "db_name", children: "Database Name" }), _jsx(Input, { id: "db_name", placeholder: "odoo_db", ...register("db_name", { required: "Database name is required" }) }), errors.db_name && (_jsx("p", { className: "text-sm text-red-500", children: errors.db_name.message }))] }), _jsxs("div", { className: "space-y-2 mb-4", children: [_jsx(Label, { children: "Authentication Method" }), _jsxs("div", { className: "flex space-x-4", children: [_jsxs("label", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "radio", value: "credentials", ...register("auth_method"), className: "h-4 w-4", checked: authMethod === "credentials", onChange: () => setAuthMethod("credentials") }), _jsx("span", { children: "Username & Password" })] }), _jsxs("label", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "radio", value: "api_key", ...register("auth_method"), className: "h-4 w-4", checked: authMethod === "api_key", onChange: () => setAuthMethod("api_key") }), _jsx("span", { children: "API Key" })] })] })] }), authMethod === "credentials" ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "username", children: "Username" }), _jsx(Input, { id: "username", placeholder: "admin", ...register("username", {
                                                            required: authMethod === "credentials" ? "Username is required" : false
                                                        }) }), errors.username && (_jsx("p", { className: "text-sm text-red-500", children: errors.username.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "password", children: "Password" }), _jsx(Input, { id: "password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", ...register("password", {
                                                            required: authMethod === "credentials" ? "Password is required" : false
                                                        }) }), errors.password && (_jsx("p", { className: "text-sm text-red-500", children: errors.password.message }))] })] })) : (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "api_key", children: "API Key" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Key, { className: "h-4 w-4 text-gray-400" }), _jsx(Input, { id: "api_key", type: "password", placeholder: "Enter your Odoo API key", ...register("api_key", {
                                                            required: authMethod === "api_key" ? "API key is required" : false
                                                        }) })] }), errors.api_key && (_jsx("p", { className: "text-sm text-red-500", children: errors.api_key.message })), _jsx("p", { className: "text-xs text-muted-foreground", children: "API keys can be generated from your Odoo ERP account settings. You'll also need to set this API key in the Supabase Edge Function secrets." })] }))] }) }) }), connectionStatus === 'success' && (_jsxs(Alert, { className: "mt-4 bg-green-50 border-green-200", children: [_jsx(CheckCircle, { className: "h-5 w-5 text-green-600" }), _jsx(AlertTitle, { className: "text-green-800", children: "Connection Successful" }), _jsx(AlertDescription, { className: "text-green-700", children: "Your Odoo ERP instance is properly configured and connected." })] })), connectionStatus === 'error' && (_jsxs(Alert, { className: "mt-4 bg-red-50 border-red-200", children: [_jsx(XCircle, { className: "h-5 w-5 text-red-600" }), _jsx(AlertTitle, { className: "text-red-800", children: "Connection Failed" }), _jsx(AlertDescription, { className: "text-red-700", children: "Unable to connect to your Odoo ERP instance. Please check your credentials." })] }))] }), _jsxs(CardFooter, { className: "flex justify-end space-x-2", children: [odooConfig && (_jsx(Button, { variant: "outline", onClick: deleteConfiguration, disabled: isLoading, className: "mr-auto text-red-500 hover:text-red-700 hover:bg-red-50", children: "Delete Configuration" })), _jsx(Button, { type: "button", variant: "outline", onClick: fetchExistingConfig, disabled: isLoading || isTesting, children: "Reset" }), _jsx(Button, { type: "submit", form: "odoo-form", disabled: isLoading || isTesting, children: isTesting ? "Testing Connection..." : isLoading ? "Saving..." : "Save & Test Connection" })] })] }));
};
export default OdooConnectionForm;
