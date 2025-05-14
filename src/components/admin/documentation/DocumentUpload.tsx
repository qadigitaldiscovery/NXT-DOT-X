import React, { useState, useEffect } from 'react';
import { Upload, File, X, Archive, AlertTriangle } from 'lucide-react';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
  const [isBucketReady, setIsBucketReady] = useState(false);
  const [isCreatingBucket, setIsCreatingBucket] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check bucket exists on component mount
  useEffect(() => {
    const checkBucketExists = async () => {
      try {
        setIsCreatingBucket(true);
        setError(null);
        console.log('Checking if documents bucket exists...');
        
        // Explicitly check if the bucket exists first
        const { data: bucketsList, error: bucketsError } = await supabase.storage.listBuckets();
        
        if (bucketsError) {
          console.error('Error checking buckets:', bucketsError);
          setError(`Failed to check storage buckets: ${bucketsError.message}`);
          setIsCreatingBucket(false);
          return;
        }
        
        // Check if the documents bucket exists
        const documentsBucket = bucketsList?.find(b => b.name === 'documents');
        
        if (documentsBucket) {
          console.log('Documents bucket already exists');
          setIsBucketReady(true);
          setIsCreatingBucket(false);
          return;
        }
        
        // If bucket doesn't exist, try to create it
        console.log('Documents bucket not found, attempting to create...');
        try {
          // Try direct creation first (may work depending on permissions)
          const { data: createData, error: createError } = await supabase.storage.createBucket('documents', {
            public: false,
            fileSizeLimit: 50 * 1024 * 1024, // 50MB limit
          });
          
          if (createError) {
            console.log('Direct bucket creation failed, trying edge function...');
            // Fall back to edge function if direct creation fails
            const { data, error } = await supabase.functions.invoke('create-documents-bucket');
            
            if (error) {
              throw new Error(`Edge function error: ${error.message}`);
            }
            
            if (data?.success) {
              toast.success('Document storage initialized successfully');
              setIsBucketReady(true);
            } else {
              throw new Error(data?.error || 'Unknown error creating bucket');
            }
          } else {
            toast.success('Document storage created successfully');
            setIsBucketReady(true);
          }
        } catch (createAttemptError) {
          console.error('Failed to create bucket:', createAttemptError);
          setError(`Failed to initialize document storage: ${createAttemptError.message}`);
          toast.error(`Error setting up document storage: ${createAttemptError.message}`);
        }
      } catch (e) {
        console.error('Error in bucket check/creation:', e);
        setError(`Storage initialization error: ${e.message}`);
        toast.error(`Failed to initialize storage: ${e.message}`);
      } finally {
        setIsCreatingBucket(false);
      }
    };
    
    checkBucketExists();
    
    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

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
    // Reset error state when selecting a new file
    setError(null);
    
    const extension = selectedFile.name.split('.').pop()?.toLowerCase() || '';
    const formattedAllowedTypes = allowedTypes.map(type => type.replace('.', '').toLowerCase());
    
    if (!formattedAllowedTypes.includes(extension)) {
      toast.error(`File type not supported. Please upload: ${allowedTypes.join(', ')}`);
      return;
    }
    
    console.log('File selected:', selectedFile.name, selectedFile.size, selectedFile.type);
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
      setError(null);

      // First, upload the ZIP file to storage
      const filePath = `uploads/zip/${Date.now()}-${zipFile.name}`;
      setExtractionProgress(20);

      console.log('Uploading ZIP file to', filePath);
      // Upload the ZIP file
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, zipFile, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        console.error('Error uploading ZIP file:', uploadError);
        setError(`Upload error: ${uploadError.message}`);
        toast.error(`Failed to upload ZIP file: ${uploadError.message}`);
        setIsProcessingZip(false);
        return false;
      }
      
      setExtractionProgress(50);

      // Get public URL for the zip file
      const { data: urlData } = await supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) {
        setError('Could not get public URL for uploaded ZIP file');
        toast.error('Failed to get access to the uploaded file');
        setIsProcessingZip(false);
        return false;
      }
      
      const publicUrl = urlData.publicUrl;
      setExtractionProgress(60);
      console.log('Invoking extract-zip function with ZIP URL:', publicUrl);

      // Call edge function to extract the ZIP file
      const { data, error } = await supabase.functions.invoke('extract-zip', {
        body: {
          zipFileUrl: publicUrl,
          categoryId,
          author
        }
      });
      
      setExtractionProgress(90);

      if (error) {
        console.error('Error invoking extract-zip function:', error);
        setError(`Function error: ${error.message}`);
        toast.error(`Failed to process ZIP file: ${error.message}`);
        setIsProcessingZip(false);
        return false;
      }

      setExtractionProgress(100);
      
      if (data && data.success) {
        toast.success(`Successfully extracted ${data.totalFiles} files from ZIP archive`);
        if (data.hasErrors) {
          toast.warning(`Failed to process ${data.errors.length} files from the ZIP archive`);
        }
        setIsProcessingZip(false);
        return true;
      } else {
        setError(`Failed to extract ZIP file: ${data?.error || 'Unknown error'}`);
        toast.error(`ZIP extraction failed: ${data?.error || 'Unknown error'}`);
        setIsProcessingZip(false);
        return false;
      }
    } catch (error) {
      console.error('Error processing ZIP file:', error);
      setError(`Error: ${error.message}`);
      toast.error(`Error processing ZIP file: ${error.message}`);
      setIsProcessingZip(false);
      return false;
    }
  };

  const handleUpload = async () => {
    if (!file || !title || !categoryId || !author) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Reset error state when starting new upload
    setError(null);
    
    // Clear any previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    setIsUploading(true);
    
    try {
      // Check if it's a ZIP file
      if (isZipFile(file)) {
        console.log('Processing ZIP file:', file.name);
        // Set a timeout to prevent UI hanging indefinitely
        const newTimeoutId = window.setTimeout(() => {
          if (isProcessingZip) {
            setIsProcessingZip(false);
            setIsUploading(false);
            setError("ZIP processing timed out");
            toast.error("ZIP extraction timed out. The process might still complete in the background.");
          }
        }, 30000); // 30 seconds timeout
        
        setTimeoutId(newTimeoutId);
        
        const success = await processZipFile(file);
        
        // Clear the timeout since we got a response
        clearTimeout(newTimeoutId);
        setTimeoutId(null);
        
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
      
      console.log('Processing regular file:', file.name);
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
          console.log('Sending file to onFileUpload handler with type:', documentType);
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
      setError(`Upload failed: ${error.message}`);
      toast.error(`Upload failed: ${error.message}`);
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setError(null);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
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
            {isCreatingBucket ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-4">
                <Progress value={60} className="h-2 w-40" />
                <p className="text-sm text-gray-500">Setting up document storage...</p>
              </div>
            ) : !file ? (
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
                  disabled={!isBucketReady && !isCreatingBucket}
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
                    disabled={!file || !title || !categoryId || !author || (!isBucketReady && !isProcessingZip)}
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
