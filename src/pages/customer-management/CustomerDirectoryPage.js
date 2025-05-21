import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CustomersTable } from '@/components/customers/CustomersTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const CustomerDirectoryPage = () => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Customer Directory" }), _jsx("p", { className: "text-muted-foreground", children: "Manage your customer relationships and data." })] }), _jsxs(Button, { className: "flex items-center gap-2", onClick: () => navigate('/customer-management/new'), children: [_jsx(Plus, { className: "h-4 w-4" }), " Add Customer"] })] }), _jsx(CustomersTable, {})] }));
};
export default CustomerDirectoryPage;
