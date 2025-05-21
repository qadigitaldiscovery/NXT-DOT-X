import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export function NewSupplierForm({ newSupplierName, setNewSupplierName, newSupplierCode, setNewSupplierCode, generateSupplierCode }) {
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "supplier-name", children: "Supplier Name" }), _jsx(Input, { id: "supplier-name", value: newSupplierName, onChange: (e) => setNewSupplierName(e.target.value), placeholder: "Enter supplier name" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx(Label, { htmlFor: "supplier-code", children: "Supplier Code" }), _jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: generateSupplierCode, className: "h-6 text-xs", children: "Generate" })] }), _jsx(Input, { id: "supplier-code", value: newSupplierCode, onChange: (e) => setNewSupplierCode(e.target.value.toUpperCase()), placeholder: "Enter supplier code", className: "uppercase" })] })] }));
}
