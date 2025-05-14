
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { unZipBuffer } from "https://deno.land/x/zip@v1.2.5/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting extract-zip function");
    
    // Get request body
    const requestBody = await req.json().catch(e => {
      throw new Error(`Invalid JSON body: ${e.message}`);
    });
    
    const { zipFileUrl, categoryId, author } = requestBody;
    
    if (!zipFileUrl || !categoryId || !author) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required parameters: zipFileUrl, categoryId, or author" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing required environment variables: SUPABASE_URL or SUPABASE_ANON_KEY");
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log("Downloading ZIP file from URL:", zipFileUrl);
    
    // Download the ZIP file
    const response = await fetch(zipFileUrl);
    if (!response.ok) {
      throw new Error(`Failed to download ZIP file: ${response.statusText} (${response.status})`);
    }
    
    const zipBuffer = await response.arrayBuffer();
    console.log("ZIP file downloaded, size:", zipBuffer.byteLength);
    
    if (zipBuffer.byteLength === 0) {
      throw new Error("Downloaded ZIP file is empty");
    }
    
    // Check if the documents bucket exists (it should be created by the create-documents-bucket function)
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      throw new Error(`Failed to check buckets: ${bucketsError.message}`);
    }
    
    const documentsBucketExists = buckets?.some(bucket => bucket.name === 'documents');
    
    if (!documentsBucketExists) {
      throw new Error("Documents bucket does not exist. Please create it first.");
    }
    
    // Extract ZIP contents
    const files = await unZipBuffer(new Uint8Array(zipBuffer));
    console.log("ZIP extraction complete, files found:", Object.keys(files).length);
    
    const processedFiles = [];
    const errors = [];
    
    // Process each extracted file
    for (const [filename, content] of Object.entries(files)) {
      try {
        // Skip directories and hidden files
        if (filename.endsWith("/") || filename.startsWith("__MACOSX") || filename.startsWith(".")) {
          console.log(`Skipping file: ${filename} (directory or hidden file)`);
          continue;
        }
        
        // Determine file type
        const fileExtension = filename.split(".").pop()?.toLowerCase() || "";
        let type = "other";
        
        if (["md", "markdown"].includes(fileExtension)) type = "markdown";
        else if (fileExtension === "pdf") type = "pdf";
        else if (["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension)) type = "image";
        else if (["txt", "csv", "html"].includes(fileExtension)) type = "text";
        
        console.log(`Processing file: ${filename} (type: ${type})`);
        
        // Process file content
        let fileContent = "";
        let url = "";
        
        if (type === "text" || type === "markdown") {
          // For text files, use the content directly
          const textDecoder = new TextDecoder("utf-8");
          fileContent = textDecoder.decode(content);
          console.log(`Text content extracted, length: ${fileContent.length}`);
        } else {
          // For binary files, store the file in Supabase Storage
          const filePath = `extracted_zip_files/${Date.now()}-${filename}`;
          
          const { data: storageData, error: storageError } = await supabase.storage
            .from('documents')
            .upload(filePath, content, {
              contentType: getMimeType(fileExtension),
              upsert: false
            });
            
          if (storageError) {
            throw new Error(`Storage upload error: ${storageError.message}`);
          }
          
          // Get public URL for the file
          const { data: urlData } = await supabase.storage
            .from('documents')
            .getPublicUrl(filePath);
            
          url = urlData.publicUrl;
          console.log(`File uploaded to storage, URL: ${url}`);
        }
        
        // Create document record in database
        const { data: docData, error: docError } = await supabase
          .from('documents')
          .insert({
            title: filename,
            description: `Extracted from ZIP archive`,
            category_id: categoryId,
            type,
            content: fileContent,
            url,
            author
          })
          .select()
          .single();
          
        if (docError) {
          throw new Error(`Document insert error: ${docError.message}`);
        }
        
        processedFiles.push({
          filename,
          id: docData.id
        });
        console.log(`Document record created for: ${filename}`);
        
      } catch (error) {
        console.error(`Error processing file ${filename}:`, error);
        errors.push({
          filename,
          error: error.message
        });
      }
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        processedFiles, 
        totalFiles: processedFiles.length,
        errors,
        hasErrors: errors.length > 0
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error extracting ZIP:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Unknown error occurred",
        errorDetails: error.toString()
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

// Helper function to get MIME type from file extension
function getMimeType(extension: string): string {
  const mimeTypes: Record<string, string> = {
    'pdf': 'application/pdf',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'txt': 'text/plain',
    'md': 'text/markdown',
    'csv': 'text/csv',
    'html': 'text/html',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  };
  
  return mimeTypes[extension] || 'application/octet-stream';
}
