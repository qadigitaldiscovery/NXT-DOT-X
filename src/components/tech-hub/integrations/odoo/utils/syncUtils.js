import { toast } from "sonner";
import { supabase } from "../../../../../../integrations/supabase/client";
/**
 * Update a synchronization setting
 */
export const updateSyncSetting = async (integrationId, entityType, isEnabled, frequency, currentSettings) => {
    if (!integrationId)
        return false;
    try {
        // Check if setting already exists
        const existingSetting = currentSettings?.find(s => s.entity_type === entityType);
        if (existingSetting) {
            // Update existing setting
            const { error } = await supabase
                .from('integration_sync_settings')
                .update({
                is_enabled: isEnabled,
                sync_frequency: frequency || existingSetting.sync_frequency,
                updated_at: new Date().toISOString()
            })
                .eq('id', existingSetting.id || '');
            if (error) {
                console.error("Failed to update sync setting:", error);
                toast.error("Failed to update synchronization settings");
                return false;
            }
        }
        else {
            // Create new setting
            const { error } = await supabase
                .from('integration_sync_settings')
                .insert({
                integration_id: integrationId,
                entity_type: entityType,
                is_enabled: isEnabled,
                sync_frequency: frequency || 'daily'
            });
            if (error) {
                console.error("Failed to create sync setting:", error);
                toast.error("Failed to save synchronization settings");
                return false;
            }
        }
        return true;
    }
    catch (err) {
        console.error("Error updating sync settings:", err);
        toast.error("An unexpected error occurred");
        return false;
    }
};
/**
 * Fetch sync settings for an integration
 */
export const fetchSyncSettings = async (integrationId) => {
    try {
        const { data, error } = await supabase
            .from('integration_sync_settings')
            .select('*')
            .eq('integration_id', integrationId);
        if (error) {
            console.error("Failed to load sync settings:", error);
            return [];
        }
        return data;
    }
    catch (err) {
        console.error("Error fetching sync settings:", err);
        return [];
    }
};
/**
 * Start synchronization with the Odoo instance, including a simple retry mechanism
 */
export const startSynchronization = async (odooConfigId, apiKey, enabledSettings, retryCount = 3) => {
    let attempts = 0;
    let lastError;
    while (attempts < retryCount) {
        try {
            const response = await fetch('/api/edge/integrations/odoo/sync', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {})
                },
                body: JSON.stringify({
                    integration_id: odooConfigId,
                    entities: enabledSettings.map(s => s.entity_type)
                })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Synchronization failed");
            }
            const result = await response.json();
            if (result && typeof result === 'object' && 'success' in result && result.success === true) {
                // Update last_synced_at for the settings
                for (const setting of enabledSettings) {
                    if (setting.id) {
                        await supabase
                            .from('integration_sync_settings')
                            .update({ last_synced_at: new Date().toISOString() })
                            .eq('id', setting.id);
                    }
                }
                return true;
            }
            throw new Error(typeof result === 'object' &&
                result !== null &&
                'message' in result &&
                typeof result.message === 'string'
                ? result.message
                : "Synchronization failed");
        }
        catch (error) {
            attempts++;
            lastError = error;
            console.error(`Synchronization attempt #${attempts} failed:`, error);
            if (attempts < retryCount) {
                console.info("Retrying synchronization...");
            }
        }
    }
    toast.error(`Synchronization failed after ${retryCount} attempts: ${lastError?.message}`);
    throw lastError;
};
