import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import OpenAIKeyForm from './openai/OpenAIKeyForm';
import RequestyKeyForm from './requesty/RequestyKeyForm';
import { OpenAIChatTester } from './openai/OpenAIChatTester';
import RequestyChatTester from './requesty/RequestyChatTester';
export default function ProvidersSection() {
    return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "API Providers Configuration" }), _jsx(CardDescription, { children: "Configure your API providers for use across the platform" })] }), _jsxs(CardContent, { children: [_jsxs(Alert, { className: "mb-6", children: [_jsx(InfoIcon, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: "API keys are stored securely in encrypted storage. You can update or remove keys at any time." })] }), _jsxs(Tabs, { defaultValue: "openai", className: "w-full", children: [_jsxs(TabsList, { className: "grid grid-cols-2 w-full max-w-md mb-4", children: [_jsx(TabsTrigger, { value: "openai", children: "OpenAI" }), _jsx(TabsTrigger, { value: "requesty", children: "Requesty" })] }), _jsxs(TabsContent, { value: "openai", className: "space-y-6", children: [_jsx(OpenAIKeyForm, {}), _jsx(OpenAIChatTester, {})] }), _jsxs(TabsContent, { value: "requesty", className: "space-y-6", children: [_jsx(RequestyKeyForm, {}), _jsx(RequestyChatTester, {})] })] })] })] }) }));
}
