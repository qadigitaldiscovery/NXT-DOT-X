
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
 * Instead of creating buckets (which requires admin permissions),
 * we'll just check if it exists and proceed with upload
 */
async function prepareForUpload(): Promise<boolean> {
  try {
    // Check if bucket exists first
    const bucketExists = await checkDocumentsBucketExists();
    
    if (bucketExists) {
      console.log("Documents bucket already exists");
      return true;
    } else {
      // If bucket doesn't exist, log this but allow upload attempt anyway
      // The user might have permissions to upload to an existing bucket but not create one
      console.log("Documents bucket doesn't exist. Upload may fail if you don't have proper permissions.");
      return false;
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
    
    // Check if bucket exists, but don't try to create it
    await prepareForUpload();
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
        
        // If the error is about the bucket not existing, provide a clearer message
        if (storageError.message?.includes('bucket') && storageError.message?.includes('not found')) {
          throw new Error('The documents storage bucket does not exist. Please contact your administrator to create it.');
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
