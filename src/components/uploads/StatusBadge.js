import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, CheckCircle, AlertCircle } from "lucide-react";
export function StatusBadge({ status }) {
    switch (status) {
        case 'pending':
            return (_jsxs(Badge, { variant: "outline", className: "flex items-center gap-1", children: [_jsx(Clock, { className: "h-3.5 w-3.5" }), "Pending"] }));
        case 'processing':
            return (_jsxs(Badge, { variant: "outline", className: "flex items-center gap-1 bg-blue-50", children: [_jsx(Play, { className: "h-3.5 w-3.5" }), "Processing"] }));
        case 'completed':
            return (_jsxs(Badge, { variant: "default", className: "flex items-center gap-1 bg-green-600", children: [_jsx(CheckCircle, { className: "h-3.5 w-3.5" }), "Completed"] }));
        case 'failed':
            return (_jsxs(Badge, { variant: "destructive", className: "flex items-center gap-1", children: [_jsx(AlertCircle, { className: "h-3.5 w-3.5" }), "Failed"] }));
        default:
            return _jsx(Badge, { children: status });
    }
}
