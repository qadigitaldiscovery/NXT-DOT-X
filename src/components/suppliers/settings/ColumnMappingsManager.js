import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
export function ColumnMappingsManager({ sourceColumns = [], targetColumns = [], initialMappings = [], onSave }) {
    const [mappings, setMappings] = useState(initialMappings);
    const [newSourceColumn, setNewSourceColumn] = useState('');
    const [newTargetColumn, setNewTargetColumn] = useState('');
    const handleAddMapping = () => {
        if (newSourceColumn && newTargetColumn) {
            const newMapping = {
                id: Date.now().toString(),
                sourceColumn: newSourceColumn,
                targetColumn: newTargetColumn
            };
            setMappings([...mappings, newMapping]);
            setNewSourceColumn('');
            setNewTargetColumn('');
        }
    };
    const handleRemoveMapping = (id) => {
        setMappings(mappings.filter(mapping => mapping.id !== id));
    };
    const handleSave = () => {
        if (onSave) {
            onSave(mappings);
        }
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Column Mappings" }), _jsx(CardDescription, { children: "Map source data columns to system columns" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [_jsx("div", { className: "flex-1", children: _jsxs(Select, { value: newSourceColumn, onValueChange: setNewSourceColumn, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select source column" }) }), _jsx(SelectContent, { children: sourceColumns.map(column => (_jsx(SelectItem, { value: column, children: column }, column))) })] }) }), _jsx("div", { className: "flex-1", children: _jsxs(Select, { value: newTargetColumn, onValueChange: setNewTargetColumn, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select target column" }) }), _jsx(SelectContent, { children: targetColumns.map(column => (_jsx(SelectItem, { value: column, children: column }, column))) })] }) }), _jsx(Button, { onClick: handleAddMapping, disabled: !newSourceColumn || !newTargetColumn, children: "Add Mapping" })] }), _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Source Column" }), _jsx(TableHead, { children: "Target Column" }), _jsx(TableHead, { className: "w-[100px]", children: "Actions" })] }) }), _jsx(TableBody, { children: mappings.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 3, className: "text-center py-4", children: "No mappings defined" }) })) : (mappings.map(mapping => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: mapping.sourceColumn }), _jsx(TableCell, { children: mapping.targetColumn }), _jsx(TableCell, { children: _jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleRemoveMapping(mapping.id), children: "Remove" }) })] }, mapping.id)))) })] })] }) }), _jsx(CardFooter, { className: "flex justify-end", children: _jsx(Button, { onClick: handleSave, children: "Save Mappings" }) })] }));
}
export default ColumnMappingsManager;
