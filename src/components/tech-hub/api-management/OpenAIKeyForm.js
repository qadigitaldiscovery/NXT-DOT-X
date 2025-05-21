import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useAuth } from '@/context/AuthContext';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ReloadIcon } from '@radix-ui/react-icons';
import { ApiKeyInput } from './core/components/ApiKeyInput';
const OpenAIKeyForm = () => {
    const { user } = useAuth();
    const [apiKey, setApiKey] = useState('');
    const [preferredModel, setPreferredModel] = useState('gpt-3.5-turbo');
    const [isApiKeySet, setIsApiKeySet] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isClearing, setIsClearing] = useState(false);
    const [keyStatus, setKeyStatus] = useState('unknown');
    const [isVerifying, setIsVerifying] = useState(false);
    const { preferences, setPreferences, loading: isLoading } = useUserPreferences({
        module: 'openai',
        key: 'settings',
        defaultValue: { apiKey: '', preferredModel: 'gpt-3.5-turbo' }
    });
    useEffect(() => {
        if (!user) {
            const storedKey = localStorage.getItem('openAIKey');
            const storedModel = localStorage.getItem('openAIModel') || 'gpt-3.5-turbo';
            if (storedKey) {
                setApiKey(storedKey);
                setIsApiKeySet(true);
            }
            setPreferredModel(storedModel);
        }
        else {
            if (preferences && typeof preferences === 'object' && 'apiKey' in preferences) {
                setApiKey(preferences.apiKey || '');
                setPreferredModel(preferences.preferredModel || 'gpt-3.5-turbo');
                setIsApiKeySet(!!preferences.apiKey);
            }
        }
    }, [user, preferences]);
    const handleSaveApiKey = async () => {
        setIsSaving(true);
        try {
            if (user) {
                await setPreferences({ apiKey, preferredModel });
            }
            else {
                localStorage.setItem('openAIKey', apiKey);
                localStorage.setItem('openAIModel', preferredModel);
            }
            setIsApiKeySet(true);
            toast.success('API Key saved successfully!');
        }
        catch (error) {
            console.error('Error saving API key:', error);
            toast.error('Failed to save API Key.');
        }
        finally {
            setIsSaving(false);
        }
    };
    const handleClearApiKey = async () => {
        setIsClearing(true);
        try {
            if (user) {
                await setPreferences({ apiKey: '', preferredModel });
            }
            else {
                localStorage.removeItem('openAIKey');
            }
            setApiKey('');
            setIsApiKeySet(false);
            setKeyStatus('unknown');
            toast.success('API Key cleared successfully!');
        }
        catch (error) {
            console.error('Error clearing API key:', error);
            toast.error('Failed to clear API Key.');
        }
        finally {
            setIsClearing(false);
        }
    };
    const handleVerifyKey = async () => {
        setIsVerifying(true);
        try {
            // Simulate API key verification
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (apiKey.startsWith('sk-')) {
                setKeyStatus('valid');
                toast.success('API key verified successfully!');
            }
            else {
                setKeyStatus('invalid');
                toast.error('Invalid API key format');
            }
        }
        catch (error) {
            console.error('Error verifying API key:', error);
            toast.error('Failed to verify API key');
            setKeyStatus('invalid');
        }
        finally {
            setIsVerifying(false);
        }
    };
    const handleApiKeyChange = (value) => {
        setApiKey(value);
        if (keyStatus !== 'unknown') {
            setKeyStatus('unknown');
        }
    };
    return (_jsxs("div", { className: "flex flex-col space-y-4", children: [_jsx(ApiKeyInput, { apiKey: apiKey, isVerifying: isVerifying, keyStatus: keyStatus, placeholder: "sk-...", docsLink: {
                    text: "OpenAI API Keys page",
                    url: "https://platform.openai.com/api-keys"
                }, onApiKeyChange: handleApiKeyChange, onVerify: handleVerifyKey }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "preferredModel", children: "Preferred Model" }), _jsxs(Select, { value: preferredModel, onValueChange: setPreferredModel, disabled: isLoading, children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select a model" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "gpt-4o-mini", children: "gpt-4o Mini (Default)" }), _jsx(SelectItem, { value: "gpt-4o", children: "gpt-4o" }), _jsx(SelectItem, { value: "gpt-4-turbo", children: "gpt-4 Turbo" }), _jsx(SelectItem, { value: "gpt-3.5-turbo", children: "gpt-3.5 Turbo" })] })] })] }), _jsx("div", { className: "flex justify-end space-x-2", children: isApiKeySet ? (_jsx(Button, { variant: "destructive", onClick: handleClearApiKey, disabled: isLoading || isClearing, className: cn(isClearing && "animate-pulse"), children: isClearing ? (_jsxs(_Fragment, { children: ["Clearing ", _jsx(ReloadIcon, { className: "ml-2 h-4 w-4 animate-spin" })] })) : ("Clear API Key") })) : (_jsx(Button, { onClick: handleSaveApiKey, disabled: isLoading || isSaving || !apiKey || keyStatus === 'invalid', className: cn(isSaving && "animate-pulse"), children: isSaving ? (_jsxs(_Fragment, { children: ["Saving ", _jsx(ReloadIcon, { className: "ml-2 h-4 w-4 animate-spin" })] })) : ("Save API Key") })) })] }));
};
export default OpenAIKeyForm;
