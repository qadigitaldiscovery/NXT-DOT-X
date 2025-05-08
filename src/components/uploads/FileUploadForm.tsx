
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
import { useSuppliers } from '@/hooks/use-suppliers';
import { useCreateSupplierUpload } from '@/hooks/use-supplier-uploads';
import { UploadCloud } from 'lucide-react';
import { toast } from 'sonner';
import { DropZone } from './form/DropZone';
import { SupplierSelector } from './form/SupplierSelector';

type FileUploadFormProps = {
  supplierId?: string;
  onUploadComplete?: () => void;
  allowHoldingBucket?: boolean;
};

export function FileUploadForm({ 
  supplierId, 
  onUploadComplete, 
  allowHoldingBucket = false 
}: FileUploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<string>(supplierId || '');
  const [isUploading, setIsUploading] = useState(false);
  const [useHoldingBucket, setUseHoldingBucket] = useState(false);
  
  const { data: suppliers = [] } = useSuppliers();
  const { mutate: createUpload } = useCreateSupplierUpload();
  
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
            <SupplierSelector
              suppliers={suppliers}
              selectedSupplier={selectedSupplier}
              onSupplierSelect={setSelectedSupplier}
              isUploading={isUploading}
              useHoldingBucket={useHoldingBucket}
              allowHoldingBucket={allowHoldingBucket}
              onHoldingBucketChange={setUseHoldingBucket}
            />
          )}
          
          <div className="space-y-2">
            <DropZone
              onFileChange={setSelectedFile}
              selectedFile={selectedFile}
              isUploading={isUploading}
            />
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
