import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { MoreHorizontal, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const samplePermissions = [
    {
        id: '1',
        roleName: 'Administrator',
        readAccess: true,
        writeAccess: true,
        deleteAccess: true,
        adminAccess: true
    },
    {
        id: '2',
        roleName: 'Data Analyst',
        readAccess: true,
        writeAccess: false,
        deleteAccess: false,
        adminAccess: false
    },
    {
        id: '3',
        roleName: 'Content Manager',
        readAccess: true,
        writeAccess: true,
        deleteAccess: false,
        adminAccess: false
    },
    {
        id: '4',
        roleName: 'External Partner',
        readAccess: true,
        writeAccess: false,
        deleteAccess: false,
        adminAccess: false
    }
];
const ApiPermissionsTable = () => {
    const [permissions, setPermissions] = useState(samplePermissions);
    const handleTogglePermission = (id, field) => {
        setPermissions(permissions.map(permission => {
            if (permission.id === id) {
                return {
                    ...permission,
                    [field]: !permission[field]
                };
            }
            return permission;
        }));
        toast.success(`Permission updated successfully`);
    };
    const handleAddRole = () => {
        toast.info("Opening role configuration dialog");
        // In a real app, this would open a modal to add a new role
    };
    const handleDeleteRole = (id) => {
        setPermissions(permissions.filter(permission => permission.id !== id));
        toast.success("Role removed successfully");
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "API Permissions" }), _jsx(CardDescription, { children: "Configure access control and permissions for APIs" })] }), _jsxs(Button, { onClick: handleAddRole, children: [_jsx(Plus, { className: "h-4 w-4 mr-1" }), " Add Role"] })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "rounded-md border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Role Name" }), _jsx(TableHead, { className: "text-center", children: "Read Access" }), _jsx(TableHead, { className: "text-center", children: "Write Access" }), _jsx(TableHead, { className: "text-center", children: "Delete Access" }), _jsx(TableHead, { className: "text-center", children: "Admin Access" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: permissions.map((permission) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: permission.roleName }), _jsx(TableCell, { className: "text-center", children: _jsx("div", { className: "flex justify-center", children: _jsx(Switch, { checked: permission.readAccess, onCheckedChange: () => handleTogglePermission(permission.id, 'readAccess') }) }) }), _jsx(TableCell, { className: "text-center", children: _jsx("div", { className: "flex justify-center", children: _jsx(Switch, { checked: permission.writeAccess, onCheckedChange: () => handleTogglePermission(permission.id, 'writeAccess') }) }) }), _jsx(TableCell, { className: "text-center", children: _jsx("div", { className: "flex justify-center", children: _jsx(Switch, { checked: permission.deleteAccess, onCheckedChange: () => handleTogglePermission(permission.id, 'deleteAccess') }) }) }), _jsx(TableCell, { className: "text-center", children: _jsx("div", { className: "flex justify-center", children: _jsx(Switch, { checked: permission.adminAccess, onCheckedChange: () => handleTogglePermission(permission.id, 'adminAccess') }) }) }), _jsx(TableCell, { className: "text-right", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "sm", children: [_jsx(MoreHorizontal, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Open menu" })] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuItem, { onClick: () => toast.info(`Editing ${permission.roleName} role`), children: "Edit role" }), _jsx(DropdownMenuItem, { className: "text-red-600", onClick: () => handleDeleteRole(permission.id), children: "Delete role" })] })] }) })] }, permission.id))) })] }) }), _jsx("p", { className: "text-sm text-muted-foreground mt-4", children: "Configure which roles can access different API operations. Changes take effect immediately." })] })] }));
};
export default ApiPermissionsTable;
