
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Supplier, useCreateSupplier } from '@/hooks/use-suppliers';
import { Check, FileText } from "lucide-react";
import { toast } from "sonner";

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
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant={matchOption === 'existing' ? "default" : "outline"}
              className="flex-1"
              onClick={() => setMatchOption('existing')}
            >
              Use Existing Supplier
            </Button>
            <Button
              type="button"
              variant={matchOption === 'new' ? "default" : "outline"}
              className="flex-1"
              onClick={() => setMatchOption('new')}
            >
              Create New Supplier
            </Button>
          </div>
          
          {matchOption === 'existing' ? (
            <div className="space-y-2">
              <Label htmlFor="supplier">Select Supplier</Label>
              <Select value={selectedSupplierId} onValueChange={setSelectedSupplierId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="supplier-name">Supplier Name</Label>
                <Input 
                  id="supplier-name"
                  value={newSupplierName} 
                  onChange={(e) => setNewSupplierName(e.target.value)} 
                  placeholder="Enter supplier name"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="supplier-code">Supplier Code</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={generateSupplierCode}
                    className="h-6 text-xs"
                  >
                    Generate
                  </Button>
                </div>
                <Input 
                  id="supplier-code"
                  value={newSupplierCode} 
                  onChange={(e) => setNewSupplierCode(e.target.value.toUpperCase())} 
                  placeholder="Enter supplier code"
                  className="uppercase"
                />
              </div>
            </div>
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
