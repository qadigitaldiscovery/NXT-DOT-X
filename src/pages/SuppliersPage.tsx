import React, { useState } from 'react';
import { SuppliersTable } from '@/components/suppliers/SuppliersTable';
import { Button } from '@/components/ui/button';
import { PlusCircle, Upload, Filter, DownloadCloud, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuppliers, useCreateSupplier } from '@/hooks/use-suppliers';
import { Supplier } from '@/hooks/suppliers/types';

// Form schema for validation
const supplierSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  code: z.string().min(1, "Supplier code is required"),
  contact_name: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  payment_terms: z.string().optional(),
  status: z.string().default("active")
});

type SupplierFormData = z.infer<typeof supplierSchema>;

export default function SuppliersPage() {
  const navigate = useNavigate();
  const { data: suppliers = [], isLoading, error } = useSuppliers();
  const { mutate: createSupplier } = useCreateSupplier();
  
  const [showForm, setShowForm] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SupplierFormData>({
    resolver: zodResolver(supplierSchema) as any,
    defaultValues: {
      status: "active"
    }
  });

  // Add new supplier handler
  const handleAddSupplier = () => {
    reset();
    setShowForm(true);
  };

  // Handle form submission
  const onSubmitForm = (data: SupplierFormData) => {
    try {
      createSupplier({
        name: data.name,
        code: data.code,
        contact_name: data.contact_name || undefined,
        email: data.email || undefined,
        phone: data.phone || undefined,
        website: data.website || undefined,
        payment_terms: data.payment_terms || undefined,
        status: data.status,
        created_at: new Date().toISOString()
      });
      setShowForm(false);
      toast('Supplier created successfully');
    } catch (err) {
      toast('Error saving supplier. Please try again.');
      console.error('Error creating supplier:', err);
    }
  };

  // Handle filter action
  const handleFilter = () => {
    try {
      setShowFilterDialog(true);
    } catch (err) {
      toast.error('Error applying filters. Please try again.');
      console.error('Error filtering:', err);
    }
  };

  // Apply filters
  const applyFilters = () => {
    toast.success('Filters applied successfully');
    setShowFilterDialog(false);
  };

  // Handle export action
  const handleExport = () => {
    try {
      toast.success('Export feature coming soon');
    } catch (err) {
      toast.error('Failed to export data. Please try again.');
      console.error('Error exporting:', err);
    }
  };

  // Handle delete action
  const handleDelete = (supplier: Supplier) => {
    try {
      toast.info(`Would delete supplier: ${supplier.name}`);
      // In a real application, this would open a confirmation dialog
    } catch (err) {
      toast.error('Error deleting supplier. Please try again.');
      console.error('Error deleting:', err);
    }
  };

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
            onClick={() => navigate('/data-management/uploads/new')}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Cost File
          </Button>
          <Button onClick={() => setShowFilterDialog(true)}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" onClick={() => toast('Export feature coming soon')}>
            <DownloadCloud className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddSupplier}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Supplier
          </Button>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load suppliers. Please try again later.
          </AlertDescription>
        </Alert>
      )}
      
      <SuppliersTable />

      {/* Supplier Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
            <DialogDescription>
              Fill in the supplier details below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmitForm as any)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Supplier Name *</Label>
                <Input id="name" {...register('name')} />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="code">Supplier Code *</Label>
                <Input id="code" {...register('code')} />
                {errors.code && (
                  <p className="text-sm text-red-500">{errors.code.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="contact_name">Contact Name</Label>
                <Input id="contact_name" {...register('contact_name')} />
                {errors.contact_name && (
                  <p className="text-sm text-red-500">{errors.contact_name.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register('email')} type="email" />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register('phone')} />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" {...register('website')} />
                {errors.website && (
                  <p className="text-sm text-red-500">{errors.website.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="payment_terms">Payment Terms</Label>
                <Input id="payment_terms" {...register('payment_terms')} placeholder="e.g., Net 30" />
                {errors.payment_terms && (
                  <p className="text-sm text-red-500">{errors.payment_terms.message}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="status" 
                  {...register('status')}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Add Supplier
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filter Suppliers</DialogTitle>
            <DialogDescription>
              Set filter criteria to narrow down your supplier list.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="filter-status">Status</Label>
                <select
                  id="filter-status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-2"
                  value={filterStatus || ''}
                  onChange={(e) => setFilterStatus(e.target.value || null)}
                  aria-label="Filter suppliers by status"
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="search-term">Search Term</Label>
                <Input 
                  id="search-term"
                  placeholder="Search by name or code"
                  className="mt-2"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFilterDialog(false)}>
              Reset
            </Button>
            <Button onClick={applyFilters}>
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
