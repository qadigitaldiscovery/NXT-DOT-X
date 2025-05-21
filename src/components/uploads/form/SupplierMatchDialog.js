import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCreateSupplier } from '@/hooks/use-suppliers';
import { Check } from "lucide-react";
import { toast } from "sonner";
import { MatchOptionButtons } from './supplier-match/MatchOptionButtons';
import { ExistingSupplierForm } from './supplier-match/ExistingSupplierForm';
import { NewSupplierForm } from './supplier-match/NewSupplierForm';
export function SupplierMatchDialog({ open, onOpenChange, detectedSupplier, suppliers, onSupplierSelected }) {
    const [matchOption, setMatchOption] = useState('existing');
    const [selectedSupplierId, setSelectedSupplierId] = useState('');
    const [newSupplierName, setNewSupplierName] = useState(detectedSupplier || '');
    const [newSupplierCode, setNewSupplierCode] = useState('');
    const { mutate: createSupplier, isPending } = useCreateSupplier();
    // Reset form when dialog opens/closes
    React.useEffect(() => {
        if (open) {
            setNewSupplierName(detectedSupplier || '');
            setNewSupplierCode('');
            // Auto-search for a match among existing suppliers
            if (detectedSupplier) {
                // Simple fuzzy match - in a real app would use a proper fuzzy search
                const possibleMatch = suppliers.find(s => s.name.toLowerCase().includes(detectedSupplier.toLowerCase()) ||
                    detectedSupplier.toLowerCase().includes(s.name.toLowerCase()));
                if (possibleMatch) {
                    setSelectedSupplierId(possibleMatch.id);
                }
            }
        }
    }, [open, detectedSupplier, suppliers]);
    const handleCreateSupplier = () => {
        if (!newSupplierName || !newSupplierCode) {
            toast.error("Please provide both supplier name and code");
            return;
        }
        createSupplier({
            name: newSupplierName,
            code: newSupplierCode,
            status: 'active',
            // Add the missing properties with null values to match the Supplier type
            email: null,
            phone: null,
            contact_name: null,
            payment_terms: null,
            website: null
        }, {
            onSuccess: (newSupplier) => {
                toast.success(`Created supplier: ${newSupplier.name}`);
                onSupplierSelected(newSupplier.id);
                onOpenChange(false);
            },
            onError: (error) => {
                toast.error(`Failed to create supplier: ${error.message || 'Unknown error'}`);
            }
        });
    };
    const handleConfirm = () => {
        if (matchOption === 'existing') {
            if (!selectedSupplierId) {
                toast.error("Please select a supplier");
                return;
            }
            onSupplierSelected(selectedSupplierId);
        }
        else {
            handleCreateSupplier();
            return; // Don't close dialog yet, let the creation callback handle it
        }
        onOpenChange(false);
    };
    // Generate a supplier code from the name
    const generateSupplierCode = () => {
        if (!newSupplierName)
            return;
        const code = newSupplierName
            .replace(/[^a-zA-Z0-9]/g, '') // Remove non-alphanumeric
            .substring(0, 6) // Take first 6 chars
            .toUpperCase();
        setNewSupplierCode(code);
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-md", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Match Supplier" }), _jsx(DialogDescription, { children: detectedSupplier
                                ? `We detected "${detectedSupplier}" in this file. Match to an existing supplier or create a new one.`
                                : "Match this file to a supplier or create a new one." })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsx(MatchOptionButtons, { matchOption: matchOption, setMatchOption: setMatchOption }), matchOption === 'existing' ? (_jsx(ExistingSupplierForm, { suppliers: suppliers, selectedSupplierId: selectedSupplierId, setSelectedSupplierId: setSelectedSupplierId })) : (_jsx(NewSupplierForm, { newSupplierName: newSupplierName, setNewSupplierName: setNewSupplierName, newSupplierCode: newSupplierCode, setNewSupplierCode: setNewSupplierCode, generateSupplierCode: generateSupplierCode }))] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }), _jsxs(Button, { onClick: handleConfirm, disabled: (matchOption === 'existing' && !selectedSupplierId) ||
                                (matchOption === 'new' && (!newSupplierName || !newSupplierCode || isPending)), loading: matchOption === 'new' && isPending, children: [_jsx(Check, { className: "h-4 w-4 mr-2" }), matchOption === 'existing' ? 'Use Selected Supplier' : 'Create & Use'] })] })] }) }));
}
