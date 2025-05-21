import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserManagement } from '@/context/UserManagementContext';
// Sample permission data structure
const samplePermissions = {
    "User Management": [
        { id: "users.view", name: "View Users" },
        { id: "users.create", name: "Create Users" },
        { id: "users.edit", name: "Edit Users" },
        { id: "users.delete", name: "Delete Users" }
    ],
    "Content Management": [
        { id: "content.view", name: "View Content" },
        { id: "content.create", name: "Create Content" },
        { id: "content.edit", name: "Edit Content" },
        { id: "content.delete", name: "Delete Content" }
    ],
    "System": [
        { id: "system.settings", name: "System Settings" },
        { id: "system.logs", name: "View Logs" }
    ]
};
const PermissionsTab = () => {
    // Get permissions from context
    const { permissions } = useUserManagement();
    // Use sample data if no permissions are available
    const permissionsByCategory = Object.keys(permissions || {}).length > 0 ? permissions : samplePermissions;
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Permission Management" }), _jsx(CardDescription, { children: "View all available permissions in the system." })] }), _jsx(CardContent, { children: Object.entries(permissionsByCategory).map(([category, perms]) => (_jsxs("div", { className: "mb-8", children: [_jsxs("h3", { className: "text-lg font-medium mb-4", children: [category, " Permissions"] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: perms.map((permission) => (_jsx("div", { className: "p-4 border rounded-md flex justify-between items-center", children: _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: permission.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: permission.id })] }) }, permission.id))) })] }, category))) })] }));
};
export default PermissionsTab;
