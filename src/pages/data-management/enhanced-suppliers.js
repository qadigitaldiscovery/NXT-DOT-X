import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Activity, FileText, Users, AlertTriangle, DollarSign, BarChart2, Mail, Calendar, Link, Phone, MapPin } from 'lucide-react';
import { useEnhancedSupplier } from '../../hooks/useEnhancedSupplier';
import { toast } from 'sonner';
const EnhancedSuppliersPage = () => {
    const navigate = useNavigate();
    const { supplier, loading, error } = useEnhancedSupplier();
    const [activeTab, setActiveTab] = useState('data');
    const tabs = [
        { id: 'data', label: 'Data', icon: _jsx(Activity, { className: "h-4 w-4" }) },
        { id: 'marketiq', label: 'Market IQ', icon: _jsx(BarChart2, { className: "h-4 w-4" }) },
        { id: 'contracts', label: 'Contracts', icon: _jsx(FileText, { className: "h-4 w-4" }) },
        { id: 'events', label: 'Events', icon: _jsx(Calendar, { className: "h-4 w-4" }) },
        { id: 'messages', label: 'Messages', icon: _jsx(Mail, { className: "h-4 w-4" }) },
        { id: 'files', label: 'Files', icon: _jsx(FileText, { className: "h-4 w-4" }) },
        { id: 'users', label: 'Users', icon: _jsx(Users, { className: "h-4 w-4" }) },
        { id: 'risk', label: 'Risk', icon: _jsx(AlertTriangle, { className: "h-4 w-4" }) },
        { id: 'spend', label: 'Spend', icon: _jsx(DollarSign, { className: "h-4 w-4" }) }
    ];
    const handleAddNew = () => {
        navigate('/data-management/suppliers/new');
        toast({
            title: "Add New Partner",
            description: "Redirecting to partner creation form...",
        });
    };
    const getStatusBadge = (status) => {
        const statusClasses = {
            active: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            inactive: 'bg-red-100 text-red-800'
        };
        return (_jsx("span", { className: `${statusClasses[status]} px-3 py-1 rounded-full text-sm font-medium`, children: status.charAt(0).toUpperCase() + status.slice(1) }));
    };
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Loading Partner Data..." }), _jsx("p", { className: "text-muted-foreground", children: "Please wait while we fetch the information" })] }) }));
    }
    if (error) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-xl font-semibold mb-2 text-destructive", children: "Error Loading Data" }), _jsx("p", { className: "text-muted-foreground", children: error.message }), _jsx(Button, { onClick: () => window.location.reload(), className: "mt-4", children: "Try Again" })] }) }));
    }
    return (_jsxs("div", { className: "container mx-auto p-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Partner Management" }), _jsx("p", { className: "text-muted-foreground", children: "Comprehensive partner management with enhanced features" })] }), _jsx(Button, { onClick: handleAddNew, children: "Add New Partner" })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: supplier?.businessName }), _jsx(CardDescription, { children: "View and manage partner information" })] }), supplier?.status && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-sm font-medium", children: "Status:" }), getStatusBadge(supplier.status)] }))] }) }), _jsxs(CardContent, { children: [supplier && (_jsxs("div", { className: "grid gap-4 mb-6", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Mail, { className: "h-4 w-4 text-muted-foreground" }), _jsx("a", { href: `mailto:${supplier.contactEmail}`, className: "hover:underline", children: supplier.contactEmail })] }), supplier.contactPhone && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Phone, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: supplier.contactPhone })] })), supplier.address && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: supplier.address })] })), supplier.website && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Link, { className: "h-4 w-4 text-muted-foreground" }), _jsx("a", { href: supplier.website, target: "_blank", rel: "noopener noreferrer", className: "hover:underline", children: supplier.website })] }))] })), _jsxs(Tabs, { defaultValue: activeTab, onValueChange: setActiveTab, children: [_jsx(TabsList, { className: "grid grid-cols-3 lg:grid-cols-9 gap-4", children: tabs.map((tab) => (_jsxs(TabsTrigger, { value: tab.id, className: "flex items-center gap-2", children: [tab.icon, _jsx("span", { className: "hidden lg:inline", children: tab.label })] }, tab.id))) }), tabs.map((tab) => (_jsx(TabsContent, { value: tab.id, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: tab.label }) }), _jsx(CardContent, { children: _jsx("div", { className: "h-[400px] flex items-center justify-center text-muted-foreground", children: supplier ? (_jsx("pre", { className: "text-sm overflow-auto p-4", children: JSON.stringify(supplier[tab.id === 'data' ? 'description' : tab.id], null, 2) })) : (`${tab.label} content will be displayed here`) }) })] }) }, tab.id)))] })] })] })] }));
};
export default EnhancedSuppliersPage;
