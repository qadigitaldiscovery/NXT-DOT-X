import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database } from 'lucide-react';
export function EmptyState() {
    return (_jsxs(Card, { className: "text-center", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "No Data Available" }), _jsx(CardDescription, { children: "There are no records to display at the moment" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col items-center justify-center py-8", children: [_jsx(Database, { className: "h-12 w-12 text-muted-foreground/50 mb-2" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "The database is empty" })] }) })] }));
}
