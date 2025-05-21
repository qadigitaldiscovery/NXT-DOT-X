import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ApiEndpointRow from './ApiEndpointRow';
import AddEndpointDialog from './AddEndpointDialog';
import { Plus } from 'lucide-react';
import { sampleEndpoints } from './sampleData';
import { v4 as uuidv4 } from 'uuid';
export function ApiEndpointList() {
    const [endpoints, setEndpoints] = useState(sampleEndpoints);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [currentEndpoint, setCurrentEndpoint] = useState(null);
    const handleAddEndpoint = (values) => {
        const newEndpoint = {
            id: uuidv4(),
            name: values.name,
            url: values.url,
            apiKey: values.apiKey,
            method: values.method,
            status: values.status,
            lastUsed: new Date().toISOString(),
            description: values.description
        };
        setEndpoints([...endpoints, newEndpoint]);
        setIsAddDialogOpen(false);
    };
    const handleEditEndpoint = (endpoint) => {
        setCurrentEndpoint(endpoint);
        setIsEditDialogOpen(true);
    };
    const handleUpdateEndpoint = (values) => {
        if (!currentEndpoint)
            return;
        const updatedEndpoints = endpoints.map((ep) => {
            if (ep.id === currentEndpoint.id) {
                return {
                    ...ep,
                    name: values.name,
                    url: values.url,
                    apiKey: values.apiKey,
                    method: values.method,
                    status: values.status,
                    description: values.description
                };
            }
            return ep;
        });
        setEndpoints(updatedEndpoints);
        setIsEditDialogOpen(false);
        setCurrentEndpoint(null);
    };
    const handleDeleteEndpoint = (id) => {
        setEndpoints(endpoints.filter((endpoint) => endpoint.id !== id));
    };
    const handleToggleStatus = (id) => {
        setEndpoints(endpoints.map((endpoint) => {
            if (endpoint.id === id) {
                const newStatus = endpoint.status === 'active' ? 'inactive' : 'active';
                return { ...endpoint, status: newStatus };
            }
            return endpoint;
        }));
    };
    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
        setCurrentEndpoint(null);
    };
    return (_jsxs(Card, { className: "border shadow-sm", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsx(CardTitle, { className: "text-xl font-semibold", children: "API Endpoints" }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => setIsAddDialogOpen(true), children: [_jsx(Plus, { className: "h-4 w-4 mr-1" }), " Add Endpoint"] })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-2", children: endpoints.length === 0 ? (_jsx("div", { className: "text-center p-4 text-muted-foreground", children: "No endpoints configured. Click \"Add Endpoint\" to create one." })) : (endpoints.map((endpoint) => (_jsx(ApiEndpointRow, { endpoint: endpoint, onEdit: handleEditEndpoint, onDelete: handleDeleteEndpoint, onToggleStatus: handleToggleStatus }, endpoint.id)))) }) }), _jsx(AddEndpointDialog, { open: isAddDialogOpen, onOpenChange: setIsAddDialogOpen, onSubmit: handleAddEndpoint }), _jsx(AddEndpointDialog, { open: isEditDialogOpen, onOpenChange: setIsEditDialogOpen, onSubmit: handleUpdateEndpoint, endpoint: currentEndpoint, onClose: handleCloseEditDialog })] }));
}
export default ApiEndpointList;
