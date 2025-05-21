import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";
export function ErrorBadge({ errorRows, status }) {
    if (errorRows > 0) {
        return (_jsxs(Badge, { variant: "outline", className: "bg-red-50 text-red-800", children: [errorRows, " errors"] }));
    }
    if (status === 'completed') {
        return (_jsx(Badge, { variant: "outline", className: "bg-green-50 text-green-800", children: "No errors" }));
    }
    return _jsx(_Fragment, { children: "\u2014" });
}
