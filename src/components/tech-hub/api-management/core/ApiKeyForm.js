import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
export default function ApiKeyForm({ providerName, apiKey, isVisible, config, apiKeyPlaceholder = "API key...", docsLink, footerText, preferredModelOptions, initialModel, onApiKeyChange, onVisibilityToggle, onConfigUpdate, }) {
    const handleApiKeyChange = (e) => {
        onApiKeyChange(e.target.value);
    };
    const handleSaveApiKey = async () => {
        // We need to validate and save the API key
        if (apiKey.trim() === '')
            return;
        onApiKeyChange(apiKey.trim());
    };
    const handleClearApiKey = () => {
        onApiKeyChange('');
    };
    const isApiKeySaved = apiKey && apiKey.trim() !== '';
    return (_jsxs(Card, { className: "w-full", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg", children: [providerName, " API Configuration"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "API Key" }), _jsxs("div", { className: "flex", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Input, { type: isVisible ? "text" : "password", value: apiKey, onChange: handleApiKeyChange, placeholder: apiKeyPlaceholder, className: "pr-10" }), _jsx(Button, { type: "button", variant: "ghost", size: "icon", className: "absolute right-0 top-0 h-full", onClick: onVisibilityToggle, children: isVisible ? _jsx(EyeOffIcon, { className: "h-4 w-4" }) : _jsx(EyeIcon, { className: "h-4 w-4" }) })] }), isApiKeySaved ? (_jsx(Button, { className: "ml-2", variant: "outline", onClick: handleClearApiKey, children: "Clear" })) : (_jsx(Button, { className: "ml-2", onClick: handleSaveApiKey, children: "Save" }))] }), docsLink && (_jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: ["Need a key? Visit", " ", _jsxs("a", { href: docsLink.url, target: "_blank", rel: "noreferrer", className: "text-primary hover:underline inline-flex items-center", children: [docsLink.text, _jsx(ExternalLink, { className: "ml-1 h-3 w-3" })] })] }))] }), preferredModelOptions && preferredModelOptions.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Preferred Model" }), _jsxs(Select, { value: config.model || initialModel, onValueChange: (value) => onConfigUpdate('model', value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select model" }) }), _jsx(SelectContent, { children: preferredModelOptions.map((option) => (_jsx(SelectItem, { value: option.value, children: option.label }, option.value))) })] })] })), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("label", { className: "text-sm font-medium", children: "Temperature" }), _jsx("span", { className: "text-xs text-muted-foreground", children: config.temperature ?? 0.7 })] }), _jsx(Input, { type: "range", min: 0, max: 2, step: 0.1, value: config.temperature ?? 0.7, onChange: (e) => onConfigUpdate('temperature', parseFloat(e.target.value)) }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Higher values produce more creative outputs, lower values more deterministic." })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("label", { className: "text-sm font-medium", children: "Max Tokens" }), _jsx("span", { className: "text-xs text-muted-foreground", children: config.max_tokens ?? 2048 })] }), _jsx(Input, { type: "range", min: 1, max: 4096, step: 1, value: config.max_tokens ?? 2048, onChange: (e) => onConfigUpdate('max_tokens', parseInt(e.target.value)) }), _jsx("p", { className: "text-xs text-muted-foreground", children: "The maximum number of tokens to generate in the completion." })] })] }), footerText && (_jsx(CardFooter, { children: _jsx(Alert, { children: _jsx(AlertDescription, { className: "text-xs", children: footerText }) }) }))] }));
}
