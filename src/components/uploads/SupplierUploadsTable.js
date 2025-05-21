import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { useSupplierUploads, useProcessSupplierUpload, useDeleteSupplierUpload, useAssignUploadToSupplier } from '@/hooks/use-supplier-uploads';
import { useSuppliers } from '@/hooks/use-suppliers';
import { UploadsTableRow } from './UploadsTableRow';
import { AssignUploadDialog } from './AssignUploadDialog';
export function SupplierUploadsTable({ supplier, supplierId }) {
    const [selectedUpload, setSelectedUpload] = useState(null);
    const [assignDialogOpen, setAssignDialogOpen] = useState(false);
    const [selectedSupplierId, setSelectedSupplierId] = useState("");
    const isHoldingBucket = supplierId === 'holding';
    const actualSupplierId = isHoldingBucket ? undefined : (supplier?.id || supplierId);
    // Pass options object correctly without additional parameters
    const { data: uploads = [], isLoading } = useSupplierUploads(isHoldingBucket ? { forAllocation: true } : undefined);
    const { data: suppliers = [] } = useSuppliers();
    const { mutate: processUpload } = useProcessSupplierUpload();
    const { mutate: deleteUpload } = useDeleteSupplierUpload();
    const { mutate: assignToSupplier } = useAssignUploadToSupplier();
    const handleDelete = (upload) => {
        if (window.confirm(`Are you sure you want to delete the file "${upload.file_name}"?`)) {
            deleteUpload(upload);
        }
    };
    const handleProcess = (upload) => {
        processUpload(upload);
    };
    const handleOpenAssignDialog = (upload) => {
        setSelectedUpload(upload);
        setSelectedSupplierId("");
        setAssignDialogOpen(true);
    };
    const handleAssignToSupplier = () => {
        if (selectedUpload && selectedSupplierId) {
            assignToSupplier({
                uploadId: selectedUpload.id,
                supplierId: selectedSupplierId
            }, {
                onSuccess: () => {
                    setAssignDialogOpen(false);
                    setSelectedUpload(null);
                    setSelectedSupplierId("");
                }
            });
        }
    };
    const title = isHoldingBucket
        ? "Holding Bucket (Unallocated Files)"
        : (supplier ? `${supplier.name} - Uploaded Files` : 'Recent Uploads');
    const description = isHoldingBucket
        ? "Files uploaded without a specific supplier that need to be allocated"
        : (supplier ? `Files uploaded for ${supplier.name}` : 'Recently uploaded supplier cost files');
    const showSupplierColumn = !supplier && !isHoldingBucket;
    return (_jsxs(_Fragment, { children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: title }), _jsx(CardDescription, { children: description })] }), _jsx(CardContent, { children: _jsx("div", { className: "rounded-md border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "File" }), showSupplierColumn && _jsx(TableHead, { children: "Supplier" }), _jsx(TableHead, { children: "Upload Date" }), _jsx(TableHead, { children: "Size" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Processed Rows" }), _jsx(TableHead, { children: "Errors" }), _jsx(TableHead, { className: "w-[80px]", children: "Actions" })] }) }), _jsx(TableBody, { children: isLoading ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: showSupplierColumn ? 8 : 7, className: "h-24 text-center", children: "Loading uploads..." }) })) : uploads.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: showSupplierColumn ? 8 : 7, className: "h-24 text-center text-muted-foreground", children: isHoldingBucket
                                                    ? 'No files in holding bucket'
                                                    : 'No file uploads found' }) })) : (uploads.map((upload) => (_jsx(UploadsTableRow, { upload: upload, showSupplierColumn: showSupplierColumn, isHoldingBucket: isHoldingBucket, onProcess: handleProcess, onDelete: handleDelete, onAssign: handleOpenAssignDialog }, upload.id)))) })] }) }) })] }), _jsx(AssignUploadDialog, { open: assignDialogOpen, onOpenChange: setAssignDialogOpen, selectedUpload: selectedUpload, suppliers: suppliers, selectedSupplierId: selectedSupplierId, onSupplierChange: setSelectedSupplierId, onAssign: handleAssignToSupplier })] }));
}
