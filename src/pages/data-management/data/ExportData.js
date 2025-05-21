import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileDown, FileText, Table, FileSpreadsheet, Settings, Calendar, Clock, Plus, AlertCircle, RefreshCw } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExcelService } from '@/utils/excel';
const ExportData = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [exporting, setExporting] = useState(null);
    const [activeTab, setActiveTab] = useState('standard');
    // Simulate loading data
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 600));
            }
            catch (err) {
                console.error('Error loading export configurations:', err);
                setError('Failed to load export configurations. Please try again later.');
            }
            finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);
    // Handle download action
    const handleDownload = (exportType) => {
        try {
            setExporting(exportType);
            // Sample data for demonstration - in a real app this would come from an API
            const sampleData = Array(10).fill(null).map((_, i) => ({
                id: i + 1,
                name: `Item ${i + 1}`,
                category: ['Category A', 'Category B', 'Category C'][i % 3],
                price: Math.round(Math.random() * 100 + 10),
                inStock: Math.random() > 0.3,
                lastUpdated: new Date().toISOString().split('T')[0]
            }));
            // Export to Excel using ExcelService
            ExcelService.exportToExcel(sampleData, `${exportType}-${new Date().toISOString().slice(0, 10)}`)
                .then(() => {
                toast.success(`${exportType} exported successfully`);
                setExporting(null);
            })
                .catch(err => {
                console.error(`Error exporting ${exportType}:`, err);
                toast.error(`Failed to export ${exportType}. Please try again.`);
                setExporting(null);
            });
        }
        catch (err) {
            toast.error(`Failed to export ${exportType}. Please try again.`);
            console.error(`Error exporting ${exportType}:`, err);
            setExporting(null);
        }
    };
    // Handle custom export
    const handleCustomExport = () => {
        try {
            setExporting('custom');
            // Generate custom export data based on selected fields
            // This is a simplified example - in a real app, this would be dynamic
            const customData = Array(5).fill(null).map((_, i) => ({
                name: `Custom Item ${i + 1}`,
                contact: `contact${i + 1}@example.com`,
                email: `info${i + 1}@example.com`,
                phone: `+1 (555) ${100 + i * 111}`,
            }));
            // Export to Excel using ExcelService
            ExcelService.exportToExcel(customData, `custom-export-${new Date().toISOString().slice(0, 10)}`)
                .then(() => {
                toast.success('Custom export generated successfully');
                setExporting(null);
            })
                .catch(err => {
                console.error('Error generating custom export:', err);
                toast.error('Failed to generate custom export. Please try again.');
                setExporting(null);
            });
        }
        catch (err) {
            toast.error('Failed to generate custom export. Please try again.');
            console.error('Error generating custom export:', err);
            setExporting(null);
        }
    };
    // Handle schedule creation
    const handleCreateSchedule = () => {
        try {
            toast.success('New schedule created successfully');
        }
        catch (err) {
            toast.error('Failed to create schedule. Please try again.');
            console.error('Error creating schedule:', err);
        }
    };
    // Handle refresh
    const handleRefresh = async () => {
        try {
            setIsLoading(true);
            setError(null);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800));
            toast.success('Export configurations refreshed');
        }
        catch (err) {
            setError('Failed to refresh export configurations. Please try again.');
            toast.error('Failed to refresh data');
            console.error('Error refreshing data:', err);
        }
        finally {
            setIsLoading(false);
        }
    };
    // Loading state
    if (isLoading) {
        return (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("div", { className: "animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" }) }));
    }
    return (_jsxs("div", { className: "container mx-auto py-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Export Data" }), _jsx("p", { className: "text-gray-600", children: "Export and download data from the system" })] }), _jsxs(Button, { variant: "outline", onClick: handleRefresh, children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4" }), "Refresh"] })] }), error && (_jsxs(Alert, { variant: "destructive", className: "mb-6", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: error })] })), _jsxs(Tabs, { defaultValue: "standard", className: "w-full", value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 mb-6", children: [_jsx(TabsTrigger, { value: "standard", children: "Standard Exports" }), _jsx(TabsTrigger, { value: "custom", children: "Custom Exports" }), _jsx(TabsTrigger, { value: "scheduled", children: "Scheduled Exports" })] }), _jsx(TabsContent, { value: "standard", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(FileText, { className: "h-6 w-6 mr-2 text-blue-500" }), _jsx(CardTitle, { children: "Supplier Data" })] }), _jsx(CardDescription, { children: "Export complete supplier directory with details" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "supplier-format", children: "Export Format" }), _jsxs(Select, { defaultValue: "excel", children: [_jsx(SelectTrigger, { id: "supplier-format", children: _jsx(SelectValue, { placeholder: "Select format" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "excel", children: "Excel (.xlsx)" }), _jsx(SelectItem, { value: "csv", children: "CSV" }), _jsx(SelectItem, { value: "pdf", children: "PDF" })] })] })] }), _jsx(Button, { className: "w-full", onClick: () => handleDownload('Supplier Data'), disabled: exporting === 'Supplier Data', children: exporting === 'Supplier Data' ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4 animate-spin" }), " Exporting..."] })) : (_jsxs(_Fragment, { children: [_jsx(FileDown, { className: "mr-2 h-4 w-4" }), " Download"] })) })] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(Table, { className: "h-6 w-6 mr-2 text-green-500" }), _jsx(CardTitle, { children: "Pricing Data" })] }), _jsx(CardDescription, { children: "Export pricing data and history" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "price-format", children: "Export Format" }), _jsxs(Select, { defaultValue: "excel", children: [_jsx(SelectTrigger, { id: "price-format", children: _jsx(SelectValue, { placeholder: "Select format" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "excel", children: "Excel (.xlsx)" }), _jsx(SelectItem, { value: "csv", children: "CSV" }), _jsx(SelectItem, { value: "pdf", children: "PDF" })] })] })] }), _jsx(Button, { className: "w-full", onClick: () => handleDownload('Pricing Data'), disabled: exporting === 'Pricing Data', children: exporting === 'Pricing Data' ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4 animate-spin" }), " Exporting..."] })) : (_jsxs(_Fragment, { children: [_jsx(FileDown, { className: "mr-2 h-4 w-4" }), " Download"] })) })] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx(FileSpreadsheet, { className: "h-6 w-6 mr-2 text-purple-500" }), _jsx(CardTitle, { children: "Cost Analysis Report" })] }), _jsx(CardDescription, { children: "Export cost analysis and metrics" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "cost-format", children: "Export Format" }), _jsxs(Select, { defaultValue: "excel", children: [_jsx(SelectTrigger, { id: "cost-format", children: _jsx(SelectValue, { placeholder: "Select format" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "excel", children: "Excel (.xlsx)" }), _jsx(SelectItem, { value: "csv", children: "CSV" }), _jsx(SelectItem, { value: "pdf", children: "PDF" })] })] })] }), _jsx(Button, { className: "w-full", onClick: () => handleDownload('Cost Analysis Report'), disabled: exporting === 'Cost Analysis Report', children: exporting === 'Cost Analysis Report' ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4 animate-spin" }), " Exporting..."] })) : (_jsxs(_Fragment, { children: [_jsx(FileDown, { className: "mr-2 h-4 w-4" }), " Download"] })) })] }) })] })] }) }), _jsx(TabsContent, { value: "custom", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Custom Data Export" }), _jsx(CardDescription, { children: "Configure a custom data export with specific fields and filters" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "data-source", children: "Data Source" }), _jsxs(Select, { defaultValue: "suppliers", children: [_jsx(SelectTrigger, { id: "data-source", children: _jsx(SelectValue, { placeholder: "Select data source" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "suppliers", children: "Suppliers" }), _jsx(SelectItem, { value: "customers", children: "Customers" }), _jsx(SelectItem, { value: "pricing", children: "Pricing" }), _jsx(SelectItem, { value: "costs", children: "Cost Data" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium mb-3", children: "Select Fields" }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "field1" }), _jsx(Label, { htmlFor: "field1", children: "ID" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "field2", defaultChecked: true }), _jsx(Label, { htmlFor: "field2", children: "Name" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "field3", defaultChecked: true }), _jsx(Label, { htmlFor: "field3", children: "Contact" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "field4", defaultChecked: true }), _jsx(Label, { htmlFor: "field4", children: "Email" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "field5", defaultChecked: true }), _jsx(Label, { htmlFor: "field5", children: "Phone" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "field6" }), _jsx(Label, { htmlFor: "field6", children: "Address" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "field7" }), _jsx(Label, { htmlFor: "field7", children: "Status" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "field8" }), _jsx(Label, { htmlFor: "field8", children: "Created Date" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "field9" }), _jsx(Label, { htmlFor: "field9", children: "Last Updated" })] })] })] }), _jsxs("div", { className: "flex space-x-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx(Label, { htmlFor: "export-format", children: "Export Format" }), _jsxs(Select, { defaultValue: "excel", children: [_jsx(SelectTrigger, { id: "export-format", children: _jsx(SelectValue, { placeholder: "Select format" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "excel", children: "Excel (.xlsx)" }), _jsx(SelectItem, { value: "csv", children: "CSV" }), _jsx(SelectItem, { value: "pdf", children: "PDF" }), _jsx(SelectItem, { value: "json", children: "JSON" })] })] })] }), _jsxs("div", { className: "flex-1", children: [_jsx(Label, { htmlFor: "include-headers", children: "Include Headers" }), _jsxs(Select, { defaultValue: "yes", children: [_jsx(SelectTrigger, { id: "include-headers", children: _jsx(SelectValue, { placeholder: "Include headers" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "yes", children: "Yes" }), _jsx(SelectItem, { value: "no", children: "No" })] })] })] })] }), _jsxs("div", { className: "flex space-x-4", children: [_jsx(Button, { className: "flex-1", variant: "outline", onClick: () => toast.info('Export configuration reset'), children: "Reset" }), _jsx(Button, { className: "flex-1", onClick: handleCustomExport, disabled: exporting === 'custom', children: exporting === 'custom' ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4 animate-spin" }), " Generating..."] })) : (_jsxs(_Fragment, { children: [_jsx(FileDown, { className: "mr-2 h-4 w-4" }), " Generate & Download"] })) })] })] }) })] }) }), _jsx(TabsContent, { value: "scheduled", children: _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx(CardTitle, { children: "Scheduled Exports" }), _jsx(CardDescription, { children: "Configure automated exports on a schedule" })] }), _jsxs(Button, { size: "sm", onClick: handleCreateSchedule, children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), " New Schedule"] })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border rounded-md", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "bg-blue-100 p-2 rounded-md", children: _jsx(Clock, { className: "h-5 w-5 text-blue-700" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("h3", { className: "font-medium", children: "Weekly Supplier Export" }), _jsx("p", { className: "text-sm text-gray-500", children: "Every Monday at 8:00 AM" })] })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => toast.info('Edit schedule options'), children: _jsx(Settings, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "destructive", size: "sm", onClick: () => toast.success('Schedule disabled'), children: "Disable" })] })] }), _jsxs("div", { className: "flex items-center justify-between p-4 border rounded-md", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "bg-green-100 p-2 rounded-md", children: _jsx(Calendar, { className: "h-5 w-5 text-green-700" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("h3", { className: "font-medium", children: "Monthly Financial Report" }), _jsx("p", { className: "text-sm text-gray-500", children: "1st of every month at 7:00 AM" })] })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => toast.info('Edit schedule options'), children: _jsx(Settings, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "destructive", size: "sm", onClick: () => toast.success('Schedule disabled'), children: "Disable" })] })] }), _jsxs("div", { className: "flex items-center justify-between p-4 border rounded-md", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "bg-orange-100 p-2 rounded-md", children: _jsx(Calendar, { className: "h-5 w-5 text-orange-700" }) }), _jsxs("div", { className: "ml-4", children: [_jsx("h3", { className: "font-medium", children: "Quarterly Cost Analysis" }), _jsx("p", { className: "text-sm text-gray-500", children: "Last day of quarter at 11:00 PM" })] })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => toast.info('Edit schedule options'), children: _jsx(Settings, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "destructive", size: "sm", onClick: () => toast.success('Schedule disabled'), children: "Disable" })] })] })] }) })] }) })] })] }));
};
export default ExportData;
