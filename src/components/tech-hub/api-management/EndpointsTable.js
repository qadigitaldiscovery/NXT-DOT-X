import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ApiEndpointRow from './ApiEndpointRow';
const EndpointsTable = ({ endpoints, onEdit, onDelete, onToggleStatus }) => {
    return (_jsx("div", { className: "rounded-md border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "URL" }), _jsx(TableHead, { children: "Method" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Last Used" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: endpoints.length > 0 ? (endpoints.map((endpoint) => (_jsx(ApiEndpointRow, { endpoint: endpoint, onEdit: onEdit, onDelete: onDelete, onToggleStatus: onToggleStatus }, endpoint.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, className: "text-center py-4 text-muted-foreground", children: "No endpoints found matching your search." }) })) })] }) }));
};
export default EndpointsTable;
