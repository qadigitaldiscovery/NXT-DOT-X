import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { SuppliersTable } from '@/components/suppliers/SuppliersTable';
import { useSuppliers } from '@/hooks/use-suppliers';
import { PlusCircle, RefreshCw, Upload } from 'lucide-react';
import { BulkSupplierUpload } from '@/components/uploads/BulkSupplierUpload';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { SupplierManagementLayout } from '@/components/layout/SupplierManagementLayout';
const SupplierDirectoryPageContent = () => {
    const navigate = useNavigate();
    const { refetch } = useSuppliers();
    const [showBulkUploadDialog, setShowBulkUploadDialog] = useState(false);
    const handleAddSupplier = () => {
        navigate('/supplier-management/new');
    };
    const handleRefresh = () => {
        refetch();
        toast.success("Supplier data refreshed");
    };
    const handleBulkUpload = () => {
        setShowBulkUploadDialog(true);
    };
    const handleEdit = (id) => {
        navigate(`/supplier-management/${id}`);
    };
    const handleDelete = (id) => {
        // In a real implementation, this would open a confirmation dialog
        toast.info(`Would delete supplier with ID: ${id}`);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Supplier Directory" }), _jsx("p", { className: "text-muted-foreground mt-2", children: "Manage your supplier information and relationships" })] }), _jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", onClick: handleRefresh, className: "flex items-center gap-1", children: [_jsx(RefreshCw, { className: "h-4 w-4" }), "Refresh"] }), _jsxs(Button, { variant: "outline", onClick: handleBulkUpload, className: "flex items-center gap-1", children: [_jsx(Upload, { className: "h-4 w-4" }), "Bulk Import"] })] }), _jsxs(Button, { onClick: handleAddSupplier, className: "flex items-center gap-1", children: [_jsx(PlusCircle, { className: "h-4 w-4" }), "Add Supplier"] })] }), _jsx(SuppliersTable, { onDelete: handleDelete, onEdit: handleEdit, onRefresh: handleRefresh }), _jsx(Dialog, { open: showBulkUploadDialog, onOpenChange: setShowBulkUploadDialog, children: _jsxs(DialogContent, { className: "max-w-md", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Bulk Supplier Import" }) }), _jsx(BulkSupplierUpload, {})] }) })] }));
};
const SupplierDirectoryPage = () => {
    return (_jsx(SupplierManagementLayout, { children: _jsx(SupplierDirectoryPageContent, {}) }));
};
export default SupplierDirectoryPage;
