import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "@/components/ui/label";
export const ModelSelector = ({ modelOptions, selectedModel, onModelChange }) => {
    if (modelOptions.length === 0) {
        return null;
    }
    return (_jsxs("div", { className: "space-y-2 pt-4", children: [_jsx(Label, { children: "Preferred Model" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: modelOptions.map((option) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: "radio", id: option.value, name: "model", value: option.value, checked: selectedModel === option.value, onChange: () => onModelChange(option.value), className: "h-4 w-4 text-blue-600" }), _jsx(Label, { htmlFor: option.value, className: "text-sm cursor-pointer", children: option.label })] }, option.value))) })] }));
};
