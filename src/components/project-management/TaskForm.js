import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const TaskForm = ({ isOpen, onOpenChange, projectId, task, onSubmit }) => {
    const isEditing = !!task;
    const form = useForm({
        defaultValues: {
            title: task?.title || '',
            description: task?.description || '',
            priority: task?.priority || 'medium',
            status: task?.status || 'todo',
            due_date: task?.due_date ? new Date(task.due_date).toISOString().split('T')[0] : undefined,
            time_estimated: task?.time_estimated,
            project_id: projectId,
            ...(isEditing && { id: task.id })
        }
    });
    const handleSubmit = (data) => {
        onSubmit(data);
        onOpenChange(false);
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: isEditing ? 'Edit Task' : 'Create New Task' }) }), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(handleSubmit), className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "title", rules: { required: "Title is required" }, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Title" }), _jsx(FormControl, { children: _jsx(Input, { ...field, placeholder: "Task title" }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "description", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Description" }), _jsx(FormControl, { children: _jsx(Textarea, { ...field, placeholder: "Describe the task...", rows: 3 }) })] })) }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "status", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Status" }), _jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select status" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "todo", children: "To Do" }), _jsx(SelectItem, { value: "in-progress", children: "In Progress" }), _jsx(SelectItem, { value: "review", children: "Review" }), _jsx(SelectItem, { value: "done", children: "Done" })] })] })] })) }), _jsx(FormField, { control: form.control, name: "priority", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Priority" }), _jsxs(Select, { value: field.value, onValueChange: field.onChange, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select priority" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "low", children: "Low" }), _jsx(SelectItem, { value: "medium", children: "Medium" }), _jsx(SelectItem, { value: "high", children: "High" }), _jsx(SelectItem, { value: "urgent", children: "Urgent" })] })] })] })) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(FormField, { control: form.control, name: "due_date", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Due Date" }), _jsx(FormControl, { children: _jsx(Input, { type: "date", ...field }) })] })) }), _jsx(FormField, { control: form.control, name: "time_estimated", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Estimated Hours" }), _jsx(FormControl, { children: _jsx(Input, { type: "number", ...field, placeholder: "0", min: 0, step: 0.5 }) })] })) })] }), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", children: isEditing ? 'Save Changes' : 'Create Task' }) })] }) })] }) }));
};
export default TaskForm;
