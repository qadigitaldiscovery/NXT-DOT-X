import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const ProjectForm = ({ isOpen, onOpenChange, project, onSubmit }) => {
    const { user } = useAuth();
    const isEditing = !!project;
    const form = useForm({
        defaultValues: {
            name: project?.name || '',
            description: project?.description || '',
            status: project?.status || 'active',
            start_date: project?.start_date ? new Date(project.start_date).toISOString().split('T')[0] : undefined,
            end_date: project?.end_date ? new Date(project.end_date).toISOString().split('T')[0] : undefined,
            rag_status: project?.rag_status || 'green',
            ...(isEditing && { id: project.id }),
            ...((!isEditing && user) && { owner_id: user.id })
        }
    });
    const handleSubmit = (data) => {
        onSubmit(data);
        onOpenChange(false);
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-lg", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: isEditing ? 'Edit Project' : 'Create New Project' }) }), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(handleSubmit), className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "name", rules: { required: "Project name is required" }, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Name" }), _jsx(FormControl, { children: _jsx(Input, { ...field, placeholder: "Project name" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "description", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Description" }), _jsx(FormControl, { children: _jsx(Textarea, { ...field, placeholder: "Describe the project...", rows: 3 }) })] })) }), _jsx(FormField, { control: form.control, name: "status", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Status" }), _jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select status" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "active", children: "Active" }), _jsx(SelectItem, { value: "planned", children: "Planned" }), _jsx(SelectItem, { value: "on-hold", children: "On Hold" }), _jsx(SelectItem, { value: "completed", children: "Completed" }), _jsx(SelectItem, { value: "cancelled", children: "Cancelled" })] })] })] })) }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "start_date", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Start Date" }), _jsx(FormControl, { children: _jsx(Input, { type: "date", ...field }) })] })) }), _jsx(FormField, { control: form.control, name: "end_date", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "End Date" }), _jsx(FormControl, { children: _jsx(Input, { type: "date", ...field }) })] })) })] }), _jsx(FormField, { control: form.control, name: "rag_status", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "RAG Status" }), _jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select RAG status" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "green", children: "Green (On Track)" }), _jsx(SelectItem, { value: "amber", children: "Amber (At Risk)" }), _jsx(SelectItem, { value: "red", children: "Red (Off Track)" })] })] })] })) }), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", children: isEditing ? 'Save Changes' : 'Create Project' }) })] }) })] }) }));
};
export default ProjectForm;
