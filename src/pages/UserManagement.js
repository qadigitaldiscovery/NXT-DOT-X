import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Shield, CheckCircle2 } from 'lucide-react';
import { UsersTab } from '@/components/admin/users/UsersTab';
import RolesTab from '@/components/admin/users/RolesTab';
import PermissionsTab from '@/components/admin/users/PermissionsTab';
import { UserManagementProvider } from '@/context/UserManagementContext';
const UserManagement = () => {
    const { user } = useAuth();
    return (_jsx(UserManagementProvider, { children: _jsxs("div", { className: "container mx-auto p-6", children: [_jsx("div", { className: "flex justify-between items-center mb-6", children: _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "User Management" }), _jsx("p", { className: "text-gray-500", children: "Manage system users, roles, and permissions" })] }) }), _jsxs(Tabs, { defaultValue: "users", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 mb-8", children: [_jsxs(TabsTrigger, { value: "users", className: "flex items-center", children: [_jsx(Users, { className: "mr-2 h-4 w-4" }), "Users"] }), _jsxs(TabsTrigger, { value: "roles", className: "flex items-center", children: [_jsx(Shield, { className: "mr-2 h-4 w-4" }), "Roles"] }), _jsxs(TabsTrigger, { value: "permissions", className: "flex items-center", children: [_jsx(CheckCircle2, { className: "mr-2 h-4 w-4" }), "Permissions"] })] }), _jsx(TabsContent, { value: "users", children: _jsx(UsersTab, {}) }), _jsx(TabsContent, { value: "roles", children: _jsx(RolesTab, {}) }), _jsx(TabsContent, { value: "permissions", children: _jsx(PermissionsTab, {}) })] })] }) }));
};
export default UserManagement;
