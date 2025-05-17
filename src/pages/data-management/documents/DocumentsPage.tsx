import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentsTable } from '@/components/uploads/DocumentsTable';
import { DocumentUploadForm } from '@/components/uploads/DocumentUploadForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tag, FilePlus2, FileArchive, Upload, Download, Share2, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null);
  const [shareEmail, setShareEmail] = useState('');
  
  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        // If we wanted to simulate an error: throw new Error('Failed to load documents');
      } catch (err) {
        console.error('Error loading documents:', err);
        setError('Failed to load documents. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [refreshKey]);

  const handleUploadComplete = () => {
    setActiveTab('all-documents');
    setRefreshKey(prev => prev + 1);
    toast.success('Document uploaded successfully!');
  };
  
  // Get the selected supplier object
  const selectedSupplierObj = selectedSupplier 
    ? suppliers.find(s => s.id === selectedSupplier) 
    : undefined;
  
  // Handle download action
  const handleDownload = () => {
    try {
      toast.success('Downloading documents...');
      // In a real application, this would trigger a download
    } catch (err) {
      toast.error('Failed to download documents. Please try again.');
      console.error('Error downloading:', err);
    }
  };
  
  // Handle share action
  const handleShare = (document: any) => {
    try {
      setSelectedDocument(document);
      setShareEmail('');
      setShowShareDialog(true);
    } catch (err) {
      toast.error('Error preparing to share document. Please try again.');
      console.error('Error sharing:', err);
    }
  };
  
  // Handle delete action
  const handleDelete = (document: any) => {
    try {
      setSelectedDocument(document);
      setShowDeleteDialog(true);
    } catch (err) {
      toast.error('Error preparing to delete document. Please try again.');
      console.error('Error deleting:', err);
    }
  };
  
  // Confirm share
  const confirmShare = () => {
    try {
      if (!shareEmail) {
        toast.error('Please enter an email address');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(shareEmail)) {
        toast.error('Please enter a valid email address');
        return;
      }
      
      toast.success(`Document shared with ${shareEmail}`);
      setShowShareDialog(false);
    } catch (err) {
      toast.error('Error sharing document. Please try again.');
      console.error('Error in share confirmation:', err);
    }
  };
  
  // Confirm delete
  const confirmDelete = () => {
    try {
      toast.success('Document deleted successfully');
      setShowDeleteDialog(false);
      setRefreshKey(prev => prev + 1); // Refresh the list
    } catch (err) {
      toast.error('Error deleting document. Please try again.');
      console.error('Error in delete confirmation:', err);
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Document Repository</h1>
          <p className="text-muted-foreground">
            Manage supplier contracts, specifications and other documents
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" onClick={() => handleShare({ name: 'Selected Documents' })}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" onClick={() => handleDelete({ name: 'Selected Documents' })}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button onClick={() => setActiveTab('upload-document')}>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
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
          <DocumentsTable 
            key={`documents-all-${refreshKey}`} 
            onShare={handleShare}
            onDelete={handleDelete}
          />
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
                onShare={handleShare}
                onDelete={handleDelete}
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
      
      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Document</DialogTitle>
            <DialogDescription>
              {selectedDocument ? `Share "${selectedDocument.name}" with others.` : 'Share documents with others.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Recipient Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="colleague@example.com" 
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Input id="message" placeholder="Here are the documents you requested..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmShare}>
              Share
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              {selectedDocument 
                ? `Are you sure you want to delete "${selectedDocument.name}"?` 
                : 'Are you sure you want to delete the selected documents?'
              } This action cannot be undone.
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
    </div>
  );
}
