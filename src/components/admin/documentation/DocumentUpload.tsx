import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { DocumentCategory, DocumentType } from './types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadCloud, File } from 'lucide-react';
import { isZipFile, uploadDocument } from '@/utils/upload-service';

interface DocumentUploadProps {
  categories: DocumentCategory[];
  onFileUpload: (file: File, type: DocumentType, metadata: {
    title: string;
    description?: string;
    author: string;
    categoryId: string;
  }) => void;
}

export const DocumentUpload = ({ categories, onFileUpload }: DocumentUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [type, setType] = useState<DocumentType>('other');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingMessage, setProcessingMessage] = useState('');
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      
      // Auto-populate title from filename if empty
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
      
      // Auto-detect document type
      const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
      if (fileExt === 'md' || fileExt === 'markdown') {
        setType('markdown');
      } else if (fileExt === 'pdf') {
        setType('pdf');
      } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExt)) {
        setType('image');
      } else if (['txt', 'csv', 'html'].includes(fileExt)) {
        setType('text');
      } else {
        setType('other');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !title || !categoryId || !author) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // If it's a ZIP file, use our utility for zip extraction
      if (isZipFile(selectedFile)) {
        setProcessingMessage("Uploading ZIP archive...");
        
        const success = await uploadDocument({
          file: selectedFile,
          documentName: title,
          documentType: categoryId,
          onProgress: setUploadProgress,
          onProcessingMessage: setProcessingMessage
        });
        
        if (success) {
          toast.success('ZIP file uploaded and processed successfully');
          resetForm();
        }
      } else {
        // Otherwise use the normal document upload flow
        setProcessingMessage("Uploading document...");
        onFileUpload(selectedFile, type, {
          title,
          description,
          author,
          categoryId
        });
        resetForm();
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error('Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsUploading(false);
      setProcessingMessage('');
    }
  };
  
  const resetForm = () => {
    setSelectedFile(null);
    setTitle('');
    setDescription('');
    setAuthor('');
    setCategoryId('');
    setType('other');
    setUploadProgress(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Document Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter document title"
          disabled={isUploading}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-sm font-medium">
          Category <span className="text-red-500">*</span>
        </Label>
        <Select value={categoryId} onValueChange={setCategoryId} disabled={isUploading} required>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="author" className="text-sm font-medium">
          Author <span className="text-red-500">*</span>
        </Label>
        <Input
          id="author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Enter author name"
          disabled={isUploading}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Description
        </Label>
        <Input
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Enter document description (optional)"
          disabled={isUploading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="file" className="text-sm font-medium">
          Document File <span className="text-red-500">*</span>
        </Label>
        <div className="border-2 border-dashed rounded-md p-4 text-center">
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
            required
          />
          <div className="space-y-2">
            <div className="flex justify-center">
              <File className="h-10 w-10 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">
              {selectedFile 
                ? `Selected: ${selectedFile.name} (${Math.round(selectedFile.size / 1024)} KB)` 
                : 'Drag and drop or click to select'}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('file')?.click()}
              disabled={isUploading}
            >
              Select File
            </Button>
          </div>
        </div>
      </div>

      {selectedFile && isZipFile(selectedFile) && (
        <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
          <p className="text-sm text-blue-700">
            ZIP archive detected. Contents will be automatically extracted and stored as individual documents.
          </p>
        </div>
      )}

      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{processingMessage || 'Uploading...'}</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-2"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={!selectedFile || isUploading}
        className="w-full"
      >
        <UploadCloud className="mr-2 h-4 w-4" />
        {isUploading ? 'Uploading...' : 'Upload Document'}
      </Button>
    </form>
  );
};
