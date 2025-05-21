import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Users } from 'lucide-react';
import { format } from 'date-fns';
const CustomerImpactsList = ({ impacts, loading }) => {
    if (loading) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Customer Impacts" }) }), _jsx(CardContent, { children: _jsx("div", { className: "flex justify-center py-8", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) })] }));
    }
    const getImpactColor = (level) => {
        switch (level) {
            case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
            case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
            case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
            case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(AlertTriangle, { className: "h-5 w-5 mr-2 text-amber-500" }), "Customer Impacts"] }) }), _jsx(CardContent, { children: impacts.length === 0 ? (_jsx("div", { className: "text-center py-6 text-muted-foreground", children: "No customer impacts reported." })) : (_jsx("div", { className: "space-y-4", children: impacts.map((impact) => (_jsxs("div", { className: "p-4 border rounded-md", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Badge, { className: getImpactColor(impact.impact_level), children: [impact.impact_level.charAt(0).toUpperCase() + impact.impact_level.slice(1), " Impact"] }), _jsxs("div", { className: "flex items-center text-sm text-muted-foreground", children: [_jsx(Users, { className: "h-3 w-3 mr-1" }), impact.affected_customers, " affected customers"] })] }), _jsx("div", { className: "text-xs text-muted-foreground", children: format(new Date(impact.created_at), 'MMM dd, yyyy HH:mm') })] }), _jsx("p", { className: "text-sm", children: impact.description }), impact.resolved_at && (_jsxs("div", { className: "mt-2 text-xs text-green-600 dark:text-green-400", children: ["\u2713 Resolved on ", format(new Date(impact.resolved_at), 'MMM dd, yyyy HH:mm')] }))] }, impact.id))) })) })] }));
};
export default CustomerImpactsList;
