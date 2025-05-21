import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
const mockMappings = [
    { id: '1', sourceField: 'Customer ID', targetField: 'customer_id', type: 'string', required: true },
    { id: '2', sourceField: 'Full Name', targetField: 'name', type: 'string', required: true },
    { id: '3', sourceField: 'Email Address', targetField: 'email', type: 'string', required: false },
    { id: '4', sourceField: 'Phone Number', targetField: 'phone', type: 'string', required: false },
    { id: '5', sourceField: 'Total Purchases', targetField: 'total_spend', type: 'number', required: false },
];
export function CustomerColumnMappings() {
    const handleAddMapping = () => {
        console.log('Adding new mapping');
        // Implement add functionality
    };
    const handleRemoveMapping = (id, sourceField) => {
        if (window.confirm(`Are you sure you want to remove the mapping for "${sourceField}"?`)) {
            console.log(`Removing mapping ${id}`);
            // Implement remove functionality
        }
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Column Mappings" }), _jsx(CardDescription, { children: "Map source data fields to customer attributes" })] }), _jsxs(Button, { size: "sm", onClick: handleAddMapping, children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Mapping"] })] }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Source Field" }), _jsx(TableHead, { children: "Target Field" }), _jsx(TableHead, { children: "Data Type" }), _jsx(TableHead, { children: "Required" }), _jsx(TableHead, { className: "w-[80px]", children: "Actions" })] }) }), _jsx(TableBody, { children: mockMappings.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 5, className: "h-24 text-center", children: "No mappings defined" }) })) : (mockMappings.map((mapping) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: mapping.sourceField }), _jsx(TableCell, { children: mapping.targetField }), _jsx(TableCell, { children: mapping.type }), _jsx(TableCell, { children: mapping.required ? 'Yes' : 'No' }), _jsx(TableCell, { children: _jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleRemoveMapping(mapping.id, mapping.sourceField), children: _jsx(Trash2, { className: "h-4 w-4 text-red-500" }) }) })] }, mapping.id)))) })] }) })] }));
}
