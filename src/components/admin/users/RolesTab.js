import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';
import { AddRoleDialog } from './AddRoleDialog';
const mockRoles = [
    { id: '1', name: 'Administrator', description: 'Full system access', permissions: 15 },
    { id: '2', name: 'Editor', description: 'Content management access', permissions: 8 },
    { id: '3', name: 'Viewer', description: 'Read-only access', permissions: 3 },
];
export function RolesTab() {
    const [roles, setRoles] = React.useState(mockRoles);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const handleAddRole = (role) => {
        setRoles([...roles, { id: Date.now().toString(), ...role, permissions: 0 }]);
        setDialogOpen(false);
    };
    const handleEditRole = (id) => {
        console.log(`Editing role ${id}`);
        // Implement edit functionality
    };
    const handleDeleteRole = (id, name) => {
        if (window.confirm(`Are you sure you want to delete the role "${name}"?`)) {
            setRoles(roles.filter(role => role.id !== id));
        }
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Roles" }), _jsx(CardDescription, { children: "Manage user roles and permissions" })] }), _jsx(AddRoleDialog, { open: dialogOpen, onOpenChange: setDialogOpen, onRoleAdded: handleAddRole })] }), _jsx(CardContent, { children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Name" }), _jsx(TableHead, { children: "Description" }), _jsx(TableHead, { children: "Permissions" }), _jsx(TableHead, { className: "w-[100px]", children: "Actions" })] }) }), _jsx(TableBody, { children: roles.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 4, className: "h-24 text-center", children: "No roles found" }) })) : (roles.map((role) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: role.name }), _jsx(TableCell, { children: role.description }), _jsx(TableCell, { children: role.permissions }), _jsxs(TableCell, { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleEditRole(role.id), children: _jsx(Edit, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", onClick: () => handleDeleteRole(role.id, role.name), children: _jsx(Trash2, { className: "h-4 w-4 text-red-500" }) })] })] }, role.id)))) })] }) })] }));
}
export default RolesTab;
