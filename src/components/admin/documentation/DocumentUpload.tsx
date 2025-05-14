
import React, { useState } from 'react';
import { Upload, File, X, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DocumentCategory, DocumentType } from './types';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface DocumentUploadProps {
  onFileUpload: (file: File, type: DocumentType, metadata: {
    title: string;
    description?: string;
    author: string;
    categoryId: string;
  }) => void;
  categories: DocumentCategory[];
  allowedTypes?: string[];
}

export const DocumentUpload = ({ 
  onFileUpload,
  categories,
  allowedTypes = ['.pdf', '.md', '.txt', '.jpg', '.jpeg', '.png', '.docx', '.xlsx', '.zip']
}: DocumentUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [author, setAuthor] = useState('');
  const [isProcessingZip, setIsProcessingZip] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);

  const getDocumentType = (file: File): DocumentType => {
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    
    if (extension === 'md' || extension === 'markdown') return 'markdown';
    if (extension === 'pdf') return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) return 'image';
    if (['txt', 'csv', 'html'].includes(extension)) return 'text';
    if (extension === 'zip') return 'zip';
    return 'other';
  };

  const isZipFile = (file: File) => {
    return file.name.toLowerCase().endsWith('.zip');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    const extension = selectedFile.name.split('.').pop()?.toLowerCase() || '';
    const formattedAllowedTypes = allowedTypes.map(type => type.replace('.', '').toLowerCase());
    
    if (!formattedAllowedTypes.includes(extension)) {
      toast.error(`File type not supported. Please upload: ${allowedTypes.join(', ')}`);
      return;
    }
    
    setFile(selectedFile);
    
    // Auto-populate title from filename
    if (!title) {
      setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const processZipFile = async (zipFile: File) => {
    try {
      setIsProcessingZip(true);
      setExtractionProgress(10);

      // First, upload the ZIP file to storage
      const filePath = `uploads/zip/${Date.now()}-${zipFile.name}`;
      setExtractionProgress(20);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, zipFile);

      if (uploadError) {
        toast.error(`Error uploading ZIP file: ${uploadError.message}`);
        setIsProcessingZip(false);
        return false;
      }
      setExtractionProgress(50);

      // Get public URL for the zip file
      const { data: urlData } = await supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      setExtractionProgress(60);

      // Call our edge function to extract the ZIP file
      const { data, error } = await supabase.functions.invoke('extract-zip', {
        body: {
          zipFileUrl: urlData.publicUrl,
          categoryId,
          author
        }
      });

      setExtractionProgress(90);

      if (error) {
        toast.error(`Error extracting ZIP file: ${error.message}`);
        setIsProcessingZip(false);
        return false;
      }

      setExtractionProgress(100);
      
      if (data.success) {
        toast.success(`Successfully extracted ${data.totalFiles} files from ZIP archive`);
        if (data.hasErrors) {
          toast.warning(`Failed to process ${data.errors.length} files from the ZIP archive`);
        }
        setIsProcessingZip(false);
        return true;
      } else {
        toast.error(`Failed to extract ZIP file: ${data.error}`);
        setIsProcessingZip(false);
        return false;
      }
    } catch (error) {
      console.error('Error processing ZIP file:', error);
      toast.error(`Error processing ZIP file: ${error.message || 'Unknown error'}`);
      setIsProcessingZip(false);
      return false;
    }
  };

  const handleUpload = async () => {
    if (!file || !title || !categoryId || !author) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Check if it's a ZIP file
      if (isZipFile(file)) {
        const success = await processZipFile(file);
        setIsUploading(false);
        
        if (success) {
          // Reset form
          setFile(null);
          setTitle('');
          setDescription('');
          setAuthor('');
          setUploadProgress(0);
        }
        return;
      }
      
      // Handle regular file upload with progress simulation
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Process the file
          const documentType = getDocumentType(file);
          onFileUpload(file, documentType, {
            title,
            description,
            author,
            categoryId
          });
          
          // Reset state
          setFile(null);
          setTitle('');
          setDescription('');
          setCategoryId('');
          setAuthor('');
          setUploadProgress(0);
          toast.success('File uploaded successfully');
        }
      }, 200);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(`Upload failed: ${error.message || 'Unknown error'}`);
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Document Metadata Fields */}
          <div className="space-y-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="font-medium">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category" className="font-medium">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={categoryId}
                onValueChange={setCategoryId}
                required
              >
                <SelectTrigger id="category">
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
            
            <div className="space-y-2">
              <Label htmlFor="author" className="font-medium">
                Author <span className="text-red-500">*</span>
              </Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full"
                rows={2}
              />
            </div>
          </div>
          
          <Separator />
          
          {/* File Upload Section */}
          <div 
            className={`border-2 border-dashed rounded-lg p-6 ${
              isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
            } transition-colors`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!file ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <Upload className="h-10 w-10 text-gray-400" />
                <div className="text-center">
                  <p className="text-md font-medium">
                    Drag & drop your file here or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supported formats: {allowedTypes.join(', ')}
                  </p>
                  <p className="text-sm text-blue-500 mt-1">
                    <Badge variant="outline" className="gap-1 mt-1">
                      <Archive className="h-3 w-3" />
                      ZIP files will be extracted automatically
                    </Badge>
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Select File
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept={allowedTypes.join(',')}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-2 rounded-md">
                    {file.name.toLowerCase().endsWith('.zip') ? (
                      <Archive className="h-8 w-8 text-blue-500" />
                    ) : (
                      <File className="h-8 w-8 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium truncate max-w-[200px]">
                        {file.name}
                        {file.name.toLowerCase().endsWith('.zip') && (
                          <Badge variant="outline" className="ml-2">ZIP</Badge>
                        )}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={removeFile}
                        disabled={isUploading || isProcessingZip}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                    
                    {isUploading && !isProcessingZip && (
                      <div className="mt-2">
                        <Progress value={uploadProgress} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          Uploading: {uploadProgress}%
                        </p>
                      </div>
                    )}
                    
                    {isProcessingZip && (
                      <div className="mt-2">
                        <Progress value={extractionProgress} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          Extracting ZIP: {extractionProgress}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {!isUploading && !isProcessingZip && (
                  <Button 
                    onClick={handleUpload} 
                    className="w-full"
                    disabled={!file || !title || !categoryId || !author}
                  >
                    {file.name.toLowerCase().endsWith('.zip') ? 'Upload & Extract ZIP' : 'Upload File'}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
