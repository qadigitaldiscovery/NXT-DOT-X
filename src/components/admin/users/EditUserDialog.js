import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../../../components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { useToast } from '../../../components/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { useEffect } from 'react';
const userSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address'),
    role: z.string().min(1, 'Role is required'),
    status: z.string().min(1, 'Status is required'),
});
const mockRoles = [
    { value: 'admin', label: 'Administrator' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
];
const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
];
export function EditUserDialog({ user, open, onOpenChange, onUserUpdated }) {
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: '',
            email: '',
            role: '',
            status: '',
        },
    });
    useEffect(() => {
        if (user) {
            form.reset({
                username: user.username,
                email: user.email,
                role: user.role.toLowerCase(),
                status: user.status,
            });
        }
    }, [user, form]);
    const handleSubmit = (data) => {
        if (!user)
            return;
        toast.success(`User "${data.username}" has been updated successfully.`);
        if (onUserUpdated) {
            onUserUpdated(user.id, {
                username: data.username,
                email: data.email,
                role: data.role,
                status: data.status,
            });
        }
        if (onOpenChange) {
            onOpenChange(false);
        }
    };
    if (!user)
        return null;
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsx(DialogHeader, { children: _jsx("h2", { children: "Edit User" }) }), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(handleSubmit), className: "space-y-4 pt-4", children: [_jsx(FormField, { control: form.control, name: "username", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Username" }), _jsx(FormControl, { children: _jsx(Input, { ...field, placeholder: "e.g., johndoe" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, { ...field, placeholder: "e.g., john@example.com" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "role", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Role" }), _jsx(FormControl, { children: _jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select a role" }) }), _jsx(SelectContent, { children: mockRoles.map((role) => (_jsx(SelectItem, { value: role.value, children: role.label }, role.value))) })] }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "status", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Status" }), _jsx(FormControl, { children: _jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select status" }) }), _jsx(SelectContent, { children: statusOptions.map((status) => (_jsx(SelectItem, { value: status.value, children: status.label }, status.value))) })] }) }), _jsx(FormMessage, {})] })) }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange && onOpenChange(false), children: "Cancel" }), _jsx(Button, { type: "submit", children: "Update User" })] })] }) })] }) }));
}
