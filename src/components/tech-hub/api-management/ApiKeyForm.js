import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Trash, Plus, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
const sampleApiKeys = [
    {
        id: '1',
        name: 'Production API Key',
        key: 'sk_prod_2023_ZXhhbXBsZWFwaWtleXZhbHVl',
        created: '2025-01-15T08:30:00',
        expires: '2026-01-15T08:30:00',
        scope: 'full_access'
    },
    {
        id: '2',
        name: 'Development API Key',
        key: 'sk_dev_2023_YW5vdGhlcmV4YW1wbGVrZXl2YWx1ZQ',
        created: '2025-03-22T14:45:00',
        expires: '2025-09-22T14:45:00',
        scope: 'read_only'
    },
    {
        id: '3',
        name: 'Analytics Integration',
        key: 'sk_analytics_2023_dGhpcmRleGFtcGxla2V5dmFsdWU',
        created: '2025-04-10T11:20:00',
        expires: '2026-04-10T11:20:00',
        scope: 'analytics'
    }
];
const ApiKeyForm = () => {
    const [apiKeys, setApiKeys] = useState(sampleApiKeys);
    const [newKeyName, setNewKeyName] = useState('');
    const [newKeyScope, setNewKeyScope] = useState('read_only');
    const [visibleKeys, setVisibleKeys] = useState({});
    const toggleKeyVisibility = (id) => {
        setVisibleKeys(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };
    const handleCopyKey = (key) => {
        navigator.clipboard.writeText(key);
        toast.success("API key copied to clipboard");
    };
    const handleDeleteKey = (id) => {
        setApiKeys(apiKeys.filter(key => key.id !== id));
        toast.success("API key deleted successfully");
    };
    const handleCreateKey = () => {
        if (!newKeyName.trim()) {
            toast.error("Please enter a name for the API key");
            return;
        }
        // Generate a mock key - in a real app, this would come from the backend
        const mockKey = `sk_${newKeyScope.substring(0, 4)}_${Math.floor(Date.now() / 1000)}_${btoa(Math.random().toString()).substring(0, 20)}`;
        const newKey = {
            id: `${apiKeys.length + 1}`,
            name: newKeyName,
            key: mockKey,
            created: new Date().toISOString(),
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
            scope: newKeyScope
        };
        setApiKeys([...apiKeys, newKey]);
        setNewKeyName('');
        setNewKeyScope('read_only');
        // Show the new key
        setVisibleKeys(prev => ({
            ...prev,
            [newKey.id]: true
        }));
        toast.success("New API key created successfully");
    };
    const getScopeBadgeClass = (scope) => {
        switch (scope) {
            case 'full_access':
                return 'bg-red-100 text-red-800 border-red-300';
            case 'read_only':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'analytics':
                return 'bg-green-100 text-green-800 border-green-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "API Keys" }), _jsx(CardDescription, { children: "Manage API keys for external access to your system" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "rounded-md border p-4 bg-muted/20", children: [_jsx("h3", { className: "text-md font-medium mb-4", children: "Create New API Key" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "key-name", children: "Key Name" }), _jsx(Input, { id: "key-name", placeholder: "e.g., Production API Key", value: newKeyName, onChange: (e) => setNewKeyName(e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "key-scope", children: "Access Scope" }), _jsxs(Select, { value: newKeyScope, onValueChange: setNewKeyScope, children: [_jsx(SelectTrigger, { id: "key-scope", children: _jsx(SelectValue, { placeholder: "Select scope" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "full_access", children: "Full Access" }), _jsx(SelectItem, { value: "read_only", children: "Read Only" }), _jsx(SelectItem, { value: "analytics", children: "Analytics Only" })] })] })] }), _jsx("div", { className: "flex items-end", children: _jsxs(Button, { onClick: handleCreateKey, className: "w-full", children: [_jsx(Plus, { className: "h-4 w-4 mr-1" }), " Generate Key"] }) })] })] }), _jsx("div", { className: "rounded-md border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "API Key" }), _jsx(TableHead, { children: "Scope" }), _jsx(TableHead, { children: "Created" }), _jsx(TableHead, { children: "Expires" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: apiKeys.map((apiKey) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: apiKey.name }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("code", { className: "bg-muted rounded px-2 py-1 text-xs font-mono", children: visibleKeys[apiKey.id]
                                                                ? apiKey.key
                                                                : `${apiKey.key.substring(0, 8)}...${apiKey.key.substring(apiKey.key.length - 4)}` }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => toggleKeyVisibility(apiKey.id), title: visibleKeys[apiKey.id] ? "Hide key" : "Show key", children: visibleKeys[apiKey.id] ? _jsx(EyeOff, { className: "h-3 w-3" }) : _jsx(Eye, { className: "h-3 w-3" }) })] }) }), _jsx(TableCell, { children: _jsx("span", { className: `text-xs px-2 py-1 rounded-full border ${getScopeBadgeClass(apiKey.scope)}`, children: apiKey.scope.replace('_', ' ') }) }), _jsx(TableCell, { children: new Date(apiKey.created).toLocaleDateString() }), _jsx(TableCell, { children: new Date(apiKey.expires).toLocaleDateString() }), _jsxs(TableCell, { className: "text-right space-x-1", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleCopyKey(apiKey.key), title: "Copy API key", children: _jsx(Copy, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleDeleteKey(apiKey.id), title: "Delete API key", className: "text-red-500 hover:text-red-700 hover:bg-red-50", children: _jsx(Trash, { className: "h-4 w-4" }) })] })] }, apiKey.id))) })] }) })] })] }));
};
export default ApiKeyForm;
