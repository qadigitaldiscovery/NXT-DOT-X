# ZIP File Upload & Extraction Documentation

This document provides a comprehensive overview of the ZIP file upload and extraction functionality in the application.

## Overview

The application allows users to upload ZIP files which are then automatically extracted, with the contents stored individually in the storage system. This functionality is implemented through:

1. Frontend upload components
2. Upload service utilities
3. Supabase edge functions for extracting ZIP files
4. Storage bucket management

## Key Components

### 1. Frontend Upload Components

#### `DocumentUpload.tsx`

This component provides the UI for uploading documents, including ZIP files:

```typescript
// src/components/admin/documentation/DocumentUpload.tsx
import { isZipFile, uploadDocument } from '@/utils/upload-service';

// Main component function
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
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setUploadError(null);
      
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
      toast('Please fill in all required fields');
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    
    try {
      // Ensure bucket exists
      await prepareBucketIfNeeded();
      
      // Upload document
      const success = await uploadDocument({
        file: selectedFile,
        documentName: title,
        documentType: categoryId,
        onProgress: setUploadProgress,
        onProcessingMessage: setProcessingMessage
      });
      
      if (success) {
        onFileUpload(selectedFile, type, {
          title, description, author, categoryId
        });
        resetForm();
      } else {
        setUploadError("Upload failed. Please try again later.");
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      setUploadError(error instanceof Error ? error.message : 'Unknown error');
      toast('Upload failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsUploading(false);
      setProcessingMessage('');
    }
  };
  
  // ZIP file detection UI
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

      {uploadError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {uploadError}
          </AlertDescription>
        </Alert>
      )}

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
```

#### `DocumentUploadForm.tsx`

Another upload component with similar ZIP functionality:

```typescript
// src/components/uploads/DocumentUploadForm.tsx
import { uploadDocument } from '@/utils/upload-service';

export function DocumentUploadForm({ supplierId, onUploadComplete }: DocumentUploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isUploading, setIsUploading] = useState(false);
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
  
  const isZipFile = (file: File) => {
    return file.name.toLowerCase().endsWith('.zip') || file.type === 'application/zip';
  };
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedFile || !documentName || !documentType) {
      toast.error({
        title: "Missing information",
        description: "Please fill all required fields"
      });
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
      toast.error({
        title: "Upload failed",
        description: error.message || 'Unknown error'
      });
    } finally {
      setIsUploading(false);
      setProcessingMessage("");
    }
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
            <div className="border-2 border-dashed rounded-lg p-6">
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
          </div>

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
```

### 2. Upload Service Utilities

#### `upload-service.ts`

This service handles the upload process, including special handling for ZIP files:

```typescript
// src/utils/upload-service.ts
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { tryUseEdgeFunction } from './api-clients/common/edge-function-utils';

export type UploadDocumentParams = {
  file: File;
  documentName: string;
  documentType: string;
  expiryDate?: string;
  onProgress?: (progress: number) => void;
  onProcessingMessage?: (message: string) => void;
};

/**
 * Get a signed URL for direct upload to bypass RLS policies
 */
async function getSignedUploadUrl(filePath: string): Promise<string | null> {
  try {
    const result = await tryUseEdgeFunction<{
      success: boolean;
      data: { signedURL: string; path: string; token: string };
    }>('storage', 'get-upload-url', {
      action: 'get-upload-url',
      filePath,
      bucketName: 'documents'
    });
    
    return result?.success ? result.data.signedURL : null;
  } catch (error) {
    console.error("Error getting signed URL:", error);
    return null;
  }
}

export const uploadDocument = async ({
  file,
  documentName,
  documentType,
  expiryDate,
  onProgress,
  onProcessingMessage
}: UploadDocumentParams): Promise<boolean> => {
  try {
    // Start progress indication
    onProgress?.(5);
    onProcessingMessage?.("Initializing upload...");
    
    // Ensure the bucket exists
    await prepareForUpload(onProcessingMessage);
    onProgress?.(10);
    
    // Determine file path
    const filePath = `documents/${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    onProgress?.(30);
    
    // Upload file to storage
    onProcessingMessage?.("Uploading file...");
    
    try {
      // Try to get a signed URL for upload
      const signedUrl = await getSignedUploadUrl(filePath);
      
      let uploadSuccess = false;
      let publicUrl = '';
      
      // If we have a signed URL, use it for direct upload
      if (signedUrl) {
        onProcessingMessage?.("Using direct upload...");
        const uploadResponse = await fetch(signedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type,
            'x-upsert': 'true'
          },
          body: file
        });
        
        if (uploadResponse.ok) {
          uploadSuccess = true;
          const { data } = await supabase.storage.from('documents').getPublicUrl(filePath);
          publicUrl = data.publicUrl;
        } else {
          console.error('Direct upload failed:', await uploadResponse.text());
          throw new Error('Direct upload failed. Falling back to regular upload.');
        }
      }
      
      // If direct upload failed or no signed URL, try regular upload
      if (!uploadSuccess) {
        onProcessingMessage?.("Using regular upload method...");
        const { data: storageData, error: storageError } = await supabase.storage
          .from('documents')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
          });
        
        if (storageError) {
          console.error('Storage upload error:', storageError);
          throw storageError;
        }
        
        // Get public URL
        const { data: urlData } = await supabase.storage
          .from('documents')
          .getPublicUrl(filePath);
        
        if (!urlData?.publicUrl) {
          throw new Error('Could not get document URL');
        }
        
        publicUrl = urlData.publicUrl;
      }
      
      onProgress?.(60);
      onProcessingMessage?.("Processing document...");
      
      // Create database record
      const documentData = {
        title: documentName,
        document_type: documentType,
        file_path: filePath,
        url: publicUrl,
        expiry_date: expiryDate || null,
        file_size: file.size,
        file_type: file.type
      };
      
      onProgress?.(80);
      onProcessingMessage?.("Finalizing upload...");
      
      // Log the document data before inserting
      console.log("Document uploaded successfully:", documentData);
      
      // Special handling for ZIP files
      if (file.type === 'application/zip' || file.name.toLowerCase().endsWith('.zip')) {
        onProcessingMessage?.("Extracting ZIP contents...");
        
        const extractResult = await tryUseEdgeFunction<{
          success: boolean;
          totalFiles: number;
          processedFiles: number;
          hasErrors: boolean;
        }>('archive', 'extract-zip', {
          zipFileUrl: publicUrl,
          categoryId: documentType,
          author: 'System Upload'
        });
        
        if (extractResult?.success) {
          onProcessingMessage?.(`Extracted ${extractResult.processedFiles} of ${extractResult.totalFiles} files from ZIP`);
        } else {
          console.log("ZIP extraction returned no result or failed");
          // Continue with regular upload
        }
      }
      
      onProgress?.(100);
      toast(`${documentName} has been uploaded successfully`);
      
      return true;
    } catch (uploadError: any) {
      console.error('Upload exception:', uploadError);
      toast(uploadError instanceof Error ? uploadError.message : 'Unknown error');
      return false;
    }
  } catch (error: any) {
    console.error('Document upload error:', error);
    toast(error instanceof Error ? error.message : 'An unknown error occurred');
    return false;
  }
};

/**
 * Checks if a file is a ZIP archive
 */
export const isZipFile = (file: File): boolean => {
  return file.type === 'application/zip' || 
    file.type === 'application/x-zip-compressed' || 
    file.name.toLowerCase().endsWith('.zip');
};
```

### 3. Storage Bucket Management

#### `useStorageBucket.ts`

Hook for checking and creating the storage bucket used for uploads:

```typescript
// src/hooks/use-storage-bucket.ts
import { useState, useEffect } from 'react';
import { tryUseEdgeFunction } from '@/utils/api-clients/common/edge-function-utils';
import { supabase } from '@/integrations/supabase/client';

export function useStorageBucket(bucketName: string = 'documents') {
  const [bucketExists, setBucketExists] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    async function checkBucket() {
      setIsLoading(true);
      try {
        // First try using Supabase client directly
        const { data: buckets, error: listError } = await supabase.storage.listBuckets();
        
        if (listError) {
          console.warn("Error listing buckets:", listError);
          // If direct check fails, try the edge function
          const result = await tryUseEdgeFunction<{
            success: boolean;
            message: string;
            bucketName: string;
          }>('storage', 'create-bucket', {
            action: 'create-bucket',
            bucketName
          });
          
          setBucketExists(!!result?.success);
        } else {
          // Direct check succeeded
          const exists = buckets?.some(bucket => bucket.name === bucketName) || false;
          setBucketExists(exists);
          
          // If bucket doesn't exist, try to create it
          if (!exists) {
            const result = await tryUseEdgeFunction<{
              success: boolean;
              message: string;
            }>('storage', 'create-bucket', {
              action: 'create-bucket',
              bucketName
            });
            
            setBucketExists(!!result?.success);
          }
        }
      } catch (err: any) {
        console.error("Error checking bucket:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    }
    
    checkBucket();
  }, [bucketName]);
  
  return { bucketExists, isLoading, error };
}
```

### 4. Supabase Edge Functions

#### `extract-zip` Edge Function

This is the core functionality for extracting ZIP files:

```typescript
// supabase/functions/extract-zip/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";
import * as jszip from "https://deno.land/x/jszip@0.11.0/mod.ts";

interface ZipExtractionRequest {
  zipFileUrl: string;
  categoryId: string;
  author: string;
}

serve(async (req: Request) => {
  console.log("Starting extract-zip function");

  const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Missing environment variables");
    return new Response(
      JSON.stringify({
        success: false,
        error: "Server configuration error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // Initialize Supabase client with service role
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  try {
    // Parse request body
    const { zipFileUrl, categoryId, author } = await req.json() as ZipExtractionRequest;

    if (!zipFileUrl || !categoryId || !author) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required parameters",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Download the ZIP file
    console.log(`Downloading ZIP file from: ${zipFileUrl}`);
    const zipResponse = await fetch(zipFileUrl);
    if (!zipResponse.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Failed to download ZIP file: HTTP ${zipResponse.status}`,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const zipBuffer = await zipResponse.arrayBuffer();
    console.log(`ZIP file downloaded, size: ${zipBuffer.byteLength} bytes`);

    // Extract the ZIP file
    const zip = new jszip.JSZip();
    await zip.loadAsync(zipBuffer);
    
    const files = Object.keys(zip.files);
    console.log(`Found ${files.length} files in ZIP archive`);

    // Process results tracking
    const result = {
      success: true,
      totalFiles: files.length,
      processedFiles: 0,
      hasErrors: false,
      errors: [],
    };

    // Process each file in the ZIP
    for (const filePath of files) {
      try {
        // Skip directories
        if (zip.files[filePath].dir) {
          continue;
        }

        const fileObj = zip.files[filePath];
        const fileName = filePath.split("/").pop() || "unnamed_file";
        console.log(`Processing file: ${fileName}`);

        // Get file content
        const content = await fileObj.async("arraybuffer");
        
        // Determine file type based on extension
        const extension = fileName.split(".").pop()?.toLowerCase();
        let fileType = "other";
        
        if (extension === "md" || extension === "markdown") fileType = "markdown";
        else if (extension === "pdf") fileType = "pdf";
        else if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) fileType = "image";
        else if (["txt", "csv", "html"].includes(extension || "")) fileType = "text";

        // Upload file to Supabase storage
        const uploadPath = `uploads/extracted/${Date.now()}-${fileName}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("documents")
          .upload(uploadPath, content, {
            contentType: getMimeType(fileName),
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw new Error(`Upload error: ${uploadError.message}`);
        }

        // Get public URL
        const { data: urlData } = await supabase.storage
          .from("documents")
          .getPublicUrl(uploadPath);

        if (!urlData?.publicUrl) {
          throw new Error("Failed to get public URL");
        }

        // In a real implementation, you would add a record to a documents table
        console.log(`File uploaded: ${uploadPath}, URL: ${urlData.publicUrl}, Type: ${fileType}`);
        
        result.processedFiles++;
      } catch (fileError) {
        console.error(`Error processing file ${filePath}:`, fileError);
        result.hasErrors = true;
        result.errors.push({
          fileName: filePath,
          error: fileError.message,
        });
      }
    }

    console.log(`ZIP extraction complete. Processed ${result.processedFiles} of ${result.totalFiles} files`);
    
    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Error in extract-zip function:", e);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: `Unexpected error: ${e.message}`,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

// Helper function to determine MIME type
function getMimeType(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();
  
  const mimeTypes = {
    "pdf": "application/pdf",
    "md": "text/markdown",
    "jpg": "image/jpeg",
    // ... other mime types
  };
  
  return mimeTypes[extension || ""] || "application/octet-stream";
}
```

#### `storage` Edge Function

This function handles bucket creation and management:

```typescript
// supabase/functions/storage/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    const { action, bucketName = "documents" } = requestBody;

    // Admin Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") as string,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string
    );

    if (action === 'create-bucket') {
      console.log(`Starting create-bucket action for ${bucketName}`);
      
      // Check if bucket exists
      const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
      
      if (listError) {
        console.error("Error listing buckets:", listError);
        return new Response(
          JSON.stringify({ success: false, message: "Failed to list buckets", error: listError.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
      
      if (bucketExists) {
        console.log(`Bucket ${bucketName} already exists`);
        return new Response(
          JSON.stringify({ success: true, message: "Bucket already exists", bucketName }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );
      }
      
      // Create bucket if it doesn't exist
      console.log(`Creating bucket ${bucketName}`);
      const { data: createData, error: createError } = await supabaseAdmin.storage.createBucket(
        bucketName, 
        { public: true, fileSizeLimit: 52428800 } // 50MB limit
      );
      
      // Create policies for the bucket
      try {
        // Public read policy
        await supabaseAdmin.storage.from(bucketName).createPolicy('public-read', {
          name: `${bucketName}_public_read`,
          definition: {
            role: '*', 
            operations: ['SELECT']
          }
        });
        
        // Upload policy for authenticated users
        await supabaseAdmin.storage.from(bucketName).createPolicy('authenticated-upload', {
          name: `${bucketName}_auth_upload`,
          definition: {
            role: 'authenticated',
            operations: ['INSERT', 'UPDATE']
          }
        });
      } catch (policyError) {
        console.error("Error setting bucket policies:", policyError);
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Bucket created successfully", 
          bucketName 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }
    
    // Other actions (get-upload-url, etc.)
    
  } catch (error) {
    console.error("Error processing storage request:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
```

## Data Flow

1. User uploads a ZIP file through `DocumentUpload.tsx` or `DocumentUploadForm.tsx`
2. `uploadDocument()` in `upload-service.ts` handles the upload process
3. If the file is a ZIP, after upload completes:
   - The `extract-zip` edge function is called with the file URL
   - The edge function downloads the ZIP, extracts all files, and uploads each one individually
   - Each extracted file is stored in the "documents" bucket with appropriate metadata
4. Success or error information is returned to the UI

## Common Issues & Solutions

### 1. Missing "documents" Bucket

Problem: The ZIP extraction fails because the "documents" storage bucket doesn't exist.

Solution: 
- The `useStorageBucket` hook and `prepareBucketIfNeeded()` function attempt to create the bucket if it doesn't exist
- The `storage` edge function handles bucket creation and policy setup

### 2. Permission Issues

Problem: Files can't be uploaded due to permissions/RLS issues.

Solution:
- The `storage` edge function creates appropriate policies for the bucket
- For troubleshooting, check the bucket permissions in Supabase console

### 3. ZIP Download/Extract Failures

Problem: ZIP extraction fails with errors about file size or download issues.

Solution:
- Check the edge function logs to identify the specific error
- Ensure the ZIP URL is publicly accessible
- Verify the ZIP file isn't corrupted and is within size limits

### 4. Deployment Considerations

For successful deployment:
- The edge functions need the `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` environment variables set
- The storage bucket "documents" must exist with proper policies
- The JsZip dependency must be properly included in the edge function

## Testing & Debugging

To troubleshoot ZIP upload and extraction:
1. Check console logs for client-side errors
2. Review edge function logs in the Supabase dashboard
3. Verify the bucket exists and has appropriate permissions
4. Ensure the ZIP file is valid and can be downloaded from the provided URL
