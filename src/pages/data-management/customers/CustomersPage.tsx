import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CustomersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([
    { id: 1, name: 'Acme Corporation', industry: 'Manufacturing', status: 'Active', contact: 'John Smith', email: 'john@acmecorp.com', lastOrder: '2023-06-12' },
    { id: 2, name: 'TechInnovate', industry: 'Technology', status: 'Active', contact: 'Sarah Johnson', email: 'sarah@techinnovate.io', lastOrder: '2023-06-01' },
    { id: 3, name: 'Global Services', industry: 'Services', status: 'Inactive', contact: 'David Brown', email: 'david@globalservices.com', lastOrder: '2023-05-15' },
    { id: 4, name: 'Pacific Distributors', industry: 'Distribution', status: 'Active', contact: 'Emma Wilson', email: 'emma@pacificdist.com', lastOrder: '2023-06-10' },
    { id: 5, name: 'First Financial', industry: 'Finance', status: 'Active', contact: 'Michael Lee', email: 'michael@firstfinancial.com', lastOrder: '2023-06-05' },
    { id: 6, name: 'Metro Retail', industry: 'Retail', status: 'Pending', contact: 'Lisa Adams', email: 'lisa@metroretail.com', lastOrder: '2023-04-20' },
  ]);

  // Add new customer handler
  const handleAddCustomer = () => {
    // navigate('/data-management/customers/new');
    // Use toast notification until the actual page is implemented
    toast.info('Add customer page will be implemented in the next release');
  };

  // Handle filter action
  const handleFilter = () => {
    toast.info('Filter options panel will open here');
    // Here you would normally open a filter dialog or expand a filter section
  };

  // Handle export action
  const handleExport = () => {
    toast.success('Customer data exported successfully');
    // In a real application, this would trigger a CSV/Excel export
  };

  // Handle view customer details
  const handleViewCustomer = (customerId: number) => {
    // navigate(`/data-management/customers/${customerId}`);
    // Use toast notification until the actual page is implemented
    toast.info(`Viewing details for customer ID: ${customerId}`);
  };

  // Handle edit customer
  const handleEditCustomer = (customerId: number) => {
    // navigate(`/data-management/customers/${customerId}/edit`);
    // Use toast notification until the actual page is implemented
    toast.info(`Editing customer ID: ${customerId}`);
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Customer Directory</h1>
          <p className="text-gray-600">Manage customer relationships and track interactions</p>
        </div>
        <Button onClick={handleAddCustomer}><Plus className="mr-2 h-4 w-4" /> Add Customer</Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Customer Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="text-lg font-medium text-blue-700">Total Customers</h3>
              <p className="text-3xl font-bold">142</p>
            </div>
            <div className="bg-green-50 p-4 rounded-md">
              <h3 className="text-lg font-medium text-green-700">Active Customers</h3>
              <p className="text-3xl font-bold">118</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-md">
              <h3 className="text-lg font-medium text-purple-700">New This Month</h3>
              <p className="text-3xl font-bold">8</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <CardTitle>Customer List</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleFilter}>
                <Filter className="mr-2 h-4 w-4" />Filter
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />Export
              </Button>
            </div>
          </div>
          <div className="mt-2 relative w-full max-w-sm">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search customers..." 
              className="pl-8" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Primary Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">
                    No customers found matching your search
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map(customer => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.industry}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs 
                        ${customer.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          customer.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {customer.status}
                      </span>
                    </TableCell>
                    <TableCell>{customer.contact}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.lastOrder}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewCustomer(customer.id)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditCustomer(customer.id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage; 