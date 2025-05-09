
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { SuppliersTable } from '@/components/suppliers/SuppliersTable';
import { useSuppliers } from '@/hooks/use-suppliers';
import { PlusCircle, Search, RefreshCw } from 'lucide-react';

const SupplierDirectoryPage = () => {
  const navigate = useNavigate();
  const { data: suppliers, isLoading, refetch } = useSuppliers();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredSuppliers = suppliers?.filter(supplier => 
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (supplier.contact_name && supplier.contact_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddSupplier = () => {
    navigate('/supplier-management/new');
  };

  const handleRefresh = () => {
    refetch();
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Supplier Directory</h1>
        <p className="text-muted-foreground mt-2">
          Manage your supplier information and relationships
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Suppliers</CardTitle>
          <CardDescription>
            Browse, search and manage your supplier database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
            <div className="flex items-center gap-2 w-full md:w-1/2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search suppliers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={handleRefresh} 
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button 
                onClick={handleAddSupplier}
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" />
                Add Supplier
              </Button>
            </div>
          </div>
          
          <SuppliersTable 
            suppliers={filteredSuppliers || []} 
            isLoading={isLoading} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierDirectoryPage;
