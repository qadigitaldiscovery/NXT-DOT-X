
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

interface SupplierSelectorProps {
  suppliers: Supplier[];
  selectedSupplier: string;
  onSupplierSelect: (value: string) => void;
  isUploading: boolean;
  useHoldingBucket: boolean;
  allowHoldingBucket?: boolean;
  onHoldingBucketChange: (value: boolean) => void;
}

export function SupplierSelector({
  suppliers,
  selectedSupplier,
  onSupplierSelect,
  isUploading,
  useHoldingBucket,
  allowHoldingBucket = false,
  onHoldingBucketChange
}: SupplierSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="supplier">Select Supplier</Label>
        
        {allowHoldingBucket && (
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="holding-bucket"
              className="rounded border-gray-300 text-primary focus:ring-primary"
              checked={useHoldingBucket}
              onChange={() => onHoldingBucketChange(!useHoldingBucket)}
              disabled={isUploading}
            />
            <Label 
              htmlFor="holding-bucket" 
              className="text-sm font-normal cursor-pointer flex items-center"
            >
              Upload to holding bucket for later allocation
            </Label>
          </div>
        )}
      </div>
      
      {!useHoldingBucket && (
        <Select
          value={selectedSupplier}
          onValueChange={onSupplierSelect}
          disabled={isUploading || useHoldingBucket}
        >
          <SelectTrigger id="supplier">
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
      )}
      
      {useHoldingBucket && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800">
          The file will be uploaded to a holding bucket and can be assigned to a supplier later.
        </div>
      )}
    </div>
  );
}
