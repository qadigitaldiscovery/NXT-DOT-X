import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Users } from 'lucide-react';
export const CustomerDirectory = () => {
    const navigate = useNavigate();
    return (_jsxs("div", { className: "container mx-auto p-6 max-w-6xl", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-bold text-white flex items-center", children: [_jsx(Users, { className: "mr-2 h-6 w-6", "aria-hidden": "true" }), " Customer Directory"] }), _jsx("p", { className: "text-gray-400 mt-1", children: "View and manage customer accounts" })] }), _jsxs("a", { href: "/customer-management/new", onClick: (e) => {
                            e.preventDefault();
                            navigate('/customer-management/new');
                        }, className: "inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline", "aria-label": "Add new customer", children: [_jsx(PlusCircle, { className: "h-4 w-4 mr-2", "aria-hidden": "true" }), "Add Customer"] })] }), _jsxs("div", { className: "bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center", children: [_jsx("h3", { className: "text-xl font-medium text-gray-200 mb-2", children: "Customer Database" }), _jsx("p", { className: "text-gray-400 mb-6", children: "This module is being developed. Customer directory will be available soon." }), _jsx("div", { className: "flex justify-center gap-4", children: _jsx("a", { href: "/master", onClick: (e) => {
                                e.preventDefault();
                                navigate('/master');
                            }, className: "inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline", "aria-label": "Return to dashboard", children: "Return to Dashboard" }) })] })] }));
};
