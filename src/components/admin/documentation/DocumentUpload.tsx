
import React, { useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DocumentType } from './types';
import { toast } from 'sonner';

interface DocumentUploadProps {
  onFileUpload: (file: File, type: DocumentType) => void;
  allowedTypes?: string[];
}

export const DocumentUpload = ({ 
  onFileUpload,
  allowedTypes = ['.pdf', '.md', '.txt', '.jpg', '.jpeg', '.png', '.docx', '.xlsx']
}: DocumentUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const getDocumentType = (file: File): DocumentType => {
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    
    if (extension === 'md' || extension === 'markdown') return 'markdown';
    if (extension === 'pdf') return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) return 'image';
    if (['txt', 'csv', 'html'].includes(extension)) return 'text';
    return 'other';
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
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        
        // Process the file
        const documentType = getDocumentType(file);
        onFileUpload(file, documentType);
        
        // Reset state
        setFile(null);
        setUploadProgress(0);
        toast.success('File uploaded successfully');
      }
    }, 200);
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
  };

  return (
    <Card>
      <CardContent className="p-6">
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
                  <File className="h-8 w-8 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium truncate max-w-[200px]">{file.name}</p>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={removeFile}
                      disabled={isUploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                  
                  {isUploading && (
                    <div className="mt-2">
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">
                        Uploading: {uploadProgress}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {!isUploading && (
                <Button onClick={handleUpload} className="w-full">
                  Upload File
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
