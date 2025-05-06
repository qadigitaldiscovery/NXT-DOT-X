
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { FileUp, Trash2, FileCheck, Upload } from 'lucide-react';

// Mock data for suppliers
const suppliers = [
  { id: 1, name: "AudioTech Pro" },
  { id: 2, name: "VisualEdge" },
  { id: 3, name: "SoundVision" },
  { id: 4, name: "MediaMax" },
  { id: 5, name: "ElectroAV" },
];

// Mock data for uploaded files
const initialUploads = [
  { 
    id: 1, 
    filename: "audiotech_prices_may.csv", 
    supplier: "AudioTech Pro", 
    date: "2025-05-02", 
    status: "Processed",
    products: 450,
    newItems: 12
  },
  { 
    id: 2, 
    filename: "visualedge_q2_update.xlsx", 
    supplier: "VisualEdge", 
    date: "2025-05-01", 
    status: "Processed",
    products: 320,
    newItems: 5
  },
];

const SupplierCosting = () => {
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploads, setUploads] = useState(initialUploads);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !selectedSupplier) {
      toast({
        title: "Upload Error",
        description: "Please select both a supplier and a file.",
        variant: "destructive",
      });
      return;
    }

    // Simulate successful upload
    const newUpload = {
      id: uploads.length + 1,
      filename: selectedFile.name,
      supplier: suppliers.find(s => s.id.toString() === selectedSupplier)?.name || "Unknown",
      date: new Date().toISOString().split('T')[0],
      status: "Processing",
      products: Math.floor(Math.random() * 300) + 200,
      newItems: Math.floor(Math.random() * 20)
    };

    setUploads([newUpload, ...uploads]);
    setSelectedFile(null);
    setSelectedSupplier("");
    
    // Reset file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';

    toast({
      title: "File Uploaded",
      description: `${selectedFile.name} has been uploaded and is now processing.`,
    });

    // Simulate processing completion after delay
    setTimeout(() => {
      setUploads(prev => 
        prev.map(upload => 
          upload.id === newUpload.id ? {...upload, status: "Processed"} : upload
        )
      );
      
      toast({
        title: "Processing Complete",
        description: `${newUpload.filename} has been processed successfully.`,
      });
    }, 2000);
  };

  const handleDeleteUpload = (id: number) => {
    setUploads(uploads.filter(upload => upload.id !== id));
    
    toast({
      title: "File Deleted",
      description: "The file has been removed from the system.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Supplier Costing</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Upload Supplier Data</CardTitle>
          <CardDescription>
            Upload CSV or Excel files with your supplier's cost data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supplier">Select Supplier</Label>
                <Select 
                  value={selectedSupplier} 
                  onValueChange={setSelectedSupplier}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map(supplier => (
                      <SelectItem 
                        key={supplier.id} 
                        value={supplier.id.toString()}
                      >
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="file-upload">Upload File</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileChange}
                  />
                </div>
                {selectedFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleUpload} disabled={!selectedFile || !selectedSupplier}>
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Uploads</CardTitle>
          <CardDescription>
            History of supplier cost data uploads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Filename</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>New Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uploads.map((upload) => (
                <TableRow key={upload.id}>
                  <TableCell className="font-medium">{upload.filename}</TableCell>
                  <TableCell>{upload.supplier}</TableCell>
                  <TableCell>{upload.date}</TableCell>
                  <TableCell>{upload.products}</TableCell>
                  <TableCell>{upload.newItems}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {upload.status === "Processed" ? (
                        <FileCheck className="mr-1 h-4 w-4 text-green-500" />
                      ) : (
                        <FileUp className="mr-1 h-4 w-4 text-amber-500" />
                      )}
                      {upload.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteUpload(upload.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {uploads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No uploads found. Upload a new file to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierCosting;
