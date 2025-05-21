import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateBulkSuppliers } from '@/hooks/use-suppliers';
import { toast } from 'sonner';
// Import the components
import { SampleCsvSection } from './bulk-supplier/SampleCsvSection';
import { UploadArea } from './bulk-supplier/UploadArea';
import { CsvPasteArea } from './bulk-supplier/CsvPasteArea';
import { ImportButton } from './bulk-supplier/ImportButton';
export function BulkSupplierUpload() {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [csvText, setCsvText] = useState('');
    const [activeTab, setActiveTab] = useState('upload');
    const { mutate: createBulkSuppliers } = useCreateBulkSuppliers();
    const handleSubmit = async () => {
        try {
            setIsUploading(true);
            let content;
            if (activeTab === 'upload') {
                if (!file) {
                    toast.error('Please select a CSV file');
                    setIsUploading(false);
                    return;
                }
                content = await file.text();
            }
            else {
                if (!csvText.trim()) {
                    toast.error('Please paste CSV content');
                    setIsUploading(false);
                    return;
                }
                content = csvText;
            }
            // Process the CSV
            createBulkSuppliers({ csvData: content }, {
                onSuccess: (result) => {
                    toast.success(`Successfully imported ${result.count} suppliers`);
                    setFile(null);
                    setCsvText('');
                    setIsUploading(false);
                },
                onError: (error) => {
                    toast.error(`Error importing suppliers: ${error.message || 'Unknown error'}`);
                    setIsUploading(false);
                }
            });
        }
        catch (error) {
            toast.error(`Error processing CSV: ${error.message || 'Unknown error'}`);
            setIsUploading(false);
        }
    };
    const isSubmitDisabled = (activeTab === 'upload' && !file) ||
        (activeTab === 'paste' && !csvText.trim());
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Bulk Supplier Import" }), _jsx(CardDescription, { children: "Import multiple suppliers at once by uploading a CSV file or pasting CSV data" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsx(SampleCsvSection, {}), _jsxs(Tabs, { value: activeTab, onValueChange: (v) => setActiveTab(v), children: [_jsxs(TabsList, { className: "grid grid-cols-2 w-[400px] mx-auto", children: [_jsx(TabsTrigger, { value: "upload", children: "Upload CSV" }), _jsx(TabsTrigger, { value: "paste", children: "Paste CSV" })] }), _jsx(TabsContent, { value: "upload", className: "mt-4", children: _jsx(UploadArea, { onFileSelected: setFile, isUploading: isUploading, selectedFile: file }) }), _jsx(TabsContent, { value: "paste", className: "mt-4", children: _jsx(CsvPasteArea, { value: csvText, onChange: setCsvText, isUploading: isUploading }) })] })] }), _jsx(CardFooter, { children: _jsx(ImportButton, { onSubmit: handleSubmit, isUploading: isUploading, isDisabled: isSubmitDisabled }) })] }));
}
