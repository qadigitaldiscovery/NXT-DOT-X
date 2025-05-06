
import React from 'react';
import { SupplierForm } from '@/components/suppliers/SupplierForm';

export default function NewSupplierPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Supplier</h1>
        <p className="text-muted-foreground">
          Add a new supplier to the system
        </p>
      </div>
      
      <SupplierForm />
    </div>
  );
}
