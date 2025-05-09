
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
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import { DropZone } from './form/DropZone';
import { SupplierSelector } from './form/SupplierSelector';
import { FilePreview } from './form/FilePreview';
import { SupplierMatchDialog } from './form/SupplierMatchDialog';

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
  const [detectedSupplier, setDetectedSupplier] = useState<string | null>(null);
  const [showMatchDialog, setShowMatchDialog] = useState(false);
  
  const { data: suppliers = [], isLoading: isSuppliersLoading } = useSuppliers();
  const { mutate: createUpload } = useCreateSupplierUpload();
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    
    if (!selectedSupplier && !useHoldingBucket) {
      // If we detected a supplier but haven't matched it yet, show the dialog
      if (detectedSupplier && !showMatchDialog) {
        setShowMatchDialog(true);
        return;
      }
      
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
          setDetectedSupplier(null);
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

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    setDetectedSupplier(null); // Reset detected supplier when file changes
  };
  
  const handleSupplierDetection = (supplierName: string) => {
    setDetectedSupplier(supplierName);
    
    // Check if we can automatically match the supplier
    const matchingSupplier = suppliers.find(
      s => s.name.toLowerCase() === supplierName.toLowerCase()
    );
    
    if (matchingSupplier) {
      // Exact match found, auto-select
      setSelectedSupplier(matchingSupplier.id);
      toast.info(`Automatically matched to supplier: ${matchingSupplier.name}`);
    } else if (!supplierId && !selectedSupplier && !useHoldingBucket) {
      // No exact match and no supplier selected yet - show helper message
      toast.info(
        "Supplier detected in file. Click 'Match Supplier' to assign or create.",
        {
          duration: 5000,
          action: {
            label: "Match Now",
            onClick: () => setShowMatchDialog(true),
          },
        }
      );
    }
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
          {selectedFile && (
            <FilePreview 
              file={selectedFile} 
              onDetectedSupplier={handleSupplierDetection} 
            />
          )}
          
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
              onFileChange={handleFileChange}
              selectedFile={selectedFile}
              isUploading={isUploading}
            />
          </div>
          
          {detectedSupplier && !supplierId && !useHoldingBucket && (
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                disabled={isUploading || !selectedFile}
                onClick={() => setShowMatchDialog(true)}
              >
                Match Supplier
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={(!selectedSupplier && !useHoldingBucket) || !selectedFile || isUploading}
            loading={isUploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload File'}
          </Button>
        </CardFooter>
      </form>
      
      <SupplierMatchDialog
        open={showMatchDialog}
        onOpenChange={setShowMatchDialog}
        detectedSupplier={detectedSupplier}
        suppliers={suppliers}
        onSupplierSelected={(id) => {
          setSelectedSupplier(id);
          toast.success("Supplier matched successfully");
        }}
      />
    </Card>
  );
}
