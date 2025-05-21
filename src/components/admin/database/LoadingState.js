import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
export function LoadingState() {
    return (_jsxs(Card, { className: "text-center", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Loading Data" }), _jsx(CardDescription, { children: "Please wait while we fetch the information" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "flex flex-col items-center justify-center py-8", children: [_jsx(Loader2, { className: "h-12 w-12 animate-spin text-muted-foreground/50 mb-2" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Fetching database records..." })] }) })] }));
}
