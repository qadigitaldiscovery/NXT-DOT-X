import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
const mockCosts = [
    { id: '1', supplier: 'TechCorp', category: 'Hardware', amount: 12500.00, date: '2023-05-15', status: 'approved' },
    { id: '2', supplier: 'OfficeMax', category: 'Supplies', amount: 850.50, date: '2023-05-18', status: 'pending' },
    { id: '3', supplier: 'FurniCo', category: 'Furniture', amount: 3200.75, date: '2023-05-10', status: 'rejected' },
    { id: '4', supplier: 'SoftSolutions', category: 'Software', amount: 4999.99, date: '2023-05-22', status: 'approved' },
    { id: '5', supplier: 'CloudNet', category: 'Services', amount: 750.00, date: '2023-05-25', status: 'pending' },
];
export function CostsList() {
    const handleEdit = (id) => {
        console.log(`Editing cost ${id}`);
        // Implement edit functionality
    };
    const handleDelete = (id, supplier) => {
        if (window.confirm(`Are you sure you want to delete the cost entry for ${supplier}?`)) {
            console.log(`Deleting cost ${id}`);
            // Implement delete functionality
        }
    };
    return (_jsx("div", { className: "rounded-lg border shadow-sm", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Supplier" }), _jsx(TableHead, { children: "Category" }), _jsx(TableHead, { children: "Amount" }), _jsx(TableHead, { children: "Date" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { className: "w-[100px]", children: "Actions" })] }) }), _jsx(TableBody, { children: mockCosts.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, className: "h-24 text-center", children: "No costs found" }) })) : (mockCosts.map((cost) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: cost.supplier }), _jsx(TableCell, { children: cost.category }), _jsx(TableCell, { children: formatCurrency(cost.amount) }), _jsx(TableCell, { children: cost.date }), _jsx(TableCell, { children: _jsxs(Badge, { variant: cost.status === 'approved' ? 'default' :
                                        cost.status === 'pending' ? 'secondary' : 'destructive', children: [cost.status === 'approved' && _jsx(CheckCircle, { className: "h-3 w-3 mr-1" }), cost.status === 'pending' && _jsx(Clock, { className: "h-3 w-3 mr-1" }), cost.status === 'rejected' && _jsx(AlertCircle, { className: "h-3 w-3 mr-1" }), cost.status.charAt(0).toUpperCase() + cost.status.slice(1)] }) }), _jsxs(TableCell, { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleEdit(cost.id), children: _jsx(Edit, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleDelete(cost.id, cost.supplier), children: _jsx(Trash2, { className: "h-4 w-4 text-red-500" }) })] })] }, cost.id)))) })] }) }));
}
