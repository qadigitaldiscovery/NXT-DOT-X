import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { UploadCloud } from 'lucide-react';
export function FileUploadInstructions({ isUploading }) {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center text-center", children: [_jsx(UploadCloud, { className: "h-10 w-10 text-muted-foreground mb-2" }), _jsx("p", { className: "text-sm text-muted-foreground mb-2", children: isUploading ? 'Uploading your file...' : 'Drag and drop your file here, or click to browse' }), _jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Supports all file types including EML with Excel attachments" })] }));
}
