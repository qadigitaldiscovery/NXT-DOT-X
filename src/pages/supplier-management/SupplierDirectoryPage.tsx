
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { SuppliersTable } from '@/components/suppliers/SuppliersTable';
import { useSuppliers } from '@/hooks/use-suppliers';
import { PlusCircle, Search, RefreshCw, Upload } from 'lucide-react';
import { BulkSupplierUpload } from '@/components/uploads/BulkSupplierUpload';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { SupplierManagementLayout } from '@/components/layout/SupplierManagementLayout';

const SupplierDirectoryPageContent = () => {
  const navigate = useNavigate();
  const { refetch } = useSuppliers();
  const [showBulkUploadDialog, setShowBulkUploadDialog] = useState(false);
  
  const handleAddSupplier = () => {
    navigate('/supplier-management/new');
  };

  const handleRefresh = () => {
    refetch();
    toast.success("Supplier data refreshed");
  };

  const handleBulkUpload = () => {
    setShowBulkUploadDialog(true);
  };

  const handleEdit = (id: string) => {
    navigate(`/supplier-management/${id}`);
  };
  
  const handleDelete = (id: string) => {
    // In a real implementation, this would open a confirmation dialog
    toast.info(`Would delete supplier with ID: ${id}`);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Supplier Directory</h1>
        <p className="text-muted-foreground mt-2">
          Manage your supplier information and relationships
        </p>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
            variant="outline"
            onClick={handleBulkUpload}
            className="flex items-center gap-1"
          >
            <Upload className="h-4 w-4" />
            Bulk Import
          </Button>
        </div>
        <Button 
          onClick={handleAddSupplier}
          className="flex items-center gap-1"
        >
          <PlusCircle className="h-4 w-4" />
          Add Supplier
        </Button>
      </div>
      
      <SuppliersTable 
        onDelete={handleDelete}
        onEdit={handleEdit}
        onRefresh={handleRefresh}
      />

      {/* Bulk Supplier Import Dialog */}
      <Dialog open={showBulkUploadDialog} onOpenChange={setShowBulkUploadDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Bulk Supplier Import</DialogTitle>
          </DialogHeader>
          <BulkSupplierUpload />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const SupplierDirectoryPage = () => {
  return (
    <SupplierManagementLayout>
      <SupplierDirectoryPageContent />
    </SupplierManagementLayout>
  );
};

export default SupplierDirectoryPage;
