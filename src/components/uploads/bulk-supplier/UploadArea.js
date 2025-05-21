import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
export function UploadArea({ onFileSelected, isUploading, selectedFile }) {
    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        if (file && !file.name.toLowerCase().endsWith('.csv')) {
            alert('Please select a CSV file');
            return;
        }
        onFileSelected(file);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (!file.name.toLowerCase().endsWith('.csv')) {
                alert('Please select a CSV file');
                return;
            }
            onFileSelected(file);
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    return (_jsxs("div", { className: `border-2 border-dashed rounded-lg p-8 text-center ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary cursor-pointer'}`, onDrop: handleDrop, onDragOver: handleDragOver, onClick: () => {
            if (!isUploading && !selectedFile) {
                document.getElementById('file-upload')?.click();
            }
        }, children: [_jsx("input", { type: "file", id: "file-upload", accept: ".csv", className: "hidden", onChange: handleFileChange, disabled: isUploading }), selectedFile ? (_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsxs("div", { className: "flex items-center gap-2 p-2 bg-secondary/20 rounded-md", children: [_jsx(File, { className: "h-6 w-6 text-primary" }), _jsx("span", { className: "font-medium", children: selectedFile.name }), _jsx(Button, { type: "button", variant: "ghost", size: "icon", className: "h-7 w-7 rounded-full", onClick: (e) => {
                                    e.stopPropagation();
                                    onFileSelected(null);
                                }, disabled: isUploading, children: _jsx(X, { className: "h-4 w-4" }) })] }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [(selectedFile.size / 1024).toFixed(1), " KB"] })] })) : (_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx("div", { className: "h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center", children: _jsx(Upload, { className: "h-6 w-6 text-primary" }) }), _jsx("p", { className: "font-medium", children: "Drag & drop your CSV file here or click to browse" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "File should be a CSV with required headers" })] }))] }));
}
