
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SuppliersTable } from '@/components/suppliers/SuppliersTable';
import { useSuppliers } from '@/hooks/use-suppliers';

/**
 * Supplier vendors page - this component allows viewing and managing suppliers
 * This is a standalone implementation that will be integrated later
 */
const SupplierVendors: React.FC = () => {
  const navigate = useNavigate();
  const { data: suppliers = [], isLoading } = useSuppliers();
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Suppliers</h1>
          <p className="text-gray-500">
            Manage your suppliers and vendors
          </p>
        </div>
        <Button onClick={() => navigate('/data-management/suppliers/new')}>
          Add New Supplier
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Suppliers Directory</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-8">
              <p>Loading suppliers...</p>
            </div>
          ) : (
            <SuppliersTable />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierVendors;
