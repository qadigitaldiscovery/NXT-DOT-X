import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CustomerForm } from '@/components/customers/CustomerForm';
export default function NewCustomerPage() {
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "New Customer" }), _jsx("p", { className: "text-muted-foreground", children: "Add a new customer to the system" })] }), _jsx(CustomerForm, {})] }));
}
