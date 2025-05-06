
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSupplier } from '@/hooks/use-suppliers';
import { CostsList } from '@/components/costs/CostsList';
import { SupplierUploadsTable } from '@/components/uploads/SupplierUploadsTable';
import { FileUploadForm } from '@/components/uploads/FileUploadForm';
import { Skeleton } from '@/components/ui/skeleton';

export default function SupplierCostsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: supplier, isLoading } = useSupplier(id);
  const [activeTab, setActiveTab] = useState('costs');
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleUploadComplete = () => {
    setActiveTab('uploads');
    setRefreshKey(prev => prev + 1);
  };
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }
  
  if (!supplier) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Supplier Not Found</h1>
          <p className="text-muted-foreground">
            The supplier you're looking for could not be found.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{supplier.name}</h1>
        <p className="text-muted-foreground">
          Manage cost data and file uploads for {supplier.name}
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="costs">Costs</TabsTrigger>
          <TabsTrigger value="uploads">Uploads</TabsTrigger>
          <TabsTrigger value="upload-new">Upload New File</TabsTrigger>
        </TabsList>
        <TabsContent value="costs" className="pt-4">
          <CostsList supplier={supplier} />
        </TabsContent>
        <TabsContent value="uploads" className="pt-4">
          <SupplierUploadsTable 
            key={`uploads-${refreshKey}`}
            supplier={supplier} 
          />
        </TabsContent>
        <TabsContent value="upload-new" className="pt-4">
          <div className="max-w-md mx-auto">
            <FileUploadForm 
              supplierId={supplier.id} 
              onUploadComplete={handleUploadComplete}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
