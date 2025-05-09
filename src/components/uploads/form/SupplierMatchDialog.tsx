
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Supplier, useCreateSupplier } from '@/hooks/use-suppliers';
import { Check } from "lucide-react";
import { toast } from "sonner";
import { MatchOptionButtons } from './supplier-match/MatchOptionButtons';
import { ExistingSupplierForm } from './supplier-match/ExistingSupplierForm';
import { NewSupplierForm } from './supplier-match/NewSupplierForm';

interface SupplierMatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detectedSupplier: string | null;
  suppliers: Supplier[];
  onSupplierSelected: (supplierId: string) => void;
}

export function SupplierMatchDialog({
  open,
  onOpenChange,
  detectedSupplier,
  suppliers,
  onSupplierSelected
}: SupplierMatchDialogProps) {
  const [matchOption, setMatchOption] = useState<'existing' | 'new'>('existing');
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>('');
  const [newSupplierName, setNewSupplierName] = useState<string>(detectedSupplier || '');
  const [newSupplierCode, setNewSupplierCode] = useState<string>('');

  const { mutate: createSupplier, isPending } = useCreateSupplier();

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (open) {
      setNewSupplierName(detectedSupplier || '');
      setNewSupplierCode('');
      
      // Auto-search for a match among existing suppliers
      if (detectedSupplier) {
        // Simple fuzzy match - in a real app would use a proper fuzzy search
        const possibleMatch = suppliers.find(s => 
          s.name.toLowerCase().includes(detectedSupplier.toLowerCase()) ||
          detectedSupplier.toLowerCase().includes(s.name.toLowerCase())
        );
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
    } else {
      handleCreateSupplier();
      return; // Don't close dialog yet, let the creation callback handle it
    }
    onOpenChange(false);
  };

  // Generate a supplier code from the name
  const generateSupplierCode = () => {
    if (!newSupplierName) return;
    
    const code = newSupplierName
      .replace(/[^a-zA-Z0-9]/g, '') // Remove non-alphanumeric
      .substring(0, 6) // Take first 6 chars
      .toUpperCase();
    
    setNewSupplierCode(code);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Match Supplier</DialogTitle>
          <DialogDescription>
            {detectedSupplier 
              ? `We detected "${detectedSupplier}" in this file. Match to an existing supplier or create a new one.` 
              : "Match this file to a supplier or create a new one."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <MatchOptionButtons 
            matchOption={matchOption} 
            setMatchOption={setMatchOption} 
          />
          
          {matchOption === 'existing' ? (
            <ExistingSupplierForm
              suppliers={suppliers}
              selectedSupplierId={selectedSupplierId}
              setSelectedSupplierId={setSelectedSupplierId}
            />
          ) : (
            <NewSupplierForm
              newSupplierName={newSupplierName}
              setNewSupplierName={setNewSupplierName}
              newSupplierCode={newSupplierCode}
              setNewSupplierCode={setNewSupplierCode}
              generateSupplierCode={generateSupplierCode}
            />
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            onClick={handleConfirm}
            disabled={
              (matchOption === 'existing' && !selectedSupplierId) ||
              (matchOption === 'new' && (!newSupplierName || !newSupplierCode || isPending))
            }
            loading={matchOption === 'new' && isPending}
          >
            <Check className="h-4 w-4 mr-2" />
            {matchOption === 'existing' ? 'Use Selected Supplier' : 'Create & Use'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
