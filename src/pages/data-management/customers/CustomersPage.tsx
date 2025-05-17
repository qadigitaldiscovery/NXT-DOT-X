import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, Download, Trash2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription } from '@/components/ui/alert';

// Form schema for validation
const customerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  industry: z.string().min(1, "Industry is required"),
  status: z.enum(["Active", "Inactive", "Pending"]),
  contact: z.string().min(2, "Contact name is required"),
  email: z.string().email("Invalid email address"),
});

type CustomerFormData = z.infer<typeof customerSchema>;

const CustomersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [editCustomerId, setEditCustomerId] = useState<number | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });

  // Load data with error handling
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // In a real app, this would be an API call
        // For demo, we'll simulate loading with timeout and use mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockCustomers = [
          { id: 1, name: 'Acme Corporation', industry: 'Manufacturing', status: 'Active', contact: 'John Smith', email: 'john@acmecorp.com', lastOrder: '2023-06-12' },
          { id: 2, name: 'TechInnovate', industry: 'Technology', status: 'Active', contact: 'Sarah Johnson', email: 'sarah@techinnovate.io', lastOrder: '2023-06-01' },
          { id: 3, name: 'Global Services', industry: 'Services', status: 'Inactive', contact: 'David Brown', email: 'david@globalservices.com', lastOrder: '2023-05-15' },
          { id: 4, name: 'Pacific Distributors', industry: 'Distribution', status: 'Active', contact: 'Emma Wilson', email: 'emma@pacificdist.com', lastOrder: '2023-06-10' },
          { id: 5, name: 'First Financial', industry: 'Finance', status: 'Active', contact: 'Michael Lee', email: 'michael@firstfinancial.com', lastOrder: '2023-06-05' },
          { id: 6, name: 'Metro Retail', industry: 'Retail', status: 'Pending', contact: 'Lisa Adams', email: 'lisa@metroretail.com', lastOrder: '2023-04-20' },
        ];
        
        setCustomers(mockCustomers);
      } catch (err) {
        setError('Failed to load customer data. Please try again.');
        console.error('Error fetching customers:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Add new customer handler
  const handleAddCustomer = () => {
    setFormMode('add');
    reset(); // Clear form fields
    setShowForm(true);
  };

  // Handle form submission
  const onSubmitForm = (data: CustomerFormData) => {
    try {
      if (formMode === 'add') {
        // Create new customer
        const newCustomer = {
          id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
          ...data,
          lastOrder: new Date().toISOString().split('T')[0]
        };
        setCustomers([...customers, newCustomer]);
        toast.success('Customer added successfully');
      } else {
        // Update existing customer
        if (editCustomerId) {
          const updatedCustomers = customers.map(customer => 
            customer.id === editCustomerId ? { ...customer, ...data } : customer
          );
          setCustomers(updatedCustomers);
          toast.success('Customer updated successfully');
        }
      }
      setShowForm(false);
    } catch (err) {
      toast.error('Error saving customer data. Please try again.');
      console.error('Error saving customer:', err);
    }
  };

  // Handle filter action
  const handleFilter = () => {
    try {
      toast.info('Filter options panel will open here');
      // Here you would normally open a filter dialog or expand a filter section
    } catch (err) {
      toast.error('Error applying filters. Please try again.');
      console.error('Error filtering:', err);
    }
  };

  // Handle export action
  const handleExport = () => {
    try {
      toast.success('Customer data exported successfully');
      // In a real application, this would trigger a CSV/Excel export
    } catch (err) {
      toast.error('Failed to export data. Please try again.');
      console.error('Error exporting:', err);
    }
  };

  // Handle view customer details
  const handleViewCustomer = (customerId: number) => {
    try {
      // navigate(`/data-management/customers/${customerId}`);
      // Use toast notification until the actual page is implemented
      toast.info(`Viewing details for customer ID: ${customerId}`);
    } catch (err) {
      toast.error('Error loading customer details. Please try again.');
      console.error('Error viewing customer:', err);
    }
  };

  // Handle edit customer
  const handleEditCustomer = (customerId: number) => {
    try {
      setFormMode('edit');
      setEditCustomerId(customerId);
      const customerToEdit = customers.find(c => c.id === customerId);
      
      if (customerToEdit) {
        // Populate form with existing data
        setValue('name', customerToEdit.name);
        setValue('industry', customerToEdit.industry);
        setValue('status', customerToEdit.status);
        setValue('contact', customerToEdit.contact);
        setValue('email', customerToEdit.email);
        setShowForm(true);
      } else {
        throw new Error('Customer not found');
      }
    } catch (err) {
      toast.error('Error loading customer details for editing. Please try again.');
      console.error('Error editing customer:', err);
    }
  };

  // Handle delete customer
  const handleDeleteCustomer = (customerId: number) => {
    setCustomerToDelete(customerId);
    setShowDeleteDialog(true);
  };

  // Confirm delete action
  const confirmDelete = () => {
    try {
      if (customerToDelete) {
        const updatedCustomers = customers.filter(customer => customer.id !== customerToDelete);
        setCustomers(updatedCustomers);
        toast.success('Customer deleted successfully');
        setShowDeleteDialog(false);
      }
    } catch (err) {
      toast.error('Error deleting customer. Please try again.');
      console.error('Error deleting customer:', err);
    }
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

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Customer Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="text-lg font-medium text-blue-700">Total Customers</h3>
              <p className="text-3xl font-bold">{customers.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-md">
              <h3 className="text-lg font-medium text-green-700">Active Customers</h3>
              <p className="text-3xl font-bold">
                {customers.filter(c => c.status === 'Active').length}
              </p>
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
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            </div>
          ) : (
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
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteCustomer(customer.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this customer? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Customer Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{formMode === 'add' ? 'Add New Customer' : 'Edit Customer'}</DialogTitle>
            <DialogDescription>
              Fill in the customer details below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Customer Name *</Label>
                <Input id="name" {...register('name')} />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="industry">Industry *</Label>
                <Input id="industry" {...register('industry')} />
                {errors.industry && (
                  <p className="text-sm text-red-500">{errors.industry.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="status">Status *</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="status" 
                  {...register('status')}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
                {errors.status && (
                  <p className="text-sm text-red-500">{errors.status.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="contact">Primary Contact *</Label>
                <Input id="contact" {...register('contact')} />
                {errors.contact && (
                  <p className="text-sm text-red-500">{errors.contact.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" {...register('email')} type="email" />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {formMode === 'add' ? 'Add Customer' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomersPage; 