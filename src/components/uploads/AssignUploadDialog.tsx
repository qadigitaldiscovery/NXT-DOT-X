
import React from 'react';
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
import { format } from 'date-fns';
import { File } from "lucide-react";
import { SupplierUpload } from '@/types/supplier-uploads';
import { Supplier } from '@/hooks/use-suppliers';

interface AssignUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUpload: SupplierUpload | null;
  suppliers: Supplier[];
  selectedSupplierId: string;
  onSupplierChange: (supplierId: string) => void;
  onAssign: () => void;
}

export function AssignUploadDialog({
  open,
  onOpenChange,
  selectedUpload,
  suppliers,
  selectedSupplierId,
  onSupplierChange,
  onAssign
}: AssignUploadDialogProps) {
  if (!selectedUpload) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign File to Supplier</DialogTitle>
          <DialogDescription>
            Select a supplier to assign this file to.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="mb-4 p-3 bg-muted rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <File className="h-4 w-4" />
              <span className="font-medium">{selectedUpload.file_name}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Uploaded: {format(new Date(selectedUpload.created_at), 'PPpp')}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Supplier</label>
            <Select value={selectedSupplierId} onValueChange={onSupplierChange}>
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
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={onAssign} 
            disabled={!selectedSupplierId}
          >
            Assign to Supplier
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
