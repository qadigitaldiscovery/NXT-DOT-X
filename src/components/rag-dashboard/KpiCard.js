import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
const KpiCard = ({ title, value, status, className }) => {
    const colorMap = {
        Red: {
            bg: 'bg-red-50 dark:bg-red-900/20',
            border: 'border-red-200 dark:border-red-800',
            text: 'text-red-700 dark:text-red-400',
            icon: _jsx(AlertCircle, { className: "h-5 w-5 text-red-500" })
        },
        Amber: {
            bg: 'bg-amber-50 dark:bg-amber-900/20',
            border: 'border-amber-200 dark:border-amber-800',
            text: 'text-amber-700 dark:text-amber-400',
            icon: _jsx(AlertTriangle, { className: "h-5 w-5 text-amber-500" })
        },
        Green: {
            bg: 'bg-green-50 dark:bg-green-900/20',
            border: 'border-green-200 dark:border-green-800',
            text: 'text-green-700 dark:text-green-400',
            icon: _jsx(CheckCircle, { className: "h-5 w-5 text-green-500" })
        }
    };
    const statusConfig = colorMap[status];
    return (_jsxs(Card, { className: cn('border shadow-sm transition-all', statusConfig.bg, statusConfig.border, className), children: [_jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h3", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: title }), statusConfig.icon] }), _jsx("div", { className: cn('text-2xl font-bold', statusConfig.text), children: value })] }), _jsx(CardFooter, { className: cn('px-4 py-2 border-t', statusConfig.border), children: _jsxs("span", { className: "text-xs uppercase font-medium text-gray-500 dark:text-gray-400", children: ["Status: ", _jsx("span", { className: statusConfig.text, children: status })] }) })] }));
};
export default KpiCard;
