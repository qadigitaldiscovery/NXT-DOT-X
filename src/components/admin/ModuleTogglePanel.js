import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useModules } from '@/context/ModulesContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
const ModuleTogglePanel = ({ userId }) => {
    const { modules, loading, toggleModule } = useModules();
    const [selectedUser, setSelectedUser] = useState(userId);
    const [users, setUsers] = useState([]);
    const { user } = useAuth();
    const handleUserChange = (uid) => setSelectedUser(uid);
    const handleToggleAccess = (moduleId) => {
        if (toggleModule) {
            toggleModule(moduleId);
            toast.success('Module access updated');
        }
    };
    /* demo user list */
    useEffect(() => {
        if (user) {
            setUsers([
                { id: user.id, email: user.email, username: user.email || user.id },
            ]);
        }
    }, [user]);
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Module Access Control" }), _jsx(CardDescription, { children: "Manage which modules each user can access" })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "mb-6", children: [_jsx(Label, { htmlFor: "userId", children: "Select User" }), _jsxs(Select, { value: selectedUser, onValueChange: handleUserChange, children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select a user" }) }), _jsx(SelectContent, { children: users.map(u => (_jsx(SelectItem, { value: u.id, children: u.username }, u.id))) })] })] }), loading ? (_jsx("div", { className: "flex justify-center py-8", children: _jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-500" }) })) : modules.length === 0 ? (_jsx("p", { className: "py-8 text-center text-gray-500", children: "No modules configured" })) : (_jsx("div", { className: "space-y-4", children: modules.map(m => (_jsxs("div", { className: "flex items-center justify-between rounded-md border p-3", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: m.name }), m.features && Object.keys(m.features).length > 0 && (_jsxs(Badge, { variant: "outline", className: "mt-1", children: [Object.keys(m.features).length, " features"] }))] }), _jsx(Switch, { checked: m.isEnabled, onCheckedChange: () => handleToggleAccess(m.id) })] }, m.id))) }))] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Add Module Access" }), _jsx(CardDescription, { children: "Grant access to another module" })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: e => {
                                e.preventDefault();
                                toast.error('Adding module access not implemented yet');
                            }, className: "space-y-4", children: [_jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "moduleSlug", children: "Module *" }), _jsxs(Select, { name: "moduleSlug", required: true, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select a module" }) }), _jsx(SelectContent, { children: modules.map(m => (_jsx(SelectItem, { value: m.id, children: m.name }, m.id))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "submenuSlug", children: "Submenu (optional)" }), _jsx(Input, { id: "submenuSlug", name: "submenuSlug" })] })] }), _jsx(Button, { type: "submit", className: "w-full", children: "Add Access" })] }) })] })] }));
};
export default ModuleTogglePanel;
