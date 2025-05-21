import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { File } from "lucide-react";
export function AssignUploadDialog({ open, onOpenChange, selectedUpload, suppliers, selectedSupplierId, onSupplierChange, onAssign }) {
    if (!selectedUpload)
        return null;
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Assign File to Supplier" }), _jsx(DialogDescription, { children: "Select a supplier to assign this file to." })] }), _jsxs("div", { className: "py-4", children: [_jsxs("div", { className: "mb-4 p-3 bg-muted rounded-md", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(File, { className: "h-4 w-4" }), _jsx("span", { className: "font-medium", children: selectedUpload.file_name })] }), _jsxs("div", { className: "text-sm text-muted-foreground", children: ["Uploaded: ", format(new Date(selectedUpload.created_at), 'PPpp')] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Select Supplier" }), _jsxs(Select, { value: selectedSupplierId, onValueChange: onSupplierChange, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select a supplier" }) }), _jsx(SelectContent, { children: suppliers.map((supplier) => (_jsx(SelectItem, { value: supplier.id, children: supplier.name }, supplier.id))) })] })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }), _jsx(Button, { onClick: onAssign, disabled: !selectedSupplierId, children: "Assign to Supplier" })] })] }) }));
}
