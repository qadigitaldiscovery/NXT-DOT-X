import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
// Mock customer data
const mockCustomers = [
    {
        id: "1",
        code: "ACME001",
        name: "Acme Corporation",
        contact_name: "John Doe",
        email: "john@acme.com",
        phone: "555-1234",
        website: "acme.com",
        status: "active",
        account_type: "enterprise"
    },
    {
        id: "2",
        code: "GLOBEX002",
        name: "Globex Industries",
        contact_name: "Jane Smith",
        email: "jane@globex.com",
        phone: "555-5678",
        website: "globex.com",
        status: "active",
        account_type: "premium"
    },
    {
        id: "3",
        code: "INITECH003",
        name: "Initech LLC",
        contact_name: "Mike Johnson",
        email: "mike@initech.com",
        phone: "555-9012",
        website: "initech.com",
        status: "inactive",
        account_type: "standard"
    }
];
export default function EditCustomerPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(true);
    const [customer, setCustomer] = React.useState(null);
    const [error, setError] = React.useState(null);
    React.useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const foundCustomer = mockCustomers.find(c => c.id === id);
            if (foundCustomer) {
                setCustomer(foundCustomer);
            }
            else {
                setError('Customer not found');
            }
            setIsLoading(false);
        }, 500);
    }, [id]);
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete customer "${customer?.name}"?`)) {
            console.log(`Deleting customer ${id}`);
            navigate('/customer-management/directory');
        }
    };
    if (isLoading) {
        return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Edit Customer" }), _jsx("p", { className: "text-muted-foreground", children: "Loading customer details..." })] }), _jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "space-y-4", children: [_jsx(Skeleton, { className: "h-10 w-full" }), _jsx(Skeleton, { className: "h-10 w-full" }), _jsx(Skeleton, { className: "h-10 w-full" }), _jsx(Skeleton, { className: "h-10 w-full" })] }) }) })] }));
    }
    if (error || !customer) {
        return (_jsx("div", { className: "space-y-6", children: _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Edit Customer" }), _jsx("p", { className: "text-muted-foreground text-red-500", children: "Error loading customer details. The customer may not exist." })] }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Edit Customer" }), _jsxs("p", { className: "text-muted-foreground", children: ["Update customer information for ", customer.name] })] }), _jsx(CustomerForm, { initialData: customer, isEditing: true, onDelete: handleDelete })] }));
}
