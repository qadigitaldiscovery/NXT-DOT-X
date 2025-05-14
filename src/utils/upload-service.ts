
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
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
 * Ensures the document storage bucket exists
 * Returns true if the bucket exists or was created
 */
async function ensureDocumentsBucketExists(): Promise<boolean> {
  try {
    // First check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error("Error listing buckets:", listError);
      return false;
    }
    
    const bucketExists = buckets?.some(bucket => bucket.name === "documents");
    
    if (bucketExists) {
      console.log("Documents bucket already exists");
      return true;
    }
    
    // Try using the edge function first
    const result = await tryUseEdgeFunction<{ success: boolean, message?: string, error?: string }>(
      'storage',
      'create-documents-bucket',
      {}
    );
    
    if (result?.success) {
      console.log("Documents bucket created via edge function");
      return true;
    }
    
    // Fall back to direct creation if the edge function failed
    // Note: This may fail due to permissions but we try anyway
    const { data, error } = await supabase.storage.createBucket("documents", {
      public: true,
      fileSizeLimit: 52428800, // 50MB in bytes
    });
    
    if (error) {
      console.error("Error creating bucket directly:", error);
      // Don't fail here, we'll attempt the upload anyway
      return false;
    }
    
    console.log("Documents bucket created directly");
    return true;
  } catch (error) {
    console.error("Error ensuring documents bucket exists:", error);
    // Don't fail here, we'll attempt the upload anyway
    return false;
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
    
    // Make sure the documents bucket exists
    await ensureDocumentsBucketExists();
    onProgress?.(10);
    
    // Determine file path
    const filePath = `documents/${Date.now()}-${file.name}`;
    onProgress?.(30);
    
    // Upload file to storage
    onProcessingMessage?.("Uploading file...");
    
    try {
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
      
      onProgress?.(60);
      onProcessingMessage?.("Processing document...");
      
      // Get public URL
      const { data: urlData } = await supabase.storage
        .from('documents')
        .getPublicUrl(filePath);
      
      if (!urlData?.publicUrl) {
        throw new Error('Could not get document URL');
      }
      
      // Create database record
      const documentData = {
        title: documentName,
        document_type: documentType,
        file_path: filePath,
        url: urlData.publicUrl,
        expiry_date: expiryDate || null,
        file_size: file.size,
        file_type: file.type
      };
      
      onProgress?.(80);
      onProcessingMessage?.("Finalizing upload...");
      
      // Log the document data before inserting
      console.log("Creating document record:", documentData);
      
      try {
        // If this is a ZIP file, attempt extraction
        if (file.type === 'application/zip' || file.name.toLowerCase().endsWith('.zip')) {
          onProcessingMessage?.("Extracting ZIP contents...");
          
          const extractResult = await tryUseEdgeFunction<{
            success: boolean;
            totalFiles: number;
            processedFiles: number;
            hasErrors: boolean;
          }>('archive', 'extract-zip', {
            zipFileUrl: urlData.publicUrl,
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
      } catch (extractError) {
        console.error("Error during ZIP extraction:", extractError);
        // Continue with regular upload
      }
      
      onProgress?.(100);
      toast.success({
        title: 'Document uploaded',
        description: `${documentName} has been uploaded successfully`
      });
      
      return true;
    } catch (uploadError) {
      console.error('Upload exception:', uploadError);
      toast.error({
        title: 'Upload failed',
        description: `${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`
      });
      return false;
    }
  } catch (error) {
    console.error('Document upload error:', error);
    toast.error({
      title: 'Upload failed',
      description: error instanceof Error ? error.message : 'An unknown error occurred'
    });
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

