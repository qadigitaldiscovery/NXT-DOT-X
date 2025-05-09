
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NewSupplierFormProps {
  newSupplierName: string;
  setNewSupplierName: (name: string) => void;
  newSupplierCode: string;
  setNewSupplierCode: (code: string) => void;
  generateSupplierCode: () => void;
}

export function NewSupplierForm({
  newSupplierName,
  setNewSupplierName,
  newSupplierCode,
  setNewSupplierCode,
  generateSupplierCode
}: NewSupplierFormProps) {
  return (
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
  );
}
