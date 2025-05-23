
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface FileUploadFormProps {
  onUpload?: (files: File[]) => void;
  acceptedFileTypes?: string;
  maxFileSize?: number;
}

interface Supplier {
  id: string;
  name: string;
}

interface SupplierMatchDialogProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  suppliers: Supplier[];
  onSupplierSelected: (id: string) => void;
}

// Simple placeholder component
const SupplierMatchDialog: React.FC<SupplierMatchDialogProps> = ({ 
  open, 
  onOpenChange, 
  suppliers, 
  onSupplierSelected 
}) => {
  return (
    <div className={`${open ? 'block' : 'hidden'} p-4 border rounded shadow-lg`}>
      <h3 className="text-lg font-bold mb-4">Select a Supplier</h3>
      <div className="space-y-2">
        {suppliers.map(supplier => (
          <div 
            key={supplier.id} 
            className="p-2 border rounded cursor-pointer hover:bg-gray-100"
            onClick={() => {
              onSupplierSelected(supplier.id);
              onOpenChange(false);
            }}
          >
            {supplier.name}
          </div>
        ))}
      </div>
      <Button 
        className="mt-4" 
        variant="outline" 
        onClick={() => onOpenChange(false)}
      >
        Cancel
      </Button>
    </div>
  );
};

const FileUploadForm: React.FC<FileUploadFormProps> = ({ 
  onUpload,
  acceptedFileTypes = ".csv,.xlsx,.xls",
  maxFileSize = 10 // MB
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [supplierDialogOpen, setSupplierDialogOpen] = useState(false);
  const [detectedSupplier, setDetectedSupplier] = useState<string | null>(null);
  const [suppliers] = useState<Supplier[]>([
    { id: '1', name: 'Supplier A' },
    { id: '2', name: 'Supplier B' },
    { id: '3', name: 'Supplier C' },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    
    const fileArray = Array.from(selectedFiles);
    
    // Check file size
    const oversizedFiles = fileArray.filter(file => file.size > maxFileSize * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error(`Some files exceed the maximum size of ${maxFileSize}MB`);
      return;
    }
    
    setFiles(fileArray);
    
    // Mock supplier detection
    if (fileArray.length > 0) {
      const randomSupplier = Math.floor(Math.random() * 3) + 1;
      setDetectedSupplier(`${randomSupplier}`);
      setSupplierDialogOpen(true);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select a file to upload');
      return;
    }
    
    setUploading(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onUpload) {
        onUpload(files);
      }
      
      toast.success('Files uploaded successfully');
      setFiles([]);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  const handleSupplierSelected = (supplierId: string) => {
    console.log(`Supplier selected: ${supplierId}`);
    toast.success(`Supplier matched successfully`);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="file-upload">Select files to upload</Label>
        <Input
          id="file-upload"
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
          multiple
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">
          Accepted formats: {acceptedFileTypes.replace(/\./g, '').replace(/,/g, ', ')}
        </p>
      </div>
      
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="font-medium">Selected files:</p>
          <ul className="list-disc list-inside">
            {files.map((file, index) => (
              <li key={index} className="text-sm">
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <Button 
        onClick={handleUpload}
        disabled={files.length === 0 || uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Files'}
      </Button>
      
      {/* Supplier Match Dialog */}
      <SupplierMatchDialog
        open={supplierDialogOpen}
        onOpenChange={setSupplierDialogOpen}
        suppliers={suppliers}
        onSupplierSelected={handleSupplierSelected}
      />
    </div>
  );
};

export default FileUploadForm;
