import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UploadCloud, FileText, Archive } from 'lucide-react';
import { isZipFile, uploadDocument } from '@/utils/upload-service';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
// Document types
const DOCUMENT_TYPES = [
    { id: 'contract', name: 'Supplier Contract' },
    { id: 'price_list', name: 'Price List' },
    { id: 'specification', name: 'Product Specifications' },
    { id: 'certification', name: 'Quality Certification' },
    { id: 'invoice', name: 'Invoice' },
    { id: 'other', name: 'Other Document' },
];
export function DocumentUploadForm({ supplierId, onUploadComplete }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [documentName, setDocumentName] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [processingMessage, setProcessingMessage] = useState('');
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            // Auto-populate name if empty
            if (!documentName) {
                setDocumentName(file.name.replace(/\.[^/.]+$/, ""));
            }
            // Log file selection for debugging
            console.log(`File selected: ${file.name}, size: ${file.size} bytes, type: ${file.type}`);
        }
    };
    const handleDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === 'dragenter' || event.type === 'dragover') {
            setDragActive(true);
        }
        else if (event.type === 'dragleave') {
            setDragActive(false);
        }
    };
    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            const file = event.dataTransfer.files[0];
            setSelectedFile(file);
            // Auto-populate name if empty
            if (!documentName) {
                setDocumentName(file.name.replace(/\.[^/.]+$/, ""));
            }
            // Log file drop for debugging
            console.log(`File dropped: ${file.name}, size: ${file.size} bytes, type: ${file.type}`);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile || !documentName || !documentType) {
            toast.error("Please fill all required fields");
            return;
        }
        setIsUploading(true);
        setUploadProgress(0);
        try {
            console.log("Starting upload process...");
            const success = await uploadDocument({
                file: selectedFile,
                documentName,
                documentType,
                expiryDate,
                onProgress: setUploadProgress,
                onProcessingMessage: setProcessingMessage
            });
            if (success) {
                // Reset form
                setSelectedFile(null);
                setDocumentName('');
                setDocumentType('');
                setExpiryDate('');
                if (onUploadComplete) {
                    onUploadComplete();
                }
            }
        }
        catch (error) {
            console.error('Upload error:', error);
            toast.error(error.message || 'Unknown error');
        }
        finally {
            setIsUploading(false);
            setProcessingMessage("");
        }
    };
    const removeFile = () => {
        setSelectedFile(null);
        setUploadProgress(0);
        setProcessingMessage("");
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Upload Document" }), _jsx(CardDescription, { children: "Upload documents, specifications, or ZIP archives containing multiple files" })] }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "document-name", className: "required", children: "Document Name" }), _jsx(Input, { id: "document-name", type: "text", value: documentName, onChange: (e) => setDocumentName(e.target.value), placeholder: "Enter document name", required: true, disabled: isUploading })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "document-type", className: "required", children: "Document Type" }), _jsxs(Select, { value: documentType, onValueChange: setDocumentType, disabled: isUploading, required: true, children: [_jsx(SelectTrigger, { id: "document-type", children: _jsx(SelectValue, { placeholder: "Select document type" }) }), _jsx(SelectContent, { children: DOCUMENT_TYPES.map((type) => (_jsx(SelectItem, { value: type.id, children: type.name }, type.id))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "expiry-date", children: "Expiry Date (if applicable)" }), _jsx(Input, { id: "expiry-date", type: "date", value: expiryDate, onChange: (e) => setExpiryDate(e.target.value), disabled: isUploading })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "document-file", className: "required", children: "Upload File" }), _jsxs("div", { className: `border-2 border-dashed rounded-lg p-6 ${dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'} transition-colors`, onDragEnter: handleDrag, onDragOver: handleDrag, onDragLeave: handleDrag, onDrop: handleDrop, children: [_jsxs("div", { className: "flex flex-col items-center justify-center text-center", children: [selectedFile && isZipFile(selectedFile) ? (_jsx(Archive, { className: "h-10 w-10 text-amber-500 mb-2" })) : (_jsx(FileText, { className: "h-10 w-10 text-muted-foreground mb-2" })), _jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Drag and drop your document here, or click to browse" }), _jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Supports PDF, Word, Excel, ZIP and image files" }), _jsx("input", { id: "document-file", name: "file", type: "file", className: "hidden", accept: ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip", onChange: handleFileChange, required: true, disabled: isUploading }), _jsx(Button, { type: "button", variant: "outline", size: "sm", disabled: isUploading, onClick: () => document.getElementById('document-file')?.click(), children: "Select File" })] }), selectedFile && (_jsx("div", { className: "mt-4 p-2 bg-muted rounded-md", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-medium", children: "Selected:" }), selectedFile.name, _jsxs("span", { className: "text-muted-foreground", children: ["(", Math.round(selectedFile.size / 1024), " KB)"] }), isZipFile(selectedFile) && (_jsx("span", { className: "text-amber-600 text-xs font-medium px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900 dark:text-amber-300", children: "ZIP" }))] }), _jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: removeFile, disabled: isUploading, children: "Remove" })] }) }))] })] }), selectedFile && isZipFile(selectedFile) && (_jsxs(Alert, { className: "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-900", children: [_jsx(InfoIcon, { className: "h-4 w-4 text-blue-600 dark:text-blue-400" }), _jsx(AlertTitle, { className: "text-blue-800 dark:text-blue-300", children: "ZIP Archive Detected" }), _jsx(AlertDescription, { className: "text-blue-700 dark:text-blue-400", children: "The contents of this ZIP file will be automatically extracted and registered as individual documents after upload." })] })), isUploading && (_jsxs("div", { className: "space-y-2 bg-slate-50 dark:bg-slate-800 p-3 rounded-md border", children: [_jsxs("div", { className: "flex justify-between text-sm mb-1", children: [_jsx("span", { children: processingMessage || "Uploading..." }), _jsxs("span", { children: [uploadProgress, "%"] })] }), _jsx("div", { className: "w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2", children: _jsx("div", { className: "bg-primary h-2 rounded-full transition-all duration-300 ease-in-out", style: { width: `${uploadProgress}%` } }) })] }))] }), _jsx(CardFooter, { children: _jsxs(Button, { type: "submit", className: "w-full", disabled: !selectedFile || !documentName || !documentType || isUploading, children: [_jsx(UploadCloud, { className: "h-4 w-4 mr-2" }), isUploading ? 'Uploading...' : 'Upload Document'] }) })] })] }));
}
