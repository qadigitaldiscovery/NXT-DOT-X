import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Upload, Loader2 } from "lucide-react";
import { cn } from '@/lib/utils';
export function ImportButton({ onSubmit, isUploading, isDisabled }) {
    return (_jsx("a", { href: "#", onClick: (e) => {
            e.preventDefault();
            if (!isDisabled && !isUploading) {
                onSubmit();
            }
        }, className: cn("w-full inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline", (isDisabled || isUploading) ? "opacity-50 pointer-events-none" : ""), "aria-label": "Import suppliers", children: isUploading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin", "aria-hidden": "true" }), "Importing..."] })) : (_jsxs(_Fragment, { children: [_jsx(Upload, { className: "mr-2 h-4 w-4", "aria-hidden": "true" }), "Import Suppliers"] })) }));
}
