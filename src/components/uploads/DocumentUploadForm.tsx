
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UploadCloud, FileText, Archive } from 'lucide-react';
import { isZipFile, uploadDocument } from '@/utils/upload-service';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

// Document types
const DOCUMENT_TYPES = [
  { id: 'contract', name: 'Supplier Contract' },
  { id: 'price_list', name: 'Price List' },
  { id: 'specification', name: 'Product Specifications' },
  { id: 'certification', name: 'Quality Certification' },
  { id: 'invoice', name: 'Invoice' },
  { id: 'other', name: 'Other Document' },
];

type DocumentUploadFormProps = {
  supplierId?: string;
  onUploadComplete?: () => void;
};

export function DocumentUploadForm({ supplierId, onUploadComplete }: DocumentUploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingMessage, setProcessingMessage] = useState('');
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      
      // Auto-populate name if empty
      if (!documentName) {
        setDocumentName(file.name.replace(/\.[^/.]+$/, ""));
      }
      
      // Log file selection for debugging
      console.log(`File selected: ${file.name}, size: ${file.size} bytes, type: ${file.type}`);
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
      const file = event.dataTransfer.files[0];
      setSelectedFile(file);
      
      // Auto-populate name if empty
      if (!documentName) {
        setDocumentName(file.name.replace(/\.[^/.]+$/, ""));
      }
      
      // Log file drop for debugging
      console.log(`File dropped: ${file.name}, size: ${file.size} bytes, type: ${file.type}`);
    }
  };
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedFile || !documentName || !documentType) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      console.log("Starting upload process...");
      
      const success = await uploadDocument({
        file: selectedFile,
        documentName,
        documentType,
        expiryDate,
        onProgress: setUploadProgress,
        onProcessingMessage: setProcessingMessage
      });
      
      if (success) {
        // Reset form
        setSelectedFile(null);
        setDocumentName('');
        setDocumentType('');
        setExpiryDate('');
        
        if (onUploadComplete) {
          onUploadComplete();
        }
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Unknown error');
    } finally {
      setIsUploading(false);
      setProcessingMessage("");
    }
  };
  
  const removeFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setProcessingMessage("");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>
          Upload documents, specifications, or ZIP archives containing multiple files
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="document-name" className="required">Document Name</Label>
            <Input
              id="document-name"
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              placeholder="Enter document name"
              required
              disabled={isUploading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="document-type" className="required">Document Type</Label>
            <Select
              value={documentType}
              onValueChange={setDocumentType}
              disabled={isUploading}
              required
            >
              <SelectTrigger id="document-type">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {DOCUMENT_TYPES.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiry-date">Expiry Date (if applicable)</Label>
            <Input
              id="expiry-date"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              disabled={isUploading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="document-file" className="required">Upload File</Label>
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
                {selectedFile && isZipFile(selectedFile) ? (
                  <Archive className="h-10 w-10 text-amber-500 mb-2" />
                ) : (
                  <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                )}
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your document here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Supports PDF, Word, Excel, ZIP and image files
                </p>
                <input
                  id="document-file"
                  name="file"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip"
                  onChange={handleFileChange}
                  required
                  disabled={isUploading}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isUploading}
                  onClick={() => document.getElementById('document-file')?.click()}
                >
                  Select File
                </Button>
              </div>
              {selectedFile && (
                <div className="mt-4 p-2 bg-muted rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Selected:</span>
                      {selectedFile.name}
                      <span className="text-muted-foreground">
                        ({Math.round(selectedFile.size / 1024)} KB)
                      </span>
                      {isZipFile(selectedFile) && (
                        <span className="text-amber-600 text-xs font-medium px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900 dark:text-amber-300">
                          ZIP
                        </span>
                      )}
                    </div>
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="sm" 
                      onClick={removeFile}
                      disabled={isUploading}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {selectedFile && isZipFile(selectedFile) && (
            <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-900">
              <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertTitle className="text-blue-800 dark:text-blue-300">
                ZIP Archive Detected
              </AlertTitle>
              <AlertDescription className="text-blue-700 dark:text-blue-400">
                The contents of this ZIP file will be automatically extracted and registered
                as individual documents after upload.
              </AlertDescription>
            </Alert>
          )}

          {isUploading && (
            <div className="space-y-2 bg-slate-50 dark:bg-slate-800 p-3 rounded-md border">
              <div className="flex justify-between text-sm mb-1">
                <span>{processingMessage || "Uploading..."}</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={!selectedFile || !documentName || !documentType || isUploading}
          >
            <UploadCloud className="h-4 w-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
