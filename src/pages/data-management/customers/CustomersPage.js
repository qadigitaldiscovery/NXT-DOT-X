import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, Download, Trash2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
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
const CustomersPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('add');
    const [editCustomerId, setEditCustomerId] = useState(null);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
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
            }
            catch (err) {
                setError('Failed to load customer data. Please try again.');
                console.error('Error fetching customers:', err);
            }
            finally {
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
    const onSubmitForm = (data) => {
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
            }
            else {
                // Update existing customer
                if (editCustomerId) {
                    const updatedCustomers = customers.map(customer => customer.id === editCustomerId ? { ...customer, ...data } : customer);
                    setCustomers(updatedCustomers);
                    toast.success('Customer updated successfully');
                }
            }
            setShowForm(false);
        }
        catch (err) {
            toast.error('Error saving customer data. Please try again.');
            console.error('Error saving customer:', err);
        }
    };
    // Handle filter action
    const handleFilter = () => {
        try {
            toast.info('Filter options panel will open here');
            // Here you would normally open a filter dialog or expand a filter section
        }
        catch (err) {
            toast.error('Error applying filters. Please try again.');
            console.error('Error filtering:', err);
        }
    };
    // Handle export action
    const handleExport = () => {
        try {
            toast.success('Customer data exported successfully');
            // In a real application, this would trigger a CSV/Excel export
        }
        catch (err) {
            toast.error('Failed to export data. Please try again.');
            console.error('Error exporting:', err);
        }
    };
    // Handle view customer details
    const handleViewCustomer = (customerId) => {
        try {
            // navigate(`/data-management/customers/${customerId}`);
            // Use toast notification until the actual page is implemented
            toast.info(`Viewing details for customer ID: ${customerId}`);
        }
        catch (err) {
            toast.error('Error loading customer details. Please try again.');
            console.error('Error viewing customer:', err);
        }
    };
    // Handle edit customer
    const handleEditCustomer = (customerId) => {
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
            }
            else {
                throw new Error('Customer not found');
            }
        }
        catch (err) {
            toast.error('Error loading customer details for editing. Please try again.');
            console.error('Error editing customer:', err);
        }
    };
    // Handle delete customer
    const handleDeleteCustomer = (customerId) => {
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
        }
        catch (err) {
            toast.error('Error deleting customer. Please try again.');
            console.error('Error deleting customer:', err);
        }
    };
    // Filter customers based on search term
    const filteredCustomers = customers.filter(customer => customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.contact.toLowerCase().includes(searchTerm.toLowerCase()));
    return (_jsxs("div", { className: "container mx-auto py-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Customer Directory" }), _jsx("p", { className: "text-gray-600", children: "Manage customer relationships and track interactions" })] }), _jsxs(Button, { onClick: handleAddCustomer, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), " Add Customer"] })] }), error && (_jsxs(Alert, { variant: "destructive", className: "mb-6", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: error })] })), _jsxs(Card, { className: "mb-6", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { children: "Customer Overview" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "bg-blue-50 p-4 rounded-md", children: [_jsx("h3", { className: "text-lg font-medium text-blue-700", children: "Total Customers" }), _jsx("p", { className: "text-3xl font-bold", children: customers.length })] }), _jsxs("div", { className: "bg-green-50 p-4 rounded-md", children: [_jsx("h3", { className: "text-lg font-medium text-green-700", children: "Active Customers" }), _jsx("p", { className: "text-3xl font-bold", children: customers.filter(c => c.status === 'Active').length })] }), _jsxs("div", { className: "bg-purple-50 p-4 rounded-md", children: [_jsx("h3", { className: "text-lg font-medium text-purple-700", children: "New This Month" }), _jsx("p", { className: "text-3xl font-bold", children: "8" })] })] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx(CardTitle, { children: "Customer List" }), _jsxs("div", { className: "flex space-x-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: handleFilter, children: [_jsx(Filter, { className: "mr-2 h-4 w-4" }), "Filter"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: handleExport, children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Export"] })] })] }), _jsxs("div", { className: "mt-2 relative w-full max-w-sm", children: [_jsx(Search, { className: "absolute left-2 top-3 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search customers...", className: "pl-8", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] })] }), _jsx(CardContent, { children: isLoading ? (_jsx("div", { className: "flex justify-center items-center h-64", children: _jsx("div", { className: "animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" }) })) : (_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { children: "Customer Name" }), _jsx(TableHead, { children: "Industry" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { children: "Primary Contact" }), _jsx(TableHead, { children: "Email" }), _jsx(TableHead, { children: "Last Order" }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: filteredCustomers.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 7, className: "text-center h-24", children: "No customers found matching your search" }) })) : (filteredCustomers.map(customer => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: customer.name }), _jsx(TableCell, { children: customer.industry }), _jsx(TableCell, { children: _jsx("span", { className: `px-2 py-1 rounded-full text-xs 
                          ${customer.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                        customer.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                                                            'bg-yellow-100 text-yellow-800'}`, children: customer.status }) }), _jsx(TableCell, { children: customer.contact }), _jsx(TableCell, { children: customer.email }), _jsx(TableCell, { children: customer.lastOrder }), _jsxs(TableCell, { className: "text-right", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleViewCustomer(customer.id), children: "View" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleEditCustomer(customer.id), children: "Edit" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleDeleteCustomer(customer.id), children: _jsx(Trash2, { className: "h-4 w-4 text-red-500" }) })] })] }, customer.id)))) })] })) })] }), _jsx(Dialog, { open: showDeleteDialog, onOpenChange: setShowDeleteDialog, children: _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Confirm Deletion" }), _jsx(DialogDescription, { children: "Are you sure you want to delete this customer? This action cannot be undone." })] }), _jsxs(DialogFooter, { children: [_jsx(DialogClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: "Cancel" }) }), _jsx(Button, { variant: "destructive", onClick: confirmDelete, children: "Delete" })] })] }) }), _jsx(Dialog, { open: showForm, onOpenChange: setShowForm, children: _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: formMode === 'add' ? 'Add New Customer' : 'Edit Customer' }), _jsx(DialogDescription, { children: "Fill in the customer details below." })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmitForm), children: [_jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "name", children: "Customer Name *" }), _jsx(Input, { id: "name", ...register('name') }), errors.name && (_jsx("p", { className: "text-sm text-red-500", children: errors.name.message }))] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "industry", children: "Industry *" }), _jsx(Input, { id: "industry", ...register('industry') }), errors.industry && (_jsx("p", { className: "text-sm text-red-500", children: errors.industry.message }))] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "status", children: "Status *" }), _jsxs("select", { className: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm", id: "status", ...register('status'), children: [_jsx("option", { value: "Active", children: "Active" }), _jsx("option", { value: "Inactive", children: "Inactive" }), _jsx("option", { value: "Pending", children: "Pending" })] }), errors.status && (_jsx("p", { className: "text-sm text-red-500", children: errors.status.message }))] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "contact", children: "Primary Contact *" }), _jsx(Input, { id: "contact", ...register('contact') }), errors.contact && (_jsx("p", { className: "text-sm text-red-500", children: errors.contact.message }))] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "email", children: "Email Address *" }), _jsx(Input, { id: "email", ...register('email'), type: "email" }), errors.email && (_jsx("p", { className: "text-sm text-red-500", children: errors.email.message }))] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setShowForm(false), children: "Cancel" }), _jsx(Button, { type: "submit", children: formMode === 'add' ? 'Add Customer' : 'Save Changes' })] })] })] }) })] }));
};
export default CustomersPage;
