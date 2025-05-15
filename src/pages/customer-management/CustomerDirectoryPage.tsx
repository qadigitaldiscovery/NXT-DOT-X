
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CustomersTable } from '@/components/customers/CustomersTable';
import { PlusCircle, Search, RefreshCw } from 'lucide-react';

const CustomerDirectoryPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddCustomer = () => {
    navigate('/customer-management/new');
  };

  const handleRefresh = () => {
    // In a real implementation, this would refresh customer data
    console.log('Refreshing customer data');
  };
  
  return (
    <div className="w-full h-full space-y-6">
      <div>
        <p className="text-muted-foreground">
          Manage your customer information and relationships
        </p>
      </div>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>
            Browse, search and manage your customer database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
            <div className="flex items-center gap-2 w-full md:w-1/2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
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
                onClick={handleAddCustomer}
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" />
                Add Customer
              </Button>
            </div>
          </div>
          
          <CustomersTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDirectoryPage;
