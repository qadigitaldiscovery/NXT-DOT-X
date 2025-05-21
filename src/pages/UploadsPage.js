import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupplierUploadsTable } from '@/components/uploads/SupplierUploadsTable';
import { FileUploadForm } from '@/components/uploads/FileUploadForm';
import { BulkSupplierUpload } from '@/components/uploads/BulkSupplierUpload';
export default function UploadsPage() {
    const [activeTab, setActiveTab] = useState('recent');
    const [refreshKey, setRefreshKey] = useState(0);
    const handleUploadComplete = () => {
        setActiveTab('recent');
        setRefreshKey(prev => prev + 1);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "File Uploads" }), _jsx("p", { className: "text-muted-foreground", children: "Manage supplier cost file uploads and import suppliers" })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "recent", children: "Recent Uploads" }), _jsx(TabsTrigger, { value: "upload-new", children: "Upload Cost File" }), _jsx(TabsTrigger, { value: "holding-bucket", children: "Holding Bucket" }), _jsx(TabsTrigger, { value: "bulk-suppliers", children: "Bulk Supplier Import" })] }), _jsx(TabsContent, { value: "recent", className: "pt-4", children: _jsx(SupplierUploadsTable, {}, `uploads-${refreshKey}`) }), _jsx(TabsContent, { value: "upload-new", className: "pt-4", children: _jsx("div", { className: "max-w-md mx-auto", children: _jsx(FileUploadForm, { onUploadComplete: handleUploadComplete, allowHoldingBucket: true }) }) }), _jsx(TabsContent, { value: "holding-bucket", className: "pt-4", children: _jsx(SupplierUploadsTable, { supplierId: "holding" }, `holding-${refreshKey}`) }), _jsx(TabsContent, { value: "bulk-suppliers", className: "pt-4", children: _jsx("div", { className: "max-w-md mx-auto", children: _jsx(BulkSupplierUpload, {}) }) })] })] }));
}
