import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
const ChatTester = ({ providerName, onSendMessage, placeholderText = `Enter a prompt to test the ${providerName} API...`, title, messages, onSubmit, isLoading: propIsLoading, error, onClear, }) => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [localIsLoading, setLocalIsLoading] = useState(false);
    // Use either the prop loading state or local state
    const isLoading = propIsLoading !== undefined ? propIsLoading : localIsLoading;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim())
            return;
        // If the parent component provided an onSubmit handler, use it
        if (onSubmit) {
            await onSubmit(prompt);
            return;
        }
        // Otherwise, use the default implementation
        try {
            setLocalIsLoading(true);
            setResponse('');
            const result = await onSendMessage(prompt);
            setResponse(result);
        }
        catch (error) {
            console.error(`Error testing ${providerName}:`, error);
            setResponse(`Error: Failed to get a response. Please check your API key and try again.`);
        }
        finally {
            setLocalIsLoading(false);
        }
    };
    // Render messages if provided, otherwise render the simple response
    const renderContent = () => {
        if (messages && messages.length > 0) {
            return (_jsx("div", { className: "mt-4 space-y-4", children: messages.map((msg, idx) => (_jsxs("div", { className: `p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-50 ml-8' : 'bg-gray-50 mr-8'}`, children: [_jsx("p", { className: "text-xs font-medium mb-1", children: msg.role === 'user' ? 'You' : providerName }), _jsx("div", { className: "whitespace-pre-wrap", children: msg.content })] }, idx))) }));
        }
        else if (response) {
            return (_jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Response:" }), _jsx("div", { className: "border rounded-md p-4 bg-gray-50 whitespace-pre-wrap", children: response })] }));
        }
        return null;
    };
    return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: title || `${providerName} Chat Test` }), _jsxs(CardDescription, { children: ["Send a test message to ", providerName, " to verify your API key is working"] })] }), _jsxs(CardContent, { children: [_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx("div", { children: _jsx(Textarea, { placeholder: placeholderText, value: prompt, onChange: (e) => setPrompt(e.target.value), rows: 4, className: "resize-none" }) }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { type: "submit", disabled: isLoading || !prompt.trim(), className: "flex-1", children: [isLoading && _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), isLoading ? 'Generating Response...' : 'Send Test Message'] }), onClear && (_jsx(Button, { type: "button", variant: "outline", onClick: onClear, children: "Clear Chat" }))] })] }), renderContent(), error && (_jsx("div", { className: "mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600", children: typeof error === 'string' ? error : 'An error occurred during the request' }))] }), _jsx(CardFooter, { className: "border-t pt-4 text-xs text-gray-500", children: "Your prompt and the response are not stored anywhere beyond this session." })] }));
};
export default ChatTester;
