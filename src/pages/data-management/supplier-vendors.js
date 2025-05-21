import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SuppliersTable } from '@/components/suppliers/SuppliersTable';
import { useSuppliers } from '@/hooks/use-suppliers';
/**
 * Supplier vendors page - this component allows viewing and managing suppliers
 * This is a standalone implementation that will be integrated later
 */
const SupplierVendors = () => {
    const navigate = useNavigate();
    const { data: suppliers = [], isLoading } = useSuppliers();
    return (_jsxs("div", { className: "container mx-auto py-6 space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Suppliers" }), _jsx("p", { className: "text-gray-500", children: "Manage your suppliers and vendors" })] }), _jsx(Button, { onClick: () => navigate('/data-management/suppliers/new'), children: "Add New Supplier" })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Suppliers Directory" }) }), _jsx(CardContent, { children: isLoading ? (_jsx("div", { className: "flex justify-center p-8", children: _jsx("p", { children: "Loading suppliers..." }) })) : (_jsx(SuppliersTable, {})) })] })] }));
};
export default SupplierVendors;
