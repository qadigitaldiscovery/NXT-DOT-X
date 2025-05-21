import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Edit, Trash2, XCircle, MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
export default function ApiEndpointRow({ endpoint, onEdit, onDelete, onToggleStatus, }) {
    const [showApiKey, setShowApiKey] = useState(false);
    // Format time since last used
    const lastUsedText = endpoint.lastUsed
        ? formatDistanceToNow(parseISO(endpoint.lastUsed), { addSuffix: true })
        : 'Never';
    const maskedApiKey = endpoint.apiKey.substring(0, 3) + '•'.repeat(endpoint.apiKey.length - 6) + endpoint.apiKey.substring(endpoint.apiKey.length - 3);
    return (_jsxs("div", { className: "flex items-center justify-between p-3 border rounded-md bg-background hover:bg-muted/50 transition-colors", children: [_jsxs("div", { className: "flex flex-col space-y-1 flex-grow", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "font-medium", children: endpoint.name }), _jsx(Badge, { variant: endpoint.status === 'active' ? 'default' : 'secondary', className: cn("text-xs", endpoint.status === 'active' ? "bg-green-500 hover:bg-green-600" : ""), children: endpoint.status === 'active' ? 'Active' : 'Inactive' }), _jsx(Badge, { variant: "outline", className: "text-xs", children: endpoint.method })] }), _jsx("div", { className: "text-xs text-muted-foreground truncate max-w-xs", children: endpoint.url }), _jsxs("div", { className: "text-xs text-muted-foreground flex items-center", children: [_jsxs("span", { className: "mr-2", children: ["Key: ", showApiKey ? endpoint.apiKey : maskedApiKey] }), _jsx(Button, { variant: "ghost", size: "sm", className: "h-4 p-0 text-xs", onClick: () => setShowApiKey(!showApiKey), children: showApiKey ? 'Hide' : 'Show' }), _jsxs("span", { className: "ml-4", children: ["Last used: ", lastUsedText] })] })] }), _jsx("div", { className: "flex items-center space-x-1", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "sm", className: "h-8 w-8 p-0", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsxs(DropdownMenuItem, { onClick: () => onEdit(endpoint), children: [_jsx(Edit, { className: "mr-2 h-4 w-4" }), " Edit"] }), _jsx(DropdownMenuItem, { onClick: () => onToggleStatus(endpoint.id), children: endpoint.status === 'active' ? (_jsxs(_Fragment, { children: [_jsx(XCircle, { className: "mr-2 h-4 w-4" }), " Deactivate"] })) : (_jsxs(_Fragment, { children: [_jsx(CheckCircle, { className: "mr-2 h-4 w-4" }), " Activate"] })) }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { onClick: () => onDelete(endpoint.id), className: "text-destructive", children: [_jsx(Trash2, { className: "mr-2 h-4 w-4" }), " Delete"] })] })] }) })] }));
}
