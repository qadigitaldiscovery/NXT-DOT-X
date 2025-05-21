import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
export default function AlertsList({ alerts, onResolve, loading = false }) {
    if (loading) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(CardTitle, { className: "text-lg", children: "Alerts" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "Loading alerts..." }) })] }));
    }
    if (alerts.length === 0) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(CardTitle, { className: "text-lg", children: "Alerts" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "No alerts at this time." }) })] }));
    }
    const getSeverityVariant = (severity) => {
        switch (severity) {
            case 'info':
                return 'secondary';
            case 'warning':
                return 'default';
            case 'destructive':
                return 'destructive';
            default:
                return 'outline';
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(CardTitle, { className: "text-lg", children: "Alerts" }) }), _jsx(CardContent, { children: _jsx("ul", { className: "space-y-4", children: alerts.map((alert) => (_jsxs("li", { className: "flex items-start justify-between gap-2 border-b pb-3 last:border-0", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Badge, { variant: getSeverityVariant(alert.severity), children: alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1) }), _jsx("span", { className: "text-sm text-muted-foreground", children: formatDistanceToNow(new Date(alert.triggered_at), { addSuffix: true }) })] }), _jsx("p", { className: "font-medium", children: alert.title })] }), !alert.resolved && (_jsxs(Button, { size: "sm", variant: "outline", onClick: () => onResolve(alert.id), className: "mt-1", children: [_jsx(CheckCircle, { className: "h-4 w-4 mr-1" }), "Resolve"] })), alert.resolved && (_jsx(Badge, { variant: "outline", className: "mt-1", children: "Resolved" }))] }, alert.id))) }) })] }));
}
