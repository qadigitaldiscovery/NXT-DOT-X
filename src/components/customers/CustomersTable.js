import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
const mockCustomers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', totalSpend: 1250.50, lastPurchase: '2023-05-15', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543', totalSpend: 850.75, lastPurchase: '2023-04-22', status: 'active' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', phone: '(555) 456-7890', totalSpend: 320.25, lastPurchase: '2023-03-10', status: 'inactive' },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com', phone: '(555) 321-0987', totalSpend: 1800.00, lastPurchase: '2023-05-28', status: 'active' },
    { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', phone: '(555) 654-3210', totalSpend: 450.30, lastPurchase: '2023-02-18', status: 'inactive' },
];
export function CustomersTable() {
    const handleEdit = (id) => {
        console.log(`Editing customer ${id}`);
        // Implement edit functionality
    };
    const handleDelete = (id, name) => {
        if (window.confirm(`Are you sure you want to delete the customer "${name}"?`)) {
            console.log(`Deleting customer ${id}`);
            // Implement delete functionality
        }
    };
    return (_jsx("div", { className: "rounded-lg border shadow-sm", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Email" }), _jsx(TableHead, { children: "Phone" }), _jsx(TableHead, { children: "Total Spend" }), _jsx(TableHead, { children: "Last Purchase" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { className: "w-[100px]", children: "Actions" })] }) }), _jsx(TableBody, { children: mockCustomers.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 7, className: "h-24 text-center", children: "No customers found" }) })) : (mockCustomers.map((customer) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: customer.name }), _jsx(TableCell, { children: customer.email }), _jsx(TableCell, { children: customer.phone }), _jsx(TableCell, { children: formatCurrency(customer.totalSpend) }), _jsx(TableCell, { children: customer.lastPurchase }), _jsx(TableCell, { children: customer.status.charAt(0).toUpperCase() + customer.status.slice(1) }), _jsxs(TableCell, { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleEdit(customer.id), children: _jsx(Edit, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleDelete(customer.id, customer.name), children: _jsx(Trash2, { className: "h-4 w-4 text-red-500" }) })] })] }, customer.id)))) })] }) }));
}
