import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { tryUseEdgeFunction } from './api-clients/common/edge-function-utils';
/**
 * Ensures documents bucket exists by calling the edge function
 */
async function ensureDocumentsBucketExists(onProcessingMessage) {
    try {
        onProcessingMessage?.("Setting up storage...");
        // Call our edge function to ensure the bucket exists
        const result = await tryUseEdgeFunction('storage', {
            action: 'create-bucket',
            bucketName: 'documents'
        }, {
            timeout: 10000 // 10 second timeout
        });
        if (result?.success) {
            console.log("Storage bucket check successful:", result.message);
            return true;
        }
        else {
            console.warn("Storage bucket check failed or returned no result");
            return false;
        }
    }
    catch (error) {
        console.error("Error ensuring documents bucket exists:", error);
        return false;
    }
}
/**
 * Checks if documents bucket exists and returns true if it does
 */
async function checkDocumentsBucketExists() {
    try {
        // Check if bucket exists
        const { data: buckets, error: listError } = await supabase.storage.listBuckets();
        if (listError) {
            console.error("Error listing buckets:", listError);
            return false;
        }
        return buckets?.some(bucket => bucket.name === "documents") || false;
    }
    catch (error) {
        console.error("Error checking if documents bucket exists:", error);
        return false;
    }
}
/**
 * Prepares the storage for document upload
 */
async function prepareForUpload(onProcessingMessage) {
    try {
        // Check if bucket exists first
        onProcessingMessage?.("Checking storage configuration...");
        const bucketExists = await checkDocumentsBucketExists();
        if (bucketExists) {
            console.log("Documents bucket already exists");
            return true;
        }
        else {
            // If bucket doesn't exist, try to create it via edge function
            onProcessingMessage?.("Setting up storage bucket...");
            return await ensureDocumentsBucketExists(onProcessingMessage);
        }
    }
    catch (error) {
        console.error("Error preparing for upload:", error);
        // Still return true to attempt the upload anyway
        return true;
    }
}
/**
 * Get a signed URL for direct upload to bypass RLS policies
 */
async function getSignedUploadUrl(filePath) {
    try {
        const result = await tryUseEdgeFunction('storage', {
            action: 'get-upload-url',
            filePath,
            bucketName: 'documents'
        });
        return result?.success ? result.data.signedURL : null;
    }
    catch (error) {
        console.error("Error getting signed URL:", error);
        return null;
    }
}
/**
 * Process a ZIP file by extracting its contents
 */
async function processZipFile(publicUrl, documentType, documentName, onProcessingMessage) {
    try {
        onProcessingMessage?.("Extracting ZIP contents...");
        console.log("Starting ZIP extraction for:", publicUrl);
        const extractResult = await tryUseEdgeFunction('extract-zip', {
            zipFileUrl: publicUrl,
            categoryId: documentType,
            author: 'System Upload'
        });
        if (extractResult?.success) {
            const { totalFiles, processedFiles, hasErrors, extractedFiles, errors } = extractResult;
            console.log("ZIP extraction result:", extractResult);
            onProcessingMessage?.(`Extracted ${processedFiles} of ${totalFiles} files from ZIP`);
            // Show success/failure toast with detailed information
            if (hasErrors) {
                const failedCount = (errors?.length || 0);
                // Fix: Use the correct toast API format
                toast(`Successfully extracted ${processedFiles} files. ${failedCount} files had errors.`, {
                    duration: 5000,
                });
            }
            else {
                toast.success(`Successfully extracted all ${processedFiles} files from ${documentName}`);
            }
            return true;
        }
        else {
            console.error("ZIP extraction failed:", extractResult?.errors || "Unknown error");
            toast.error("Failed to extract ZIP contents");
            return false;
        }
    }
    catch (extractError) {
        console.error("Error during ZIP extraction:", extractError);
        toast.error(`ZIP extraction error: ${extractError.message || "Unknown error"}`);
        return false;
    }
}
export const uploadDocument = async ({ file, documentName, documentType, expiryDate, onProgress, onProcessingMessage }) => {
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
                }
                else {
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
                    // Handle specific error cases
                    if (storageError.message?.includes('bucket') && storageError.message?.includes('not found')) {
                        throw new Error('The documents storage bucket does not exist. Please try refreshing the page or contact your administrator.');
                    }
                    if (storageError.message?.includes('403') || storageError.message?.toLowerCase().includes('permission')) {
                        throw new Error('Permission denied. You may not have rights to upload documents.');
                    }
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
            // Create database record for the document
            const { data: docData, error: docError } = await supabase
                .from('documents')
                .insert({
                title: documentName,
                type: isZipFile(file) ? 'archive' : file.type,
                category_id: documentType,
                url: publicUrl,
                expiry_date: expiryDate || null
            })
                .select()
                .single();
            if (docError) {
                console.error('Error creating document record:', docError);
                throw new Error(`Failed to register document: ${docError.message}`);
            }
            onProgress?.(80);
            onProcessingMessage?.("Finalizing upload...");
            // Log the document data
            console.log("Document uploaded successfully:", {
                id: docData.id,
                title: documentName,
                url: publicUrl
            });
            // If this is a ZIP file, attempt extraction
            let extractionSuccess = false;
            if (isZipFile(file)) {
                onProcessingMessage?.("Processing ZIP archive...");
                onProgress?.(85);
                // Validate the public URL before calling extract-zip
                if (!publicUrl || !publicUrl.includes('supabase.co')) {
                    console.error("Invalid public URL for ZIP extraction:", publicUrl);
                    toast.error("ZIP extraction failed: Invalid URL");
                }
                else {
                    extractionSuccess = await processZipFile(publicUrl, documentType, documentName, onProcessingMessage);
                }
            }
            onProgress?.(100);
            // Show toast based on file type and extraction result
            if (isZipFile(file)) {
                if (!extractionSuccess) {
                    toast.warning(`${documentName} has been uploaded, but extraction failed or was incomplete.`);
                }
            }
            else {
                toast.success(`${documentName} has been uploaded successfully`);
            }
            return true;
        }
        catch (uploadError) {
            console.error('Upload exception:', uploadError);
            toast.error(uploadError instanceof Error ? uploadError.message : 'Unknown error');
            return false;
        }
    }
    catch (error) {
        console.error('Document upload error:', error);
        toast.error(error instanceof Error ? error.message : 'An unknown error occurred');
        return false;
    }
};
/**
 * Checks if a file is a ZIP archive
 */
export const isZipFile = (file) => {
    return file.type === 'application/zip' ||
        file.type === 'application/x-zip-compressed' ||
        file.name.toLowerCase().endsWith('.zip');
};
