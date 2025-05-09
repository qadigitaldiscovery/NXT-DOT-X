
import React from 'react';
import { CustomerForm } from '@/components/customers/CustomerForm';

export default function NewCustomerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Customer</h1>
        <p className="text-muted-foreground">
          Add a new customer to the system
        </p>
      </div>
      
      <CustomerForm />
    </div>
  );
}
