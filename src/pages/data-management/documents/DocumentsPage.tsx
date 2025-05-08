
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentsTable } from '@/components/uploads/DocumentsTable';
import { DocumentUploadForm } from '@/components/uploads/DocumentUploadForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tag, FilePlus2, FileArchive } from 'lucide-react';

// Sample suppliers for the dropdown
const suppliers = [
  { id: '1', name: 'AudioTech Pro' },
  { id: '2', name: 'VisualEdge' },
  { id: '3', name: 'SoundVision' },
  { id: '4', name: 'MediaMax' }
];

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('all-documents');
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedSupplier, setSelectedSupplier] = useState<string | undefined>(undefined);
  
  const handleUploadComplete = () => {
    setActiveTab('all-documents');
    setRefreshKey(prev => prev + 1);
  };
  
  // Get the selected supplier object
  const selectedSupplierObj = selectedSupplier 
    ? suppliers.find(s => s.id === selectedSupplier) 
    : undefined;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Document Repository</h1>
        <p className="text-muted-foreground">
          Manage supplier contracts, specifications and other documents
        </p>
      </div>
      
      {/* Document statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="backdrop-blur-md bg-white/30 border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileArchive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">7 documents added this month</p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-md bg-white/30 border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Documents by Type</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6 Types</div>
            <p className="text-xs text-muted-foreground">Contracts, price lists, specifications...</p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-md bg-white/30 border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <FilePlus2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Documents expiring in the next 30 days</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all-documents">All Documents</TabsTrigger>
          <TabsTrigger value="by-supplier">By Supplier</TabsTrigger>
          <TabsTrigger value="upload-document">Upload New Document</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-documents" className="pt-4">
          <DocumentsTable key={`documents-all-${refreshKey}`} />
        </TabsContent>
        
        <TabsContent value="by-supplier" className="pt-4">
          <div className="grid gap-6">
            <Card className="backdrop-blur-md bg-white/30 border border-white/10">
              <CardHeader>
                <CardTitle>Filter by Supplier</CardTitle>
                <CardDescription>
                  View documents for a specific supplier
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-w-sm">
                  <Label htmlFor="supplier-select">Select Supplier</Label>
                  <Select 
                    value={selectedSupplier} 
                    onValueChange={setSelectedSupplier}
                  >
                    <SelectTrigger id="supplier-select">
                      <SelectValue placeholder="Choose a supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map(supplier => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            {selectedSupplierObj && (
              <DocumentsTable 
                key={`documents-supplier-${selectedSupplier}-${refreshKey}`} 
                supplier={selectedSupplierObj} 
              />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="upload-document" className="pt-4">
          <div className="max-w-md mx-auto">
            <DocumentUploadForm onUploadComplete={handleUploadComplete} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
