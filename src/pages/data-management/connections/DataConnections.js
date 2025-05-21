import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Database, Cloud, Server, Check, AlertCircle } from 'lucide-react';
const DataConnections = () => {
    const connections = [
        {
            id: 1,
            name: 'SQL Database',
            description: 'Primary SQL data warehouse connection',
            type: 'database',
            status: 'connected',
            lastSync: '2 hours ago'
        },
        {
            id: 2,
            name: 'Cloud Storage',
            description: 'AWS S3 storage bucket for document storage',
            type: 'cloud',
            status: 'connected',
            lastSync: '4 hours ago'
        },
        {
            id: 3,
            name: 'API Integration',
            description: 'External vendor API connection',
            type: 'api',
            status: 'error',
            lastSync: '1 day ago'
        },
        {
            id: 4,
            name: 'Data Lake',
            description: 'Big data storage for analytics',
            type: 'database',
            status: 'connected',
            lastSync: '30 minutes ago'
        }
    ];
    const getConnectionIcon = (type) => {
        switch (type) {
            case 'database':
                return _jsx(Database, { className: "h-8 w-8 text-blue-500" });
            case 'cloud':
                return _jsx(Cloud, { className: "h-8 w-8 text-purple-500" });
            case 'api':
                return _jsx(Server, { className: "h-8 w-8 text-green-500" });
            default:
                return _jsx(Database, { className: "h-8 w-8 text-blue-500" });
        }
    };
    const getStatusBadge = (status) => {
        return status === 'connected'
            ? _jsxs(Badge, { className: "bg-green-100 text-green-800 hover:bg-green-100", children: [_jsx(Check, { className: "h-3 w-3 mr-1" }), " Connected"] })
            : _jsxs(Badge, { className: "bg-red-100 text-red-800 hover:bg-red-100", children: [_jsx(AlertCircle, { className: "h-3 w-3 mr-1" }), " Error"] });
    };
    return (_jsxs("div", { className: "container mx-auto py-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Data Connections" }), _jsx("p", { className: "text-gray-600", children: "Manage your data source connections" })] }), _jsx(Button, { children: "Add New Connection" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: connections.map(connection => (_jsxs(Card, { className: "relative", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsxs("div", { className: "flex justify-between items-start", children: [getConnectionIcon(connection.type), _jsx("div", { className: "absolute top-3 right-3", children: getStatusBadge(connection.status) })] }), _jsx(CardTitle, { className: "mt-2", children: connection.name }), _jsx(CardDescription, { children: connection.description })] }), _jsx(CardContent, { children: _jsxs("p", { className: "text-sm text-gray-500", children: ["Last synchronized: ", connection.lastSync] }) }), _jsxs(CardFooter, { className: "flex justify-between border-t pt-4", children: [_jsx(Button, { variant: "outline", size: "sm", children: "Configure" }), _jsx(Button, { variant: "outline", size: "sm", children: "Test Connection" })] })] }, connection.id))) })] }));
};
export default DataConnections;
