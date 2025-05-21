import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
export const CostMetricCard = ({ title, icon, value, change, className }) => {
    return (_jsxs(Card, { className: `backdrop-blur-md bg-white/30 border border-white/10 ${className}`, children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: title }), icon] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold", children: value }), change && (_jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1 mt-1", children: [change.isPositive ? (_jsx(ArrowUpRight, { className: `h-3 w-3 ${change.isPositive ? "text-destructive" : "text-green-600"}` })) : (_jsx(ArrowDownRight, { className: `h-3 w-3 ${!change.isPositive ? "text-destructive" : "text-green-600"}` })), _jsxs("span", { className: change.isPositive ? "text-destructive" : "text-green-600", children: [change.value, "%"] }), " ", change.text] }))] })] }));
};
