import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus, RefreshCw, Upload } from 'lucide-react';
export function DocumentToolbar({ onDocumentAdd, onCategoryAdd, onFileUpload, onRefresh, }) {
    return (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex gap-2", children: [_jsxs("a", { href: "#", onClick: (e) => {
                            e.preventDefault();
                            onDocumentAdd();
                        }, className: "inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline", "aria-label": "Add document", children: [_jsx(Plus, { className: "h-4 w-4 mr-2", "aria-hidden": "true" }), "Add Document"] }), _jsxs("a", { href: "#", onClick: (e) => {
                            e.preventDefault();
                            onCategoryAdd();
                        }, className: "inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline", "aria-label": "Add category", children: [_jsx(Plus, { className: "h-4 w-4 mr-2", "aria-hidden": "true" }), "Add Category"] }), _jsxs("a", { href: "#", onClick: (e) => {
                            e.preventDefault();
                            onFileUpload();
                        }, className: "inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline", "aria-label": "Upload file", children: [_jsx(Upload, { className: "h-4 w-4 mr-2", "aria-hidden": "true" }), "Upload File"] })] }), _jsxs("a", { href: "#", onClick: (e) => {
                    e.preventDefault();
                    onRefresh();
                }, className: "inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline", "aria-label": "Refresh documents", children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2", "aria-hidden": "true" }), "Refresh"] })] }));
}
