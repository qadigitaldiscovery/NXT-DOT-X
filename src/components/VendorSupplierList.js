import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, } from './ui/table';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { usePartners } from '../hooks/usePartners';
import { Badge } from './ui/badge';
import { Star, AlertCircle, CheckCircle } from 'lucide-react';
export const VendorSupplierList = () => {
    const navigate = useNavigate();
    const { partners, loading, error } = usePartners();
    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
            pending: { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
            inactive: { color: 'bg-red-100 text-red-800', icon: AlertCircle }
        };
        const config = statusConfig[status];
        const Icon = config?.icon;
        return (_jsxs(Badge, { variant: "outline", className: `${config?.color} flex items-center gap-1`, children: [Icon && _jsx(Icon, { className: "h-3 w-3" }), _jsx("span", { children: status.charAt(0).toUpperCase() + status.slice(1) })] }));
    };
    const getPartnerTypeIcon = (type) => {
        return type === 'vendor' ? (_jsx(Star, { className: "h-4 w-4 text-blue-500" })) : (_jsx(Star, { className: "h-4 w-4 text-green-500" }));
    };
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-48", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" }) }));
    }
    if (error) {
        return (_jsxs("div", { className: "text-red-500 p-4", children: ["Error loading partners: ", error.message] }));
    }
    return (_jsx("div", { className: "space-y-4", children: _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { children: "Partners Directory" }), _jsx(Button, { onClick: () => navigate('/partner/new'), children: "Add New Partner" })] }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Type" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Contact" }), _jsx(TableHead, { children: "Details" }), _jsx(TableHead, { children: "Actions" })] }) }), _jsx(TableBody, { children: partners.map((partner) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: partner.name }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-1", children: [getPartnerTypeIcon(partner.type), _jsx("span", { className: "capitalize", children: partner.type })] }) }), _jsx(TableCell, { children: getStatusBadge(partner.status) }), _jsx(TableCell, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("a", { href: `mailto:${partner.contactEmail}`, className: "text-sm hover:underline", children: partner.contactEmail }), _jsx("span", { className: "text-sm text-muted-foreground", children: partner.contactPhone })] }) }), _jsxs(TableCell, { children: [partner.type === 'vendor' && (_jsxs("div", { className: "text-sm", children: ["Credit Score: ", partner.creditScore || 'N/A'] })), partner.type === 'supplier' && (_jsxs("div", { className: "text-sm", children: ["Files: ", partner.uploadedFiles?.length || 0] }))] }), _jsx(TableCell, { children: _jsx(Button, { variant: "outline", size: "sm", onClick: () => navigate(`/partner/${partner.id}`), children: "View Details" }) })] }, partner.id))) })] }) })] }) }));
};
