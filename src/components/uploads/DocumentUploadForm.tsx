
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
import { UploadCloud, FileText } from 'lucide-react';

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
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      
      // Auto-populate name if empty
      if (!documentName) {
        setDocumentName(file.name.replace(/\.[^/.]+$/, ""));
      }
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
    }
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedFile || !documentName || !documentType) {
      toast.error("Please fill all required fields");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate document upload to server
    setTimeout(() => {
      toast.success(`Document "${documentName}" uploaded successfully`);
      
      // Reset form
      setSelectedFile(null);
      setDocumentName('');
      setDocumentType('');
      setExpiryDate('');
      setIsUploading(false);
      
      if (onUploadComplete) {
        onUploadComplete();
      }
    }, 1500);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Supplier Document</CardTitle>
        <CardDescription>
          Upload contract documents, specifications, or other supplier files
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
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="document-type" className="required">Document Type</Label>
            <Select
              value={documentType}
              onValueChange={setDocumentType}
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
                <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your document here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Supports PDF, Word, Excel and image files
                </p>
                <input
                  id="document-file"
                  name="file"
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
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
            disabled={!selectedFile || !documentName || !documentType || isUploading}
            loading={isUploading}
          >
            <UploadCloud className="h-4 w-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
