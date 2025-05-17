
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SupplierForm } from '@/components/suppliers/SupplierForm';
import { ArrowLeft } from 'lucide-react';

/**
 * New supplier form page - this component allows creating a new supplier
 * This is a standalone implementation that will be integrated later
 */
const NewSupplierVendor: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          className="mr-2" 
          onClick={() => navigate('/data-management/suppliers')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Suppliers
        </Button>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold">Add New Supplier</h1>
        <p className="text-gray-500">
          Create a new supplier record in the system
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Supplier Information</CardTitle>
        </CardHeader>
        <CardContent>
          <SupplierForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewSupplierVendor;
