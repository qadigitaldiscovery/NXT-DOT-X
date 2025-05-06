
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
import { UploadCloud } from 'lucide-react';

type FileUploadFormProps = {
  supplierId?: string;
  onUploadComplete?: () => void;
};

export function FileUploadForm({ supplierId, onUploadComplete }: FileUploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<string>(supplierId || '');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
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
    
    if (!selectedFile || !selectedSupplier) {
      return;
    }
    
    setIsUploading(true);
    
    createUpload(
      {
        supplier_id: selectedSupplier,
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
        onError: () => {
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
              <Label htmlFor="supplier">Select Supplier</Label>
              <Select
                value={selectedSupplier}
                onValueChange={setSelectedSupplier}
                disabled={isUploading}
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
            disabled={!selectedFile || !selectedSupplier || isUploading}
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
