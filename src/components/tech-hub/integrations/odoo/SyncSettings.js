import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SyncSettingItem from './SyncSettingItem';
import { fetchSyncSettings, updateSyncSetting, startSynchronization } from './utils/syncUtils';
const SyncSettings = ({ odooConfig, syncSettings, setSyncSettings }) => {
    const [isLoading, setIsLoading] = useState(false);
    // Handle sync frequency change
    const handleSyncFrequencyChange = async (entityType, frequency) => {
        const setting = syncSettings.find(s => s.entity_type === entityType);
        if (setting) {
            try {
                setIsLoading(true);
                const success = await updateSyncSetting(odooConfig.id || '', entityType, setting.is_enabled, frequency, syncSettings);
                if (success && odooConfig.id) {
                    const updatedSettings = await fetchSyncSettings(odooConfig.id);
                    setSyncSettings(updatedSettings);
                    toast.success("Synchronization frequency updated");
                }
            }
            finally {
                setIsLoading(false);
            }
        }
    };
    // Handle sync toggle
    const handleSyncToggle = async (entityType, isEnabled) => {
        try {
            setIsLoading(true);
            const success = await updateSyncSetting(odooConfig.id || '', entityType, isEnabled, undefined, syncSettings);
            if (success && odooConfig.id) {
                const updatedSettings = await fetchSyncSettings(odooConfig.id);
                setSyncSettings(updatedSettings);
                toast.success(`Synchronization ${isEnabled ? 'enabled' : 'disabled'}`);
            }
        }
        finally {
            setIsLoading(false);
        }
    };
    // Start manual synchronization
    const handleStartSynchronization = async () => {
        if (!odooConfig?.id)
            return;
        try {
            setIsLoading(true);
            // Get enabled sync settings
            const enabledSettings = syncSettings.filter(s => s.is_enabled);
            if (enabledSettings.length === 0) {
                toast.warning("No synchronization options are enabled");
                return;
            }
            // Use the API key if available in the config
            const apiKey = odooConfig.config.api_key;
            await startSynchronization(odooConfig.id, apiKey, enabledSettings);
            toast.success("Synchronization started successfully!");
            // Refresh sync settings to show updated last_synced_at
            if (odooConfig.id) {
                const updatedSettings = await fetchSyncSettings(odooConfig.id);
                setSyncSettings(updatedSettings);
            }
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to start synchronization");
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Synchronization Options" }), _jsx(CardDescription, { children: "Choose which data to synchronize between systems" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsx(SyncSettingItem, { id: "products", title: "Products & Inventory", description: "Synchronize products, variants, and inventory levels", setting: syncSettings.find(s => s.entity_type === 'products'), isLoading: isLoading, onToggle: (isEnabled) => handleSyncToggle('products', isEnabled), onFrequencyChange: (frequency) => handleSyncFrequencyChange('products', frequency) }), _jsx(SyncSettingItem, { id: "customers", title: "Customers & Orders", description: "Synchronize customer data and order history", setting: syncSettings.find(s => s.entity_type === 'customers'), isLoading: isLoading, onToggle: (isEnabled) => handleSyncToggle('customers', isEnabled), onFrequencyChange: (frequency) => handleSyncFrequencyChange('customers', frequency) }), _jsx(SyncSettingItem, { id: "invoices", title: "Invoices & Payments", description: "Synchronize invoices and payment records", setting: syncSettings.find(s => s.entity_type === 'invoices'), isLoading: isLoading, onToggle: (isEnabled) => handleSyncToggle('invoices', isEnabled), onFrequencyChange: (frequency) => handleSyncFrequencyChange('invoices', frequency) })] }) }), _jsx(CardFooter, { children: _jsx(Button, { variant: "default", onClick: handleStartSynchronization, disabled: isLoading || syncSettings.filter(s => s.is_enabled).length === 0, className: "w-full", children: isLoading ? "Processing..." : "Start Synchronization" }) })] }));
};
export default SyncSettings;
