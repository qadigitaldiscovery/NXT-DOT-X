import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { UploadCloud, File, AlertCircle } from 'lucide-react';
import { isZipFile, uploadDocument } from '@/utils/upload-service';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { tryUseEdgeFunction } from '@/utils/api-clients/common/edge-function-utils';
export const DocumentUpload = ({ categories, onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [type, setType] = useState('other');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [processingMessage, setProcessingMessage] = useState('');
    const [uploadError, setUploadError] = useState(null);
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setUploadError(null);
            // Auto-populate title from filename if empty
            if (!title) {
                setTitle(file.name.replace(/\.[^/.]+$/, ""));
            }
            // Auto-detect document type
            const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
            if (fileExt === 'md' || fileExt === 'markdown') {
                setType('markdown');
            }
            else if (fileExt === 'pdf') {
                setType('pdf');
            }
            else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExt)) {
                setType('image');
            }
            else if (['txt', 'csv', 'html'].includes(fileExt)) {
                setType('text');
            }
            else {
                setType('other');
            }
        }
    };
    const prepareBucketIfNeeded = async () => {
        try {
            setProcessingMessage("Preparing storage bucket...");
            // Call our edge function to ensure the bucket exists
            const result = await tryUseEdgeFunction('storage', {
                action: 'create-bucket',
                bucketName: 'documents'
            }, {
                timeout: 10000 // 10 second timeout
            });
            if (result?.success) {
                console.log("Storage bucket prepared successfully:", result.message);
                return true;
            }
            else {
                console.warn("Storage bucket preparation may have failed.");
                // Continue anyway and let the upload process handle any further errors
                return true;
            }
        }
        catch (error) {
            console.error("Error preparing bucket:", error);
            // Return true anyway to allow the upload to attempt to proceed
            return true;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile || !title || !categoryId || !author) {
            toast('Please fill in all required fields');
            return;
        }
        setIsUploading(true);
        setUploadProgress(0);
        setUploadError(null);
        try {
            // First make sure the bucket exists
            await prepareBucketIfNeeded();
            // Then attempt the upload
            setProcessingMessage("Uploading document...");
            const success = await uploadDocument({
                file: selectedFile,
                documentName: title,
                documentType: categoryId,
                onProgress: setUploadProgress,
                onProcessingMessage: setProcessingMessage
            });
            if (success) {
                // Call the onFileUpload prop to let the parent component know
                onFileUpload(selectedFile, type, {
                    title,
                    description,
                    author,
                    categoryId
                });
                resetForm();
                return;
            }
            else {
                // If direct upload failed but no error was thrown, show a generic error
                setUploadError("Upload failed. Please try again later.");
            }
        }
        catch (error) {
            console.error('Error uploading document:', error);
            setUploadError(error instanceof Error ? error.message : 'Unknown error');
            toast('Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
        finally {
            setIsUploading(false);
            setProcessingMessage('');
        }
    };
    const resetForm = () => {
        setSelectedFile(null);
        setTitle('');
        setDescription('');
        setAuthor('');
        setCategoryId('');
        setType('other');
        setUploadProgress(0);
        setUploadError(null);
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "title", className: "text-sm font-medium", children: ["Document Title ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "title", value: title, onChange: e => setTitle(e.target.value), placeholder: "Enter document title", disabled: isUploading, required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "category", className: "text-sm font-medium", children: ["Category ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs(Select, { value: categoryId, onValueChange: setCategoryId, disabled: isUploading, required: true, children: [_jsx(SelectTrigger, { id: "category", children: _jsx(SelectValue, { placeholder: "Select a category" }) }), _jsx(SelectContent, { children: categories.map(category => (_jsx(SelectItem, { value: category.id, children: category.name }, category.id))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "author", className: "text-sm font-medium", children: ["Author ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "author", value: author, onChange: e => setAuthor(e.target.value), placeholder: "Enter author name", disabled: isUploading, required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "description", className: "text-sm font-medium", children: "Description" }), _jsx(Input, { id: "description", value: description, onChange: e => setDescription(e.target.value), placeholder: "Enter document description (optional)", disabled: isUploading })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "file", className: "text-sm font-medium", children: ["Document File ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("div", { className: "border-2 border-dashed rounded-md p-4 text-center", children: [_jsx(Input, { id: "file", type: "file", onChange: handleFileChange, className: "hidden", disabled: isUploading, required: true }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "flex justify-center", children: _jsx(File, { className: "h-10 w-10 text-gray-400" }) }), _jsx("p", { className: "text-sm text-gray-600", children: selectedFile
                                            ? `Selected: ${selectedFile.name} (${Math.round(selectedFile.size / 1024)} KB)`
                                            : 'Drag and drop or click to select' }), _jsx(Button, { type: "button", variant: "outline", onClick: () => document.getElementById('file')?.click(), disabled: isUploading, children: "Select File" })] })] })] }), uploadError && (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: uploadError })] })), selectedFile && isZipFile(selectedFile) && (_jsx("div", { className: "bg-blue-50 p-3 rounded-md border border-blue-200", children: _jsx("p", { className: "text-sm text-blue-700", children: "ZIP archive detected. Contents will be automatically extracted and stored as individual documents." }) })), isUploading && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-xs text-gray-500", children: [_jsx("span", { children: processingMessage || 'Uploading...' }), _jsxs("span", { children: [uploadProgress, "%"] })] }), _jsx("div", { className: "w-full bg-gray-200 h-2 rounded-full overflow-hidden", children: _jsx("div", { className: "bg-blue-600 h-2", style: { width: `${uploadProgress}%` } }) })] })), _jsxs(Button, { type: "submit", disabled: !selectedFile || isUploading, className: "w-full", children: [_jsx(UploadCloud, { className: "mr-2 h-4 w-4" }), isUploading ? 'Uploading...' : 'Upload Document'] })] }));
};
