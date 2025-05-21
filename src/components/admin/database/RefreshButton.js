import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
export function RefreshButton({ onRefresh, isLoading = false, isRefreshing = false }) {
    // Use either isLoading or isRefreshing (for backward compatibility)
    const loading = isLoading || isRefreshing;
    return (_jsxs("a", { href: "#", onClick: (e) => {
            e.preventDefault();
            if (!loading) {
                onRefresh();
            }
        }, className: cn("inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline", loading ? "opacity-50 pointer-events-none" : ""), "aria-label": "Refresh data", children: [_jsx(RefreshCw, { className: `h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`, "aria-hidden": "true" }), "Refresh"] }));
}
