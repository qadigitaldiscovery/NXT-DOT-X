import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useSuppliers } from "../../hooks/use-suppliers";
import { formatDate } from "../../lib/utils";
export const SuppliersTable = () => {
    const navigate = useNavigate();
    const { data: suppliers, isLoading } = useSuppliers();
    if (isLoading) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Suppliers" }) }), _jsx(CardContent, { children: _jsx("div", { className: "flex items-center justify-center p-8", children: "Loading suppliers..." }) })] }));
    }
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Suppliers" }) }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Code" }), _jsx(TableHead, { children: "Credit Rating" }), _jsx(TableHead, { children: "Performance Score" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Last Updated" })] }) }), _jsx(TableBody, { children: suppliers?.map((supplier) => (_jsxs(TableRow, { className: "cursor-pointer hover:bg-gray-50", onClick: () => navigate(`/beta1/suppliers/${supplier.id}`), children: [_jsx(TableCell, { className: "font-medium hover:text-blue-600 hover:underline", children: supplier.name }), _jsx(TableCell, { children: supplier.code }), _jsx(TableCell, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: `font-bold ${supplier.creditRating?.rating === 'A' ? 'text-green-600' :
                                                        supplier.creditRating?.rating === 'B' ? 'text-yellow-600' :
                                                            'text-red-600'}`, children: supplier.creditRating?.rating || 'N/A' }), _jsxs("span", { className: "text-sm text-gray-500", children: ["(", supplier.creditRating?.score || 'N/A', ")"] })] }) }), _jsx(TableCell, { children: _jsx("div", { className: "flex items-center gap-2", children: _jsx("span", { className: `font-bold ${(supplier.performance?.overall || 0) >= 90 ? 'text-green-600' :
                                                    (supplier.performance?.overall || 0) >= 70 ? 'text-yellow-600' :
                                                        'text-red-600'}`, children: supplier.performance?.overall || 'N/A' }) }) }), _jsx(TableCell, { children: _jsx("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${supplier.status === 'active' ? 'bg-green-100 text-green-800' :
                                                'bg-gray-100 text-gray-800'}`, children: supplier.status }) }), _jsx(TableCell, { children: supplier.updated_at ? formatDate(supplier.updated_at) : 'N/A' })] }, supplier.id))) })] }) })] }));
};
