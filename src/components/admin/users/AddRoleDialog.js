import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
export function AddRoleDialog({ open, onOpenChange, onRoleAdded }) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onRoleAdded({ name, description });
            setName('');
            setDescription('');
        }
    };
    const controlledProps = open !== undefined && onOpenChange !== undefined
        ? { open, onOpenChange }
        : {};
    return (_jsxs(Dialog, { ...controlledProps, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "gap-2", children: [_jsx(PlusCircle, { className: "h-4 w-4" }), "Add Role"] }) }), _jsx(DialogContent, { children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Add New Role" }), _jsx(DialogDescription, { children: "Create a new role to assign to users." })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "name", children: "Role Name" }), _jsx(Input, { id: "name", value: name, onChange: (e) => setName(e.target.value), placeholder: "Admin, Editor, etc.", required: true })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "description", children: "Description" }), _jsx(Input, { id: "description", value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Describe the role's permissions and purpose" })] })] }), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", children: "Add Role" }) })] }) })] }));
}
export default AddRoleDialog;
