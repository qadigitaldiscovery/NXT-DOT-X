import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FolderPlus } from 'lucide-react';
import { toast } from 'sonner';
export const AddCategoryDialog = ({ onCategoryAdd }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            toast.error('Please enter a category name');
            return;
        }
        onCategoryAdd({ name });
        setName('');
        setOpen(false);
        toast.success('Category added successfully');
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "flex items-center gap-2", children: [_jsx(FolderPlus, { size: 16 }), "Add Category"] }) }), _jsx(DialogContent, { children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Add New Category" }), _jsx(DialogDescription, { children: "Create a new documentation category to organize documents" })] }), _jsx("div", { className: "grid gap-4 py-4", children: _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsxs(Label, { htmlFor: "name", className: "text-right", children: ["Name ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "name", value: name, onChange: (e) => setName(e.target.value), className: "col-span-3", required: true })] }) }), _jsxs(DialogFooter, { children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), children: "Cancel" }), _jsx(Button, { type: "submit", children: "Add Category" })] })] }) })] }));
};
