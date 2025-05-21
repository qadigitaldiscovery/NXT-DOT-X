import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSupplier } from '@/hooks/use-suppliers';
import { CostsList } from '@/components/costs/CostsList';
import { SupplierUploadsTable } from '@/components/uploads/SupplierUploadsTable';
import { FileUploadForm } from '@/components/uploads/FileUploadForm';
import { Skeleton } from '@/components/ui/skeleton';
export default function SupplierCostsPage() {
    const { id } = useParams();
    const { data: supplier, isLoading } = useSupplier(id);
    const [activeTab, setActiveTab] = useState('costs');
    const [refreshKey, setRefreshKey] = useState(0);
    const handleUploadComplete = () => {
        setActiveTab('uploads');
        setRefreshKey(prev => prev + 1);
    };
    if (isLoading) {
        return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Skeleton, { className: "h-8 w-64 mb-2" }), _jsx(Skeleton, { className: "h-4 w-96" })] }), _jsx(Skeleton, { className: "h-[400px] w-full" })] }));
    }
    if (!supplier) {
        return (_jsx("div", { className: "space-y-6", children: _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Supplier Not Found" }), _jsx("p", { className: "text-muted-foreground", children: "The supplier you're looking for could not be found." })] }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: supplier.name }), _jsxs("p", { className: "text-muted-foreground", children: ["Manage cost data and file uploads for ", supplier.name] })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "costs", children: "Costs" }), _jsx(TabsTrigger, { value: "uploads", children: "Uploads" }), _jsx(TabsTrigger, { value: "upload-new", children: "Upload New File" })] }), _jsx(TabsContent, { value: "costs", className: "pt-4", children: _jsx(CostsList, { supplier: supplier }) }), _jsx(TabsContent, { value: "uploads", className: "pt-4", children: _jsx(SupplierUploadsTable, { supplier: supplier }, `uploads-${refreshKey}`) }), _jsx(TabsContent, { value: "upload-new", className: "pt-4", children: _jsx("div", { className: "max-w-md mx-auto", children: _jsx(FileUploadForm, { supplierId: supplier.id, onUploadComplete: handleUploadComplete }) }) })] })] }));
}
