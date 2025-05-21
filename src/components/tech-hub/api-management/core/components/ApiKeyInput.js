import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export const ApiKeyInput = ({ apiKey, isVerifying, keyStatus, placeholder, docsLink, onApiKeyChange, onVerify }) => {
    const renderStatusMessage = () => {
        switch (keyStatus) {
            case 'valid':
                return _jsx("p", { className: "text-sm text-green-500 mt-1", children: "\u2713 Valid API key saved" });
            case 'invalid':
                return _jsx("p", { className: "text-sm text-red-500 mt-1", children: "\u2717 Invalid API key" });
            case 'quota_exceeded':
                return (_jsxs("p", { className: "text-sm text-amber-500 mt-1", children: ["\u26A0 Valid key, but quota exceeded. ", docsLink && (_jsx("a", { href: docsLink.url, target: "_blank", rel: "noopener noreferrer", className: "underline hover:text-amber-600", children: "Check your billing" }))] }));
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "apiKey", children: "API Key" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { id: "apiKey", type: "password", value: apiKey, onChange: (e) => onApiKeyChange(e.target.value), placeholder: placeholder, className: "flex-1" }), _jsx(Button, { onClick: onVerify, disabled: isVerifying || !apiKey.trim(), children: isVerifying ? "Verifying..." : "Verify" })] }), renderStatusMessage()] }));
};
export default ApiKeyInput;
