
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DocumentType, DocumentCategory } from './types';
import { uploadZipToStorage, registerExtractedFiles } from '@/services/zipService';
import { toast } from 'sonner';

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
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [documentType, setDocumentType] = useState<DocumentType>('markdown');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Try to set the document type based on file extension
      if (selectedFile.name.endsWith('.md')) {
        setDocumentType('markdown');
      } else if (selectedFile.name.endsWith('.pdf')) {
        setDocumentType('pdf');
      } else if (/\.(jpe?g|png|gif)$/i.test(selectedFile.name)) {
        setDocumentType('image');
      } else if (selectedFile.name.endsWith('.zip')) {
        setDocumentType('zip');
      } else if (selectedFile.name.endsWith('.txt')) {
        setDocumentType('text');
      } else {
        setDocumentType('other');
      }
      
      // Set a default title from the filename
      const fileName = selectedFile.name.split('.')[0];
      setTitle(fileName.replace(/[-_]/g, ' '));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !title || !categoryId || !author) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setIsUploading(true);
      
      if (documentType === 'zip') {
        // Handle zip files with the special service
        const uploaded = await uploadZipToStorage(file);
        if (uploaded) {
          await registerExtractedFiles(file.name);
          toast.success("ZIP file uploaded and extracted");
        }
      } else {
        // Handle regular document upload
        await onFileUpload(file, documentType, {
          title,
          description,
          author,
          categoryId
        });
      }
      
      // Reset form
      setFile(null);
      setTitle('');
      setDescription('');
      setAuthor('');
      setCategoryId('');
      
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload document");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="file-upload">Select File <span className="text-red-500">*</span></Label>
        <Input 
          id="file-upload" 
          type="file" 
          onChange={handleFileChange} 
          accept=".md,.pdf,.jpg,.jpeg,.png,.gif,.txt,.zip"
        />
        {file && <p className="text-xs text-gray-500 mt-1">Selected: {file.name}</p>}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="document-title">Title <span className="text-red-500">*</span></Label>
          <Input 
            id="document-title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Document title" 
            required
          />
        </div>
        
        <div>
          <Label htmlFor="document-author">Author <span className="text-red-500">*</span></Label>
          <Input 
            id="document-author" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name" 
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="document-category">Category <span className="text-red-500">*</span></Label>
          <Select value={categoryId} onValueChange={setCategoryId} required>
            <SelectTrigger id="document-category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="document-type">Document Type <span className="text-red-500">*</span></Label>
          <Select value={documentType} onValueChange={(value: DocumentType) => setDocumentType(value)}>
            <SelectTrigger id="document-type">
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="markdown">Markdown</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="zip">ZIP</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="document-description">Description</Label>
        <Textarea 
          id="document-description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description" 
          rows={3}
        />
      </div>
      
      <Button type="submit" disabled={isUploading} className="w-full">
        {isUploading ? 'Uploading...' : 'Upload Document'}
      </Button>
    </form>
  );
};

