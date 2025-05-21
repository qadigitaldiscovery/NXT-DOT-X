import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
const StatisticCard = ({ value, label, trend, trendValue, valueColor = 'default', icon, className }) => {
    const getColorClass = () => {
        switch (valueColor) {
            case 'success':
                return 'text-emerald-500';
            case 'warning':
                return 'text-amber-500';
            case 'danger':
                return 'text-red-500';
            default:
                return 'text-gray-900 dark:text-gray-100';
        }
    };
    const getTrendIcon = () => {
        if (trend === 'up')
            return _jsx("span", { className: "text-emerald-500", children: "\u2191" });
        if (trend === 'down')
            return _jsx("span", { className: "text-red-500", children: "\u2193" });
        return _jsx("span", { className: "text-gray-500", children: "\u2192" }); // Used for both 'neutral' and 'stable'
    };
    return (_jsxs("div", { className: cn("rounded-lg bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700 shadow-sm", className), children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("p", { className: "text-xs font-medium text-gray-500 dark:text-gray-400", children: label }), icon && _jsx("div", { className: "text-gray-400 dark:text-gray-500", children: icon })] }), _jsxs("div", { className: "flex items-end gap-2", children: [_jsx("div", { className: cn("text-3xl font-bold", getColorClass()), children: value }), trendValue && (_jsxs("div", { className: "text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1 mb-1", children: [getTrendIcon(), _jsx("span", { children: trendValue })] }))] })] }));
};
export default StatisticCard;
