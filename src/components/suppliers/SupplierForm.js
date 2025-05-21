import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useCreateSupplier, useUpdateSupplier } from '@/hooks/use-suppliers';
export function SupplierForm({ initialData, isEditing = false, onDelete }) {
    const navigate = useNavigate();
    const { mutate: createSupplier, isPending: isCreating } = useCreateSupplier();
    const { mutate: updateSupplier, isPending: isUpdating } = useUpdateSupplier();
    const [formData, setFormData] = React.useState({
        name: initialData?.name || '',
        code: initialData?.code || '',
        contact_name: initialData?.contact_name || '',
        email: initialData?.email || '',
        phone: initialData?.phone || '',
        website: initialData?.website || '',
        payment_terms: initialData?.payment_terms || '',
        status: initialData?.status || 'active'
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleStatusChange = (value) => {
        setFormData(prev => ({ ...prev, status: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing && initialData) {
            updateSupplier({ ...initialData, ...formData }, {
                onSuccess: () => {
                    navigate('/beta1/suppliers');
                }
            });
        }
        else {
            createSupplier(formData, {
                onSuccess: () => {
                    navigate('/beta1/suppliers');
                }
            });
        }
    };
    return (_jsx("form", { onSubmit: handleSubmit, children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: isEditing ? 'Edit Supplier' : 'New Supplier' }), _jsx(CardDescription, { children: isEditing
                                ? 'Update supplier information'
                                : 'Enter information to add a new supplier' })] }), _jsx(CardContent, { className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Supplier Name" }), _jsx(Input, { id: "name", name: "name", value: formData.name, onChange: handleChange, placeholder: "Enter supplier name", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "code", children: "Supplier Code" }), _jsx(Input, { id: "code", name: "code", value: formData.code, onChange: handleChange, placeholder: "Enter supplier code", required: true, disabled: isEditing })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "contact_name", children: "Contact Person" }), _jsx(Input, { id: "contact_name", name: "contact_name", value: formData.contact_name || '', onChange: handleChange, placeholder: "Enter contact person name" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", name: "email", type: "email", value: formData.email || '', onChange: handleChange, placeholder: "Enter email address" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "phone", children: "Phone" }), _jsx(Input, { id: "phone", name: "phone", value: formData.phone || '', onChange: handleChange, placeholder: "Enter phone number" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "website", children: "Website" }), _jsx(Input, { id: "website", name: "website", value: formData.website || '', onChange: handleChange, placeholder: "Enter website URL" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "payment_terms", children: "Payment Terms" }), _jsx(Input, { id: "payment_terms", name: "payment_terms", value: formData.payment_terms || '', onChange: handleChange, placeholder: "e.g., Net 30" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "status", children: "Status" }), _jsxs(Select, { value: formData.status, onValueChange: handleStatusChange, children: [_jsx(SelectTrigger, { id: "status", children: _jsx(SelectValue, { placeholder: "Select status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "active", children: "Active" }), _jsx(SelectItem, { value: "inactive", children: "Inactive" })] })] })] })] }) }), _jsxs(CardFooter, { className: "flex justify-between", children: [_jsxs(Button, { type: "button", variant: "ghost", onClick: () => navigate('/beta1/suppliers'), children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back"] }), _jsxs("div", { className: "flex gap-2", children: [isEditing && onDelete && (_jsxs(Button, { type: "button", variant: "destructive", onClick: onDelete, children: [_jsx(Trash2, { className: "h-4 w-4 mr-2" }), "Delete"] })), _jsx(Button, { type: "submit", disabled: isCreating || isUpdating, children: isCreating || isUpdating ? 'Saving...' : 'Save Supplier' })] })] })] }) }));
}
