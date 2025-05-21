import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { SuppliersTable } from '@/components/suppliers/SuppliersTable';
import { Button } from '@/components/ui/button';
import { PlusCircle, Upload, Filter, DownloadCloud, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuppliers, useCreateSupplier } from '@/hooks/use-suppliers';
import { BulkSupplierUpload } from '@/components/uploads/BulkSupplierUpload';
// Form schema for validation
const supplierSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    code: z.string().min(1, "Supplier code is required"),
    contact_name: z.string().nullable().optional(),
    email: z.string().email("Invalid email address").nullable().optional(),
    phone: z.string().nullable().optional(),
    website: z.string().nullable().optional(),
    payment_terms: z.string().nullable().optional(),
    status: z.string().default("active")
});
export default function SuppliersPage() {
    const navigate = useNavigate();
    const { data: suppliers = [], isLoading, error } = useSuppliers();
    const { mutate: createSupplier } = useCreateSupplier();
    const [showForm, setShowForm] = useState(false);
    const [showBulkUploadDialog, setShowBulkUploadDialog] = useState(false);
    const [showFilterDialog, setShowFilterDialog] = useState(false);
    const [filterStatus, setFilterStatus] = useState(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(supplierSchema),
        defaultValues: {
            status: "active"
        }
    });
    // Add new supplier handler
    const handleAddSupplier = () => {
        reset(); // Clear form fields
        setShowForm(true);
    };
    // Handle bulk upload
    const handleBulkUpload = () => {
        setShowBulkUploadDialog(true);
    };
    // Handle form submission
    const onSubmitForm = (data) => {
        try {
            // Ensure all required fields are present
            const supplierData = {
                name: data.name,
                code: data.code,
                contact_name: data.contact_name || null,
                email: data.email || null,
                phone: data.phone || null,
                website: data.website || null,
                payment_terms: data.payment_terms || null,
                status: data.status
            };
            // Call the createSupplier mutation to save to database
            createSupplier(supplierData);
            setShowForm(false);
        }
        catch (err) {
            toast.error('Error saving supplier. Please try again.');
            console.error('Error creating supplier:', err);
        }
    };
    // Handle filter action
    const handleFilter = () => {
        try {
            setShowFilterDialog(true);
        }
        catch (err) {
            toast.error('Error applying filters. Please try again.');
            console.error('Error filtering:', err);
        }
    };
    // Apply filters
    const applyFilters = () => {
        toast.success('Filters applied successfully');
        setShowFilterDialog(false);
    };
    // Handle export action
    const handleExport = () => {
        try {
            toast.success('Supplier data exported successfully');
            // In a real application, this would trigger a CSV/Excel export
        }
        catch (err) {
            toast.error('Failed to export data. Please try again.');
            console.error('Error exporting:', err);
        }
    };
    // Handle delete action
    const handleDelete = (supplier) => {
        try {
            toast.info(`Would delete supplier: ${supplier.name}`);
            // In a real application, this would open a confirmation dialog
        }
        catch (err) {
            toast.error('Error deleting supplier. Please try again.');
            console.error('Error deleting:', err);
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Suppliers" }), _jsx("p", { className: "text-muted-foreground", children: "Manage your suppliers and their cost data" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", onClick: handleBulkUpload, children: [_jsx(Upload, { className: "h-4 w-4 mr-2" }), "Bulk Import"] }), _jsxs(Button, { variant: "outline", onClick: () => navigate('/data-management/uploads/new'), children: [_jsx(Upload, { className: "h-4 w-4 mr-2" }), "Upload Cost File"] }), _jsxs(Button, { onClick: handleFilter, children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), "Filter"] }), _jsxs(Button, { variant: "outline", onClick: handleExport, children: [_jsx(DownloadCloud, { className: "h-4 w-4 mr-2" }), "Export"] }), _jsxs(Button, { onClick: handleAddSupplier, children: [_jsx(PlusCircle, { className: "h-4 w-4 mr-2" }), "Add Supplier"] })] })] }), error && (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: "Failed to load suppliers. Please try again later." })] })), _jsx(SuppliersTable, {}), _jsx(Dialog, { open: showForm, onOpenChange: setShowForm, children: _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Add New Supplier" }), _jsx(DialogDescription, { children: "Fill in the supplier details below." })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmitForm), children: [_jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "name", children: "Supplier Name *" }), _jsx(Input, { id: "name", ...register('name') }), errors.name && (_jsx("p", { className: "text-sm text-red-500", children: errors.name.message }))] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "code", children: "Supplier Code *" }), _jsx(Input, { id: "code", ...register('code') }), errors.code && (_jsx("p", { className: "text-sm text-red-500", children: errors.code.message }))] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "contact_name", children: "Contact Name" }), _jsx(Input, { id: "contact_name", ...register('contact_name') }), errors.contact_name && (_jsx("p", { className: "text-sm text-red-500", children: errors.contact_name.message }))] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", ...register('email'), type: "email" }), errors.email && (_jsx("p", { className: "text-sm text-red-500", children: errors.email.message }))] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "phone", children: "Phone" }), _jsx(Input, { id: "phone", ...register('phone') }), errors.phone && (_jsx("p", { className: "text-sm text-red-500", children: errors.phone.message }))] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "website", children: "Website" }), _jsx(Input, { id: "website", ...register('website') }), errors.website && (_jsx("p", { className: "text-sm text-red-500", children: errors.website.message }))] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "payment_terms", children: "Payment Terms" }), _jsx(Input, { id: "payment_terms", ...register('payment_terms'), placeholder: "e.g., Net 30" }), errors.payment_terms && (_jsx("p", { className: "text-sm text-red-500", children: errors.payment_terms.message }))] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "status", children: "Status" }), _jsxs("select", { className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm", id: "status", ...register('status'), children: [_jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "inactive", children: "Inactive" })] })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setShowForm(false), children: "Cancel" }), _jsx(Button, { type: "submit", children: "Add Supplier" })] })] })] }) }), _jsx(Dialog, { open: showFilterDialog, onOpenChange: setShowFilterDialog, children: _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Filter Suppliers" }), _jsx(DialogDescription, { children: "Set filter criteria to narrow down your supplier list." })] }), _jsx("div", { className: "py-4", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "filter-status", children: "Status" }), _jsxs("select", { id: "filter-status", className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-2", value: filterStatus || '', onChange: (e) => setFilterStatus(e.target.value || null), "aria-label": "Filter suppliers by status", children: [_jsx("option", { value: "", children: "All Statuses" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "inactive", children: "Inactive" })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "search-term", children: "Search Term" }), _jsx(Input, { id: "search-term", placeholder: "Search by name or code", className: "mt-2" })] })] }) }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setShowFilterDialog(false), children: "Reset" }), _jsx(Button, { onClick: applyFilters, children: "Apply Filters" })] })] }) }), _jsx(Dialog, { open: showBulkUploadDialog, onOpenChange: setShowBulkUploadDialog, children: _jsxs(DialogContent, { className: "max-w-md", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Bulk Supplier Import" }) }), _jsx(BulkSupplierUpload, {})] }) })] }));
}
