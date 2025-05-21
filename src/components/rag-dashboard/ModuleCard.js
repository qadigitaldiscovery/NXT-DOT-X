import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import StatusGauge from './StatusGauge';
const ModuleCard = ({ module, alertCount, onViewDetails }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'green': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
            case 'orange': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
            case 'red': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
        }
    };
    const getStatusText = (status) => {
        switch (status) {
            case 'green': return 'Operational';
            case 'orange': return 'Degraded';
            case 'red': return 'Outage';
            default: return 'Unknown';
        }
    };
    return (_jsxs(Card, { className: "border rounded-lg shadow-sm bg-white", children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsx(CardTitle, { className: "text-xl font-bold", children: module.name }), _jsx(Badge, { className: getStatusColor(module.status), children: getStatusText(module.status) })] }), module.description && (_jsx(CardDescription, { className: "mt-1", children: module.description }))] }), _jsx(CardContent, { className: "pb-0", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(StatusGauge, { status: module.status, size: "md" }), alertCount > 0 && (_jsxs("div", { className: "flex items-center text-amber-700 bg-amber-50 px-3 py-1 rounded-full", children: [_jsx(AlertTriangle, { className: "mr-1 h-4 w-4" }), _jsxs("span", { className: "text-sm font-medium", children: [alertCount, " alert", alertCount !== 1 ? 's' : ''] })] }))] }) }), _jsx(CardFooter, { className: "pt-4", children: _jsxs("a", { href: "#", onClick: (e) => {
                        e.preventDefault();
                        onViewDetails(module);
                    }, className: "text-blue-600 hover:text-blue-800 hover:underline flex items-center", children: ["View Details", _jsx(ChevronRight, { className: "h-4 w-4 ml-1" })] }) })] }));
};
export default ModuleCard;
