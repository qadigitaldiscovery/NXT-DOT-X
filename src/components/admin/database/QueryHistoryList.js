import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
const QueryHistoryList = ({ queries, onLoadQuery }) => {
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Recent Queries" }), _jsx(CardDescription, { children: "View recently executed SQL queries." })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: queries.map((query) => (_jsx(Card, { className: "shadow-sm", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx(Badge, { variant: "outline", children: query.user }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [query.timestamp, " \u00B7 ", query.duration] })] }), _jsx("div", { className: "bg-muted p-2 rounded-md overflow-x-auto", children: _jsx("pre", { className: "text-sm whitespace-pre-wrap", children: query.query }) }), _jsx("div", { className: "flex justify-end space-x-2", children: _jsx(Button, { variant: "outline", size: "sm", onClick: () => onLoadQuery(query.query), children: "Load Query" }) })] }) }) }, query.id))) }) })] }));
};
export default QueryHistoryList;
