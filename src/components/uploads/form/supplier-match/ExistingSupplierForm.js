import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
export function ExistingSupplierForm({ suppliers, selectedSupplierId, setSelectedSupplierId }) {
    return (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "supplier", children: "Select Supplier" }), _jsxs(Select, { value: selectedSupplierId, onValueChange: setSelectedSupplierId, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select a supplier" }) }), _jsx(SelectContent, { children: suppliers.map((supplier) => (_jsx(SelectItem, { value: supplier.id, children: supplier.name }, supplier.id))) })] })] }));
}
