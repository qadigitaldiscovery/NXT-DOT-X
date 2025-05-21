import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import StatusGauge from './StatusGauge';
export default function StatusTimeline({ logs, loading = false }) {
    if (loading) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(CardTitle, { className: "text-lg", children: "Status History" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "Loading status history..." }) })] }));
    }
    if (logs.length === 0) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(CardTitle, { className: "text-lg", children: "Status History" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "No status changes recorded." }) })] }));
    }
    return (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(CardTitle, { className: "text-lg", children: "Status History" }) }), _jsx(CardContent, { children: _jsx("div", { className: "relative pl-6 border-l-2 border-muted", children: logs.map((log) => (_jsxs("div", { className: "mb-4 last:mb-0 relative", children: [_jsx("div", { className: "absolute -left-[21px] mt-1.5", children: _jsx(StatusGauge, { status: log.status, size: "sm", animate: false }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-muted-foreground", children: format(new Date(log.recorded_at), 'MMM d, yyyy h:mm a') }), _jsx("p", { className: "font-medium mt-0.5", children: log.note || `Status changed to ${log.status}` })] })] }, log.id))) }) })] }));
}
