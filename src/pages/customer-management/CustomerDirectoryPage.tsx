
import React from 'react';
import { CustomersTable } from '@/components/customers/CustomersTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CustomerDirectoryPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customer Directory</h2>
          <p className="text-muted-foreground">
            Manage your customer relationships and data.
          </p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => navigate('/customer-management/new')}
        >
          <Plus className="h-4 w-4" /> Add Customer
        </Button>
      </div>

      <CustomersTable />
    </div>
  );
};

export default CustomerDirectoryPage;
