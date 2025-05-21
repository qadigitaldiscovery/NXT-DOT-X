import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FileUploadInstructions } from './FileUploadInstructions';
export function DropZone({ onFileChange, selectedFile, isUploading }) {
    const [dragActive, setDragActive] = useState(false);
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
            onFileChange(event.dataTransfer.files[0]);
        }
    };
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            onFileChange(event.target.files[0]);
        }
    };
    return (_jsxs("div", { className: `border-2 border-dashed rounded-lg p-6 ${dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'} transition-colors`, onDragEnter: handleDrag, onDragOver: handleDrag, onDragLeave: handleDrag, onDrop: handleDrop, children: [_jsx(FileUploadInstructions, { isUploading: isUploading }), _jsx("input", { id: "file", name: "file", type: "file", className: "hidden", accept: "*/*", onChange: handleFileChange, disabled: isUploading }), _jsx("label", { htmlFor: "file", className: "inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline cursor-pointer", "aria-label": "Select file to upload", children: "Select File" }), selectedFile && (_jsx("div", { className: "mt-4 p-2 bg-muted rounded-md", children: _jsxs("p", { className: "text-sm flex items-center gap-2", children: [_jsx("span", { className: "font-medium", children: "Selected:" }), selectedFile.name, _jsxs("span", { className: "text-muted-foreground", children: ["(", Math.round(selectedFile.size / 1024), " KB)"] })] }) }))] }));
}
