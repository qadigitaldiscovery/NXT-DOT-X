import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileDown, CheckCircle2, Clock, FileUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
// Mock data for export history
const exportHistoryData = [
    {
        id: 1,
        name: "Full Product Export",
        date: "2025-05-02",
        status: "Completed",
        records: 2543,
        type: "ERP"
    },
    {
        id: 2,
        name: "Price Update Export",
        date: "2025-05-01",
        status: "Completed",
        records: 185,
        type: "Website"
    },
    {
        id: 3,
        name: "New Products Export",
        date: "2025-04-28",
        status: "Completed",
        records: 42,
        type: "ERP"
    },
];
// Mock data for exportable fields
const exportableFields = [
    { id: "sku", name: "SKU", default: true },
    { id: "name", name: "Product Name", default: true },
    { id: "supplier", name: "Supplier", default: true },
    { id: "cost", name: "Cost Price", default: true },
    { id: "discount", name: "Discount", default: true },
    { id: "retail", name: "Retail Price", default: true },
    { id: "margin", name: "Margin", default: false },
    { id: "competitorPrice", name: "Competitor Price", default: false },
    { id: "category", name: "Category", default: false },
    { id: "stock", name: "Stock Level", default: false },
    { id: "lastUpdated", name: "Last Updated", default: false },
    { id: "upc", name: "UPC/EAN", default: false },
];
// Mock export destinations
const exportDestinations = [
    { id: "erp", name: "ERP System" },
    { id: "website", name: "E-commerce Website" },
    { id: "csv", name: "CSV File" },
    { id: "excel", name: "Excel File" },
];
const ExportData = () => {
    const [selectedFields, setSelectedFields] = useState(exportableFields.filter(field => field.default).map(field => field.id));
    const [selectedDestination, setSelectedDestination] = useState("erp");
    const [exportName, setExportName] = useState("Product Data Export");
    const [isExporting, setIsExporting] = useState(false);
    const [progress, setProgress] = useState(0);
    const { toast } = useToast();
    const handleFieldToggle = (fieldId) => {
        setSelectedFields(prev => prev.includes(fieldId)
            ? prev.filter(id => id !== fieldId)
            : [...prev, fieldId]);
    };
    const handleSelectAllFields = () => {
        setSelectedFields(exportableFields.map(field => field.id));
    };
    const handleClearFields = () => {
        setSelectedFields([]);
    };
    const handleExport = () => {
        if (selectedFields.length === 0) {
            toast.error({
                title: "Export Error",
                description: "Please select at least one field to export."
            });
            return;
        }
        setIsExporting(true);
        setProgress(0);
        // Simulate export progress
        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + 10;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsExporting(false);
                        toast.success({
                            title: "Export Complete",
                            description: `Your export "${exportName}" has been completed successfully.`
                        });
                    }, 500);
                }
                return newProgress;
            });
        }, 400);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Export Data" }), _jsxs(Tabs, { defaultValue: "new-export", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2 mb-4", children: [_jsx(TabsTrigger, { value: "new-export", children: "Create Export" }), _jsx(TabsTrigger, { value: "export-history", children: "Export History" })] }), _jsx(TabsContent, { value: "new-export", className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Create New Export" }), _jsx(CardDescription, { children: "Select data fields and export destination" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-base", children: "Export Name" }), _jsx("input", { type: "text", className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2", placeholder: "Enter export name", value: exportName, onChange: (e) => setExportName(e.target.value) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx(Label, { className: "text-base", children: "Select Fields to Export" }), _jsxs("div", { className: "space-x-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: handleSelectAllFields, children: "Select All" }), _jsx(Button, { variant: "outline", size: "sm", onClick: handleClearFields, children: "Clear" })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mt-2", children: exportableFields.map(field => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: field.id, checked: selectedFields.includes(field.id), onCheckedChange: () => handleFieldToggle(field.id) }), _jsx(Label, { htmlFor: field.id, children: field.name })] }, field.id))) })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-base", htmlFor: "export-destination", children: "Export Destination" }), _jsxs(Select, { value: selectedDestination, onValueChange: setSelectedDestination, children: [_jsx(SelectTrigger, { className: "w-full md:w-1/2 mt-2", children: _jsx(SelectValue, { placeholder: "Select export destination" }) }), _jsx(SelectContent, { children: exportDestinations.map(destination => (_jsx(SelectItem, { value: destination.id, children: destination.name }, destination.id))) })] })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-base", children: "Options" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "include-changed" }), _jsx(Label, { htmlFor: "include-changed", children: "Only include changed prices" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "include-new", defaultChecked: true }), _jsx(Label, { htmlFor: "include-new", children: "Include new products" })] }), selectedDestination === "erp" && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "update-erp", defaultChecked: true }), _jsx(Label, { htmlFor: "update-erp", children: "Auto-update ERP system" })] })), selectedDestination === "website" && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "publish-immediately" }), _jsx(Label, { htmlFor: "publish-immediately", children: "Publish immediately" })] }))] })] }), isExporting ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-base", children: "Export Progress" }), _jsx(Progress, { value: progress, className: "mt-2" })] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Exporting ", selectedFields.length, " fields to ", exportDestinations.find(d => d.id === selectedDestination)?.name, "..."] })] })) : (_jsx("div", { className: "flex justify-end", children: _jsxs(Button, { onClick: handleExport, children: [_jsx(FileDown, { className: "mr-2 h-4 w-4" }), "Generate Export"] }) }))] }) })] }) }), _jsx(TabsContent, { value: "export-history", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Export History" }), _jsx(CardDescription, { children: "Previously generated exports" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-6", children: exportHistoryData.map(export_ => (_jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-md", children: [_jsxs("div", { className: "space-y-1 mb-4 md:mb-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "font-medium", children: export_.name }), export_.status === "Completed" ? (_jsx(CheckCircle2, { className: "h-4 w-4 text-green-500" })) : (_jsx(Clock, { className: "h-4 w-4 text-amber-500" }))] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [export_.date, " \u00B7 ", export_.records, " records \u00B7 ", export_.type] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(FileUp, { className: "mr-1 h-4 w-4" }), "View Log"] }), _jsxs(Button, { size: "sm", children: [_jsx(Download, { className: "mr-1 h-4 w-4" }), "Download"] })] })] }, export_.id))) }) })] }) })] })] }));
};
export default ExportData;
