
import React from 'react';
import { SuppliersTable } from '@/components/suppliers/SuppliersTable';
import { Button } from '@/components/ui/button';
import { PlusCircle, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SuppliersPage() {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">
            Manage your suppliers and their cost data
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={() => navigate('/beta1/uploads/new')}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Cost File
          </Button>
          <Button onClick={() => navigate('/beta1/suppliers/new')}>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Supplier
          </Button>
        </div>
      </div>
      
      <SuppliersTable />
    </div>
  );
}
