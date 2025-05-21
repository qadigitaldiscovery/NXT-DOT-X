import { useCallback } from 'react';
import { toast } from 'sonner';
/**
 * Hook for handling API key verification
 */
export const useApiKeyVerification = ({ providerName, onVerify, saveToLocalStorage, saveToDatabase }) => {
    const verifyApiKey = useCallback(async (apiKey, preferredModel, additionalConfig, callbacks) => {
        const { setVerifying, setSaving, setSavedKey, setKeyStatus, setSavedSuccessfully } = callbacks;
        setVerifying(true);
        setKeyStatus('unknown');
        try {
            // Verify the key if a verification function is provided
            if (onVerify) {
                const isValid = await onVerify(apiKey);
                if (!isValid) {
                    toast.error(`Invalid ${providerName} API key. Please check and try again.`);
                    setVerifying(false);
                    setKeyStatus('invalid');
                    return false;
                }
            }
            // Set saving state
            setVerifying(false);
            setSaving(true);
            // Save to localStorage first (always works)
            saveToLocalStorage(apiKey, preferredModel, additionalConfig);
            // Try to save to database if user is logged in
            try {
                await saveToDatabase(apiKey, preferredModel, additionalConfig);
            }
            catch (e) {
                console.warn("Could not save to database, but saved to localStorage");
            }
            toast.success(`${providerName} API key saved successfully!`);
            setSaving(false);
            setSavedSuccessfully(true);
            setSavedKey(true);
            setKeyStatus('valid');
            return true;
        }
        catch (error) {
            // Special handling for quota exceeded errors
            if (error.message === 'quota_exceeded' ||
                error.message?.includes('quota') ||
                error.message?.includes('rate_limit')) {
                toast.warning(`Your ${providerName} API key appears valid but has insufficient quota. It has been saved anyway.`);
                saveToLocalStorage(apiKey, preferredModel, additionalConfig);
                setVerifying(false);
                setSaving(false);
                setSavedKey(true);
                setKeyStatus('quota_exceeded');
                return true;
            }
            console.error(`Error verifying ${providerName} API key:`, error);
            toast.error(`Failed to verify ${providerName} API key. Please check and try again.`);
            setVerifying(false);
            setSaving(false);
            setKeyStatus('invalid');
            return false;
        }
    }, [onVerify, providerName, saveToLocalStorage, saveToDatabase]);
    return { verifyApiKey };
};
