import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useSuppliers } from '@/hooks/use-suppliers';
import { useCreateSupplierUpload } from '@/hooks/use-supplier-uploads';
import { UploadCloud, InfoIcon } from 'lucide-react';
import { toast } from 'sonner';

type FileUploadFormProps = {
  supplierId?: string;
  onUploadComplete?: () => void;
  allowHoldingBucket?: boolean;
};

export function FileUploadForm({ supplierId, onUploadComplete, allowHoldingBucket = false }: FileUploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<string>(supplierId || '');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [useHoldingBucket, setUseHoldingBucket] = useState(false);
  
  const { data: suppliers = [] } = useSuppliers();
  const { mutate: createUpload } = useCreateSupplierUpload();
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };
  
  const handleDrag = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true);
    } else if (event.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    
    if (!selectedSupplier && !useHoldingBucket) {
      toast.error("Please select a supplier or use the holding bucket option");
      return;
    }
    
    setIsUploading(true);
    
    createUpload(
      {
        supplier_id: useHoldingBucket ? 'holding' : selectedSupplier,
        file: selectedFile,
        source: 'direct'
      },
      {
        onSuccess: () => {
          setSelectedFile(null);
          if (onUploadComplete) {
            onUploadComplete();
          }
          setIsUploading(false);
        },
        onError: (error) => {
          console.error('Upload error:', error);
          toast.error(`Upload failed: ${error.message || 'Unknown error'}`);
          setIsUploading(false);
        }
      }
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Supplier Cost File</CardTitle>
        <CardDescription>
          Upload CSV, Excel, or PDF files containing supplier cost data
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {!supplierId && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="supplier">Select Supplier</Label>
                
                {allowHoldingBucket && (
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="holding-bucket"
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      checked={useHoldingBucket}
                      onChange={() => setUseHoldingBucket(!useHoldingBucket)}
                      disabled={isUploading}
                    />
                    <Label 
                      htmlFor="holding-bucket" 
                      className="text-sm font-normal cursor-pointer flex items-center"
                    >
                      Upload to holding bucket for later allocation
                    </Label>
                  </div>
                )}
              </div>
              
              {!useHoldingBucket && (
                <Select
                  value={selectedSupplier}
                  onValueChange={setSelectedSupplier}
                  disabled={isUploading || useHoldingBucket}
                >
                  <SelectTrigger id="supplier">
                    <SelectValue placeholder="Select a supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              {useHoldingBucket && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800">
                  The file will be uploaded to a holding bucket and can be assigned to a supplier later.
                </div>
              )}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="file">Upload File</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 ${
                dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
              } transition-colors`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center text-center">
                <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your file here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Supports CSV, Excel (.xlsx, .xls), and PDF files
                </p>
                <input
                  id="file"
                  name="file"
                  type="file"
                  className="hidden"
                  accept=".csv,.xls,.xlsx,.pdf"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isUploading}
                  onClick={() => document.getElementById('file')?.click()}
                >
                  Select File
                </Button>
              </div>
              {selectedFile && (
                <div className="mt-4 p-2 bg-muted rounded-md">
                  <p className="text-sm flex items-center gap-2">
                    <span className="font-medium">Selected:</span>
                    {selectedFile.name}
                    <span className="text-muted-foreground">
                      ({Math.round(selectedFile.size / 1024)} KB)
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={(!selectedSupplier && !useHoldingBucket) || !selectedFile || isUploading}
            loading={isUploading}
          >
            <UploadCloud className="h-4 w-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload File'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
