import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
export function CustomerForm({ initialData, isEditing = false, onDelete }) {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        name: initialData?.name || '',
        code: initialData?.code || '',
        contact_name: initialData?.contact_name || '',
        email: initialData?.email || '',
        phone: initialData?.phone || '',
        website: initialData?.website || '',
        account_type: initialData?.account_type || 'standard',
        status: initialData?.status || 'active'
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleStatusChange = (value) => {
        setFormData(prev => ({ ...prev, status: value }));
    };
    const handleAccountTypeChange = (value) => {
        setFormData(prev => ({ ...prev, account_type: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Customer form submitted:', formData);
        // In a real implementation, this would call API endpoints
        navigate('/customer-management/directory');
    };
    return (_jsx("form", { onSubmit: handleSubmit, children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: isEditing ? 'Edit Customer' : 'New Customer' }), _jsx(CardDescription, { children: isEditing
                                ? 'Update customer information'
                                : 'Enter information to add a new customer' })] }), _jsx(CardContent, { className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Customer Name" }), _jsx(Input, { id: "name", name: "name", value: formData.name, onChange: handleChange, placeholder: "Enter customer name", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "code", children: "Customer Code" }), _jsx(Input, { id: "code", name: "code", value: formData.code, onChange: handleChange, placeholder: "Enter customer code", required: true, disabled: isEditing })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "contact_name", children: "Contact Person" }), _jsx(Input, { id: "contact_name", name: "contact_name", value: formData.contact_name || '', onChange: handleChange, placeholder: "Enter contact person name" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", name: "email", type: "email", value: formData.email || '', onChange: handleChange, placeholder: "Enter email address" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "phone", children: "Phone" }), _jsx(Input, { id: "phone", name: "phone", value: formData.phone || '', onChange: handleChange, placeholder: "Enter phone number" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "website", children: "Website" }), _jsx(Input, { id: "website", name: "website", value: formData.website || '', onChange: handleChange, placeholder: "Enter website URL" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "account_type", children: "Account Type" }), _jsxs(Select, { value: formData.account_type, onValueChange: handleAccountTypeChange, children: [_jsx(SelectTrigger, { id: "account_type", children: _jsx(SelectValue, { placeholder: "Select account type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "standard", children: "Standard" }), _jsx(SelectItem, { value: "premium", children: "Premium" }), _jsx(SelectItem, { value: "enterprise", children: "Enterprise" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "status", children: "Status" }), _jsxs(Select, { value: formData.status, onValueChange: handleStatusChange, children: [_jsx(SelectTrigger, { id: "status", children: _jsx(SelectValue, { placeholder: "Select status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "active", children: "Active" }), _jsx(SelectItem, { value: "inactive", children: "Inactive" })] })] })] })] }) }), _jsxs(CardFooter, { className: "flex justify-between", children: [_jsxs(Button, { type: "button", variant: "ghost", onClick: () => navigate('/customer-management/directory'), children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back"] }), _jsxs("div", { className: "flex gap-2", children: [isEditing && onDelete && (_jsxs(Button, { type: "button", variant: "destructive", onClick: onDelete, children: [_jsx(Trash2, { className: "h-4 w-4 mr-2" }), "Delete"] })), _jsxs(Button, { type: "submit", children: [_jsx(Save, { className: "h-4 w-4 mr-2" }), isEditing ? 'Update' : 'Save'] })] })] })] }) }));
}
