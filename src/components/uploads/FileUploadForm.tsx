
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';

interface FileUploadFormProps {
  supplierId?: string;
  onUploadComplete?: () => void;
  allowHoldingBucket?: boolean;
}

export const FileUploadForm: React.FC<FileUploadFormProps> = ({
  supplierId,
  onUploadComplete,
  allowHoldingBucket = false
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    
    // Mock upload
    setTimeout(() => {
      console.log('File uploaded:', selectedFile.name);
      setUploading(false);
      setSelectedFile(null);
      if (onUploadComplete) {
        onUploadComplete();
      }
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload File</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="file">Select File</Label>
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            accept=".csv,.xlsx,.xls"
          />
        </div>
        
        {selectedFile && (
          <div className="text-sm text-muted-foreground">
            Selected: {selectedFile.name}
          </div>
        )}
        
        <Button 
          onClick={handleUpload} 
          disabled={!selectedFile || uploading}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload File'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FileUploadForm;
