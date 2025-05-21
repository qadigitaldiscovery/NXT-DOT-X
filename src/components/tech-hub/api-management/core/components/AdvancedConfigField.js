import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
export function AdvancedConfigField({ configKey, configLabel, type, value, onUpdate, options = [], className }) {
    const handleCheckboxChange = (checked) => {
        onUpdate(configKey, checked);
    };
    const handleInputChange = (e) => {
        const newValue = type === "number" ? Number(e.target.value) : e.target.value;
        onUpdate(configKey, newValue);
    };
    const handleSelectChange = (values) => {
        onUpdate(configKey, values);
    };
    const label = configLabel || configKey;
    return (_jsxs("div", { className: cn("space-y-1", className), children: [type !== "boolean" && (_jsx(Label, { htmlFor: `config-${configKey}`, className: "text-sm", children: label })), type === "boolean" && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: `config-${configKey}`, checked: value, onCheckedChange: handleCheckboxChange }), _jsx(Label, { htmlFor: `config-${configKey}`, className: "text-sm", children: label })] })), type === "string" && (_jsx(Input, { id: `config-${configKey}`, value: value || "", onChange: handleInputChange, className: "h-8 text-sm" })), type === "number" && (_jsx(Input, { id: `config-${configKey}`, type: "number", value: value || 0, onChange: handleInputChange, className: "h-8 text-sm" })), type === "select" && options.length > 0 && (_jsxs(Select, { value: value, onValueChange: handleSelectChange, children: [_jsx(SelectTrigger, { id: `config-${configKey}`, className: "h-8 text-sm", children: _jsx(SelectValue, { placeholder: `Select ${label}` }) }), _jsx(SelectContent, { children: options.map((option) => (_jsx(SelectItem, { value: option, children: option }, option))) })] }))] }));
}
