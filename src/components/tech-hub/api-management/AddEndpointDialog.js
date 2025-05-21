import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
const endpointSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().optional(),
    url: z.string().url({ message: 'Valid URL is required' }),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
    category: z.string().min(1, { message: 'Category is required' }),
});
export function AddEndpointDialog({ categories, onAddEndpoint, defaultOpen, onOpenChange }) {
    const form = useForm({
        resolver: zodResolver(endpointSchema),
        defaultValues: {
            name: '',
            description: '',
            url: '',
            method: 'GET',
            category: categories[0] || '',
        },
    });
    const onSubmit = (data) => {
        onAddEndpoint(data);
        form.reset();
        if (onOpenChange)
            onOpenChange(false);
    };
    return (_jsxs(Dialog, { defaultOpen: defaultOpen, onOpenChange: onOpenChange, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(Button, { children: "Add Endpoint" }) }), _jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Add New Endpoint" }) }), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Endpoint Name" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "e.g., Get User Profile", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "description", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Description (Optional)" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "e.g., Retrieves the user's profile information", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "url", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "URL" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "e.g., https://api.example.com/users/{id}", ...field }) }), _jsx(FormMessage, {})] })) }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "method", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Method" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select method" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "GET", children: "GET" }), _jsx(SelectItem, { value: "POST", children: "POST" }), _jsx(SelectItem, { value: "PUT", children: "PUT" }), _jsx(SelectItem, { value: "DELETE", children: "DELETE" }), _jsx(SelectItem, { value: "PATCH", children: "PATCH" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "category", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Category" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select category" }) }) }), _jsx(SelectContent, { children: categories.map(category => (_jsx(SelectItem, { value: category, children: category }, category))) })] }), _jsx(FormMessage, {})] })) })] }), _jsxs("div", { className: "flex justify-end space-x-2 pt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange && onOpenChange(false), children: "Cancel" }), _jsx(Button, { type: "submit", children: "Add Endpoint" })] })] }) })] })] }));
}
