
import React from 'react';
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Supplier } from '@/hooks/use-suppliers';

interface ExistingSupplierFormProps {
  suppliers: Supplier[];
  selectedSupplierId: string;
  setSelectedSupplierId: (id: string) => void;
}

export function ExistingSupplierForm({ 
  suppliers, 
  selectedSupplierId, 
  setSelectedSupplierId 
}: ExistingSupplierFormProps) {
  return (
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
  );
}
