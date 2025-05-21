import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FilePlus } from 'lucide-react';
import { toast } from 'sonner';
export const AddDocumentDialog = ({ categories, onDocumentAdd }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [documentType, setDocumentType] = useState('markdown');
    const [author, setAuthor] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !categoryId || !documentType || !author) {
            toast.error('Please fill in all required fields');
            return;
        }
        onDocumentAdd(categoryId, {
            title,
            description,
            type: documentType,
            content,
            author
        });
        // Reset form
        resetForm();
        setOpen(false);
        toast.success('Document added successfully');
    };
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setContent('');
        setCategoryId('');
        setDocumentType('markdown');
        setAuthor('');
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "flex items-center gap-2", children: [_jsx(FilePlus, { size: 16 }), "Add Document"] }) }), _jsx(DialogContent, { className: "max-w-2xl", children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Add New Document" }), _jsx(DialogDescription, { children: "Create a new documentation document" })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsxs(Label, { htmlFor: "title", className: "text-right", children: ["Title ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "title", value: title, onChange: (e) => setTitle(e.target.value), className: "col-span-3", required: true })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsxs(Label, { htmlFor: "category", className: "text-right", children: ["Category ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs(Select, { value: categoryId, onValueChange: setCategoryId, required: true, children: [_jsx(SelectTrigger, { className: "col-span-3", children: _jsx(SelectValue, { placeholder: "Select category" }) }), _jsx(SelectContent, { children: categories.map((category) => (_jsx(SelectItem, { value: category.id, children: category.name }, category.id))) })] })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsxs(Label, { htmlFor: "type", className: "text-right", children: ["Document Type ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs(Select, { value: documentType, onValueChange: (value) => setDocumentType(value), required: true, children: [_jsx(SelectTrigger, { className: "col-span-3", children: _jsx(SelectValue, { placeholder: "Select type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "markdown", children: "Markdown" }), _jsx(SelectItem, { value: "text", children: "Text" }), _jsx(SelectItem, { value: "pdf", children: "PDF" }), _jsx(SelectItem, { value: "image", children: "Image" }), _jsx(SelectItem, { value: "other", children: "Other" })] })] })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsxs(Label, { htmlFor: "author", className: "text-right", children: ["Author ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "author", value: author, onChange: (e) => setAuthor(e.target.value), className: "col-span-3", required: true })] }), _jsxs("div", { className: "grid grid-cols-4 items-start gap-4", children: [_jsx(Label, { htmlFor: "description", className: "text-right pt-2", children: "Description" }), _jsx(Textarea, { id: "description", value: description, onChange: (e) => setDescription(e.target.value), className: "col-span-3", rows: 2 })] }), _jsxs("div", { className: "grid grid-cols-4 items-start gap-4", children: [_jsx(Label, { htmlFor: "content", className: "text-right pt-2", children: "Content" }), _jsx(Textarea, { id: "content", value: content, onChange: (e) => setContent(e.target.value), className: "col-span-3 font-mono", rows: 10, placeholder: documentType === 'markdown' ? '# Document Title\n\nContent goes here...' : '' })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), children: "Cancel" }), _jsx(Button, { type: "submit", children: "Add Document" })] })] }) })] }));
};
