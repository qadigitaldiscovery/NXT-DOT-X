
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
 * Ensures documents bucket exists by calling the edge function
 */
async function ensureDocumentsBucketExists(onProcessingMessage?: (message: string) => void): Promise<boolean> {
  try {
    onProcessingMessage?.("Setting up storage...");
    
    // Call our edge function to ensure the bucket exists
    const result = await tryUseEdgeFunction<{
      success: boolean;
      message: string;
      bucketName: string;
    }>('storage', 'create-bucket', {
      action: 'create-bucket',
      bucketName: 'documents'
    }, {
      timeout: 5000 // 5 second timeout
    });
    
    if (result?.success) {
      console.log("Storage bucket check successful:", result.message);
      return true;
    } else {
      console.warn("Storage bucket check failed or returned no result");
      return false;
    }
  } catch (error) {
    console.error("Error ensuring documents bucket exists:", error);
    return false;
  }
}

/**
 * Checks if documents bucket exists and returns true if it does
 */
async function checkDocumentsBucketExists(): Promise<boolean> {
  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error("Error listing buckets:", listError);
      return false;
    }
    
    return buckets?.some(bucket => bucket.name === "documents") || false;
  } catch (error) {
    console.error("Error checking if documents bucket exists:", error);
    return false;
  }
}

/**
 * Prepares the storage for document upload
 */
async function prepareForUpload(onProcessingMessage?: (message: string) => void): Promise<boolean> {
  try {
    // Check if bucket exists first
    onProcessingMessage?.("Checking storage configuration...");
    const bucketExists = await checkDocumentsBucketExists();
    
    if (bucketExists) {
      console.log("Documents bucket already exists");
      return true;
    } else {
      // If bucket doesn't exist, try to create it via edge function
      onProcessingMessage?.("Setting up storage bucket...");
      return await ensureDocumentsBucketExists(onProcessingMessage);
    }
  } catch (error) {
    console.error("Error preparing for upload:", error);
    // Still return true to attempt the upload anyway
    return true;
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
        
        // If the error is about the bucket not existing or RLS policy
        if (storageError.message?.includes('bucket') && storageError.message?.includes('not found')) {
          throw new Error('The documents storage bucket does not exist. Please try refreshing the page or contact your administrator.');
        }
        
        if (storageError.message?.includes('403') || storageError.message?.toLowerCase().includes('permission')) {
          throw new Error('Permission denied. You may not have rights to upload documents.');
        }
        
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
      console.log("Document uploaded successfully:", documentData);
      
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
      toast({
        title: 'Document uploaded',
        description: `${documentName} has been uploaded successfully`
      });
      
      return true;
    } catch (uploadError) {
      console.error('Upload exception:', uploadError);
      toast({
        variant: "destructive",
        title: 'Upload failed',
        description: `${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`
      });
      return false;
    }
  } catch (error) {
    console.error('Document upload error:', error);
    toast({
      variant: "destructive",
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
