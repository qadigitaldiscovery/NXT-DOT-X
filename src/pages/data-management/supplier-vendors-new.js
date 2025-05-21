import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SupplierForm } from '@/components/suppliers/SupplierForm';
import { ArrowLeft } from 'lucide-react';
/**
 * New supplier form page - this component allows creating a new supplier
 * This is a standalone implementation that will be integrated later
 */
const NewSupplierVendor = () => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "container mx-auto py-6 space-y-6", children: [_jsx("div", { className: "flex items-center mb-6", children: _jsxs(Button, { variant: "ghost", className: "mr-2", onClick: () => navigate('/data-management/suppliers'), children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back to Suppliers"] }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Add New Supplier" }), _jsx("p", { className: "text-gray-500", children: "Create a new supplier record in the system" })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Supplier Information" }) }), _jsx(CardContent, { children: _jsx(SupplierForm, {}) })] })] }));
};
export default NewSupplierVendor;
