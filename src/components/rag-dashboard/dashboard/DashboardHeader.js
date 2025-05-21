import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RefreshCw, Settings } from 'lucide-react';
import { useDashboard } from '../providers/DashboardProvider';
import { cn } from '@/lib/utils';
export const DashboardHeader = ({ onBatchOperationsOpen }) => {
    const { refreshData: handleRefresh, loading: isRefreshing } = useDashboard();
    return (_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h1", { className: "text-2xl font-bold", children: "System Status Dashboard" }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("a", { href: "#", onClick: (e) => {
                            e.preventDefault();
                            if (!isRefreshing)
                                handleRefresh();
                        }, className: cn("inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline", isRefreshing && "opacity-50 pointer-events-none"), "aria-label": "Refresh dashboard data", children: [_jsx(RefreshCw, { className: `mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`, "aria-hidden": "true" }), "Refresh"] }), _jsxs("a", { href: "#", onClick: (e) => {
                            e.preventDefault();
                            onBatchOperationsOpen();
                        }, className: "inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline", "aria-label": "Open batch operations", children: [_jsx(Settings, { className: "mr-2 h-4 w-4", "aria-hidden": "true" }), "Batch Operations"] })] })] }));
};
// Keep the default export for backward compatibility
export default DashboardHeader;
