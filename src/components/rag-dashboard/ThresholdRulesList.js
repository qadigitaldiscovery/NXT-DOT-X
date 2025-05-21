import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import StatusGauge from './StatusGauge';
export default function ThresholdRulesList({ rules, onDeleteRule, loading = false }) {
    if (loading) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(CardTitle, { className: "text-lg", children: "Threshold Rules" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "Loading threshold rules..." }) })] }));
    }
    if (rules.length === 0) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(CardTitle, { className: "text-lg", children: "Threshold Rules" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-muted-foreground", children: "No threshold rules defined." }) })] }));
    }
    return (_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-3", children: _jsx(CardTitle, { className: "text-lg", children: "Threshold Rules" }) }), _jsx(CardContent, { children: _jsx("ul", { className: "space-y-4", children: rules.map((rule) => (_jsxs("li", { className: "flex items-center justify-between gap-2 border-b pb-3 last:border-0", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "font-medium", children: rule.metric }), _jsx(StatusGauge, { status: rule.resulting_status, size: "sm", animate: false })] }), _jsxs("p", { className: "text-sm", children: [rule.condition, " ", rule.threshold, rule.duration_seconds && (_jsxs("span", { className: "text-muted-foreground", children: [" for ", rule.duration_seconds, "s"] }))] })] }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => onDeleteRule(rule.id), children: _jsx(Trash2, { className: "h-4 w-4 text-muted-foreground hover:text-destructive" }) })] }, rule.id))) }) })] }));
}
