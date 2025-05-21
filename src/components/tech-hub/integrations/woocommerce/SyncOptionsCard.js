import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";
import { toast } from "sonner";
const syncOptions = [
    {
        id: 'sync-products',
        label: 'Products',
        description: 'Sync product catalog, variations, and pricing'
    },
    {
        id: 'sync-orders',
        label: 'Orders',
        description: 'Sync order data, status updates, and fulfillment'
    },
    {
        id: 'sync-customers',
        label: 'Customers',
        description: 'Sync customer profiles and purchase history'
    }
];
const SyncOptionsCard = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const handleSyncOptionToggle = (optionId) => {
        setSelectedOptions(prev => prev.includes(optionId)
            ? prev.filter(id => id !== optionId)
            : [...prev, optionId]);
    };
    const handleStartSync = () => {
        if (selectedOptions.length === 0) {
            toast.warning("Please select at least one option to synchronize");
            return;
        }
        // TODO: Implement actual sync functionality
        toast.info(`Starting synchronization for: ${selectedOptions.join(', ')}`);
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Import/Export Options" }), _jsx(CardDescription, { children: "Configure what data to synchronize between systems" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: syncOptions.map((option) => (_jsxs("div", { className: "flex items-start space-x-2", children: [_jsx("input", { type: "checkbox", id: option.id, className: "mt-1", disabled: !isConnected, checked: selectedOptions.includes(option.id), onChange: () => handleSyncOptionToggle(option.id), "aria-label": option.label }), _jsxs("div", { children: [_jsx(Label, { htmlFor: option.id, className: "text-base", children: option.label }), _jsx("p", { className: "text-sm text-muted-foreground", children: option.description })] })] }, option.id))) }) }), _jsx(CardFooter, { children: _jsx("a", { href: "#", onClick: (e) => {
                        e.preventDefault();
                        if (isConnected && selectedOptions.length > 0) {
                            handleStartSync();
                        }
                    }, className: `inline-flex items-center justify-center rounded-md text-sm font-medium py-2 px-4 ${!isConnected || selectedOptions.length === 0
                        ? "opacity-50 pointer-events-none bg-secondary text-secondary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`, "aria-label": "Start synchronization", children: "Start Synchronization" }) })] }));
};
export default SyncOptionsCard;
