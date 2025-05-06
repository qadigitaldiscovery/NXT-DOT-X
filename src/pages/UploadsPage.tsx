
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupplierUploadsTable } from '@/components/uploads/SupplierUploadsTable';
import { FileUploadForm } from '@/components/uploads/FileUploadForm';

export default function UploadsPage() {
  const [activeTab, setActiveTab] = useState('recent');
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleUploadComplete = () => {
    setActiveTab('recent');
    setRefreshKey(prev => prev + 1);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">File Uploads</h1>
        <p className="text-muted-foreground">
          Manage supplier cost file uploads
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="recent">Recent Uploads</TabsTrigger>
          <TabsTrigger value="upload-new">Upload New File</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="pt-4">
          <SupplierUploadsTable key={`uploads-${refreshKey}`} />
        </TabsContent>
        <TabsContent value="upload-new" className="pt-4">
          <div className="max-w-md mx-auto">
            <FileUploadForm onUploadComplete={handleUploadComplete} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
