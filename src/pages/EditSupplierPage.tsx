
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SupplierForm } from '@/components/suppliers/SupplierForm';
import { useDeleteSupplier, useSupplier } from '@/hooks/use-suppliers';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditSupplierPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: supplier, isLoading, error } = useSupplier(id);
  const { mutate: deleteSupplier } = useDeleteSupplier();
  
  const handleDelete = () => {
    if (id && window.confirm(`Are you sure you want to delete supplier "${supplier?.name}"?`)) {
      deleteSupplier(id, {
        onSuccess: () => {
          navigate('/beta1/suppliers');
        }
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Supplier</h1>
          <p className="text-muted-foreground">Loading supplier details...</p>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (error || !supplier) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Supplier</h1>
          <p className="text-muted-foreground text-red-500">
            Error loading supplier details. The supplier may not exist.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Supplier</h1>
        <p className="text-muted-foreground">
          Update supplier information for {supplier.name}
        </p>
      </div>
      
      <SupplierForm 
        initialData={supplier} 
        isEditing={true}
        onDelete={handleDelete}
      />
    </div>
  );
}
