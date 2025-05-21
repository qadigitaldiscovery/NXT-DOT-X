import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
const BatchOperationsDialog = ({ isOpen, onClose, modules }) => {
    const [selectedModules, setSelectedModules] = useState([]);
    const [operation, setOperation] = useState('status');
    const [newStatus, setNewStatus] = useState('green');
    const [isProcessing, setIsProcessing] = useState(false);
    const handleToggleModule = (moduleId) => {
        setSelectedModules(prev => prev.includes(moduleId)
            ? prev.filter(id => id !== moduleId)
            : [...prev, moduleId]);
    };
    const handleSelectAll = () => {
        if (selectedModules.length === modules.length) {
            setSelectedModules([]);
        }
        else {
            setSelectedModules(modules.map(m => m.id));
        }
    };
    const handleApplyOperations = async () => {
        if (selectedModules.length === 0) {
            toast.error("Please select at least one module");
            return;
        }
        setIsProcessing(true);
        try {
            // Simulate batch operation
            await new Promise(resolve => setTimeout(resolve, 1000));
            // In a real app, you would call an API endpoint to perform the batch operation
            // For now, we'll just show a success toast
            toast.success(`Applied ${operation} operation to ${selectedModules.length} modules`);
            // Reset selections
            setSelectedModules([]);
            onClose();
        }
        catch (error) {
            console.error("Error applying batch operations:", error);
            toast.error("Failed to apply batch operations");
        }
        finally {
            setIsProcessing(false);
        }
    };
    // Helper function to get status display color
    const getStatusDisplayColor = (status) => {
        if (status === 'green')
            return 'bg-green-500';
        if (status === 'orange')
            return 'bg-amber-500';
        if (status === 'red')
            return 'bg-red-500';
        return 'bg-gray-500';
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: (open) => !open && onClose(), children: _jsxs(DialogContent, { className: "max-w-md", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Batch Operations" }), _jsx(DialogDescription, { children: "Apply operations to multiple modules at once" })] }), _jsxs("div", { className: "space-y-4 py-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { children: "Operation Type" }), _jsxs(Select, { value: operation, onValueChange: setOperation, children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select operation" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "status", children: "Update Status" }), _jsx(SelectItem, { value: "restart", children: "Restart Module" }), _jsx(SelectItem, { value: "sync", children: "Sync Configuration" })] })] })] }), operation === 'status' && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { children: "New Status" }), _jsxs(Select, { value: newStatus, onValueChange: setNewStatus, children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "green", children: "Green (Operational)" }), _jsx(SelectItem, { value: "orange", children: "Orange (Degraded)" }), _jsx(SelectItem, { value: "red", children: "Red (Outage)" })] })] })] })), _jsxs("div", { className: "border rounded-md p-4", children: [_jsxs("div", { className: "flex items-center pb-2 mb-2 border-b", children: [_jsx(Checkbox, { id: "select-all", checked: selectedModules.length === modules.length && modules.length > 0, onCheckedChange: handleSelectAll }), _jsx("label", { htmlFor: "select-all", className: "text-sm font-medium ml-2 cursor-pointer", children: "Select All Modules" })] }), _jsxs("div", { className: "max-h-60 overflow-y-auto space-y-2", children: [modules.map(module => (_jsxs("div", { className: "flex items-center", children: [_jsx(Checkbox, { id: `module-${module.id}`, checked: selectedModules.includes(module.id), onCheckedChange: () => handleToggleModule(module.id) }), _jsx("label", { htmlFor: `module-${module.id}`, className: "text-sm ml-2 cursor-pointer flex-1", children: module.name }), _jsx("span", { className: `h-2 w-2 rounded-full ml-2 ${getStatusDisplayColor(module.status)}` })] }, module.id))), modules.length === 0 && (_jsx("div", { className: "text-center text-sm text-muted-foreground py-2", children: "No modules available" }))] })] })] }), _jsxs(DialogFooter, { className: "flex space-x-2 justify-end", children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Cancel" }) }), _jsx(Button, { onClick: handleApplyOperations, disabled: isProcessing || selectedModules.length === 0, children: isProcessing ? "Processing..." : "Apply to Selected" })] })] }) }));
};
export default BatchOperationsDialog;
