import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
export default function KpiCard({ title, value, change }) {
    return (_jsxs(Card, { className: "transition-all duration-300 hover:shadow-lg", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium", children: title }), _jsxs(Badge, { variant: change >= 0 ? 'default' : 'destructive', className: "text-xs", children: [change >= 0 ? '+' : '', change, "%"] })] }), _jsx(CardContent, { children: _jsx("div", { className: "text-2xl font-bold", children: value }) })] }));
}
