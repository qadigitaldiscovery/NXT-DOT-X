
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SupplierMatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suppliers: any[];
  onSupplierSelected: (id: any) => void;
  detectedSupplier?: string | null;
}

export function SupplierMatchDialog({ 
  open, 
  onOpenChange, 
  suppliers, 
  onSupplierSelected,
  detectedSupplier 
}: SupplierMatchDialogProps) {
  const [selectedSupplierId, setSelectedSupplierId] = React.useState<string>('');

  const handleConfirm = () => {
    if (selectedSupplierId) {
      onSupplierSelected(selectedSupplierId);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Supplier</DialogTitle>
          {detectedSupplier && (
            <p className="text-sm text-gray-600">Detected supplier: {detectedSupplier}</p>
          )}
        </DialogHeader>
        <div className="space-y-4">
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
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={!selectedSupplierId}>
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
