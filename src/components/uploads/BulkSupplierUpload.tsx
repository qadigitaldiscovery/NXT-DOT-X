import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { uploadDocument, isZipFile } from '@/utils/upload-service';
import { AlertCircle, FileText, UploadCloud } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const BulkSupplierUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingMessage, setProcessingMessage] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Check if it's an Excel (xlsx, xls) or CSV file
      if (
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || // .xlsx
        file.type === 'application/vnd.ms-excel' || // .xls
        file.type === 'text/csv' || // .csv
        file.name.toLowerCase().endsWith('.xlsx') ||
        file.name.toLowerCase().endsWith('.xls') ||
        file.name.toLowerCase().endsWith('.csv')
      ) {
        setSelectedFile(file);
        setUploadError(null);
        setUploadProgress(0);
        setProcessingMessage('');
      } else {
        setSelectedFile(null);
        setUploadError('Please select a valid Excel (.xlsx, .xls) or CSV file.');
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please select a file to upload.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const success = await uploadDocument({
      file: selectedFile,
      documentName: `Bulk_Supplier_Upload_${new Date().toISOString().slice(0, 10)}`, // Example name
      documentType: 'supplier_data', // A category for supplier data
      onProgress: setUploadProgress,
      onProcessingMessage: setProcessingMessage,
    });

    if (success) {
      toast({
        title: 'Upload Successful',
        description: `${selectedFile.name} has been uploaded and is being processed.`,
      });
      setSelectedFile(null); // Clear selected file after successful upload
    } else {
      setUploadError('File upload failed. Please try again.');
      toast({
        title: 'Upload Failed',
        description: 'There was an error uploading your file. Please check the console for details.',
        variant: 'destructive',
      });
    }
    setIsUploading(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bulk Supplier Upload</CardTitle>
        <CardDescription>
          Upload an Excel or CSV file to import multiple supplier records at once.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="supplier-file">Supplier Data File</Label>
          <Input 
            id="supplier-file" 
            type="file" 
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleFileChange} 
            className="file:text-blue-500 file:bg-blue-50 file:rounded-md file:border-0 hover:file:bg-blue-100"
            disabled={isUploading}
          />
          {selectedFile && (
            <p className="text-sm text-muted-foreground mt-2">
              Selected: <span className="font-semibold">{selectedFile.name}</span> ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        {uploadError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{uploadError}</AlertDescription>
          </Alert>
        )}

        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{processingMessage || "Uploading..."}</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}

        <Button 
          onClick={handleUpload} 
          disabled={!selectedFile || isUploading}
          className="w-full"
        >
          <UploadCloud className="mr-2 h-4 w-4" />
          {isUploading ? 'Uploading...' : 'Upload Data'}
        </Button>

        <div className="border-t pt-4 mt-6 text-sm text-muted-foreground">
          <h3 className="text-md font-semibold mb-2">Instructions:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Ensure your file is in .xlsx, .xls, or .csv format.</li>
            <li>Each row should represent a single supplier.</li>
            <li>Include columns for: <span className="font-semibold">name (required), code (required), contact_name, email, phone, website, payment_terms, status (active/inactive)</span>.</li>
            <li>For optimal results, columns should match the expected schema.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
