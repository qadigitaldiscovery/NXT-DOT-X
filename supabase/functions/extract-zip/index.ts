
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
    const supabaseServiceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceRole) {
      throw new Error("Missing required environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }
    
    // Using service role for more permissions
    const supabase = createClient(supabaseUrl, supabaseServiceRole);
    
    console.log("Downloading ZIP file from URL:", zipFileUrl);
    
    // Download the ZIP file with a timeout (shorter timeout)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    try {
      // Download the ZIP file
      const response = await fetch(zipFileUrl, { signal: controller.signal });
      clearTimeout(timeout);
      
      if (!response.ok) {
        throw new Error(`Failed to download ZIP file: ${response.statusText} (${response.status})`);
      }
      
      const zipBuffer = await response.arrayBuffer();
      console.log("ZIP file downloaded, size:", zipBuffer.byteLength);
      
      if (zipBuffer.byteLength === 0) {
        throw new Error("Downloaded ZIP file is empty");
      }
      
      // Ensure the documents bucket exists before proceeding
      try {
        const { data: bucketsData, error: bucketsError } = await supabase.storage.listBuckets();
        
        if (bucketsError) {
          throw new Error(`Error listing buckets: ${bucketsError.message}`);
        }
        
        const documentsBucketExists = bucketsData.some(bucket => bucket.name === 'documents');
        
        if (!documentsBucketExists) {
          console.log("Bucket doesn't exist, creating it...");
          const { error: createError } = await supabase.storage.createBucket('documents', {
            public: true,
            fileSizeLimit: 52428800, // 50MB
          });
          
          if (createError) {
            throw new Error(`Failed to create documents bucket: ${createError.message}`);
          }
          console.log("Documents bucket created successfully");
        } else {
          console.log("Documents bucket exists, proceeding with extraction");
        }
      } catch (bucketError) {
        console.error("Error checking/creating bucket:", bucketError);
        throw new Error(`Storage bucket error: ${bucketError.message}`);
      }
      
      // Extract ZIP contents
      const files = await unZipBuffer(new Uint8Array(zipBuffer));
      console.log("ZIP extraction complete, files found:", Object.keys(files).length);
      
      if (Object.keys(files).length === 0) {
        throw new Error("ZIP file contains no files");
      }
      
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
            
            // Use a shorter timeout for storage operations
            const storageTimeoutMs = 10000; // 10 seconds
            const storagePromise = supabase.storage
              .from('documents')
              .upload(filePath, content, {
                contentType: getMimeType(fileExtension),
                upsert: false
              });
            
            const storageResult = await Promise.race([
              storagePromise,
              new Promise((_, reject) => 
                setTimeout(() => reject(new Error("Storage upload timed out")), storageTimeoutMs)
              )
            ]);
            
            const { data: storageData, error: storageError } = storageResult as any;
              
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
          
          // Create document record in database with shorter timeout
          const dbTimeoutMs = 5000; // 5 seconds
          const dbPromise = supabase
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
          
          const dbResult = await Promise.race([
            dbPromise,
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error("Database insert timed out")), dbTimeoutMs)
            )
          ]);
          
          const { data: docData, error: docError } = dbResult as any;
            
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
      
    } catch (fetchError) {
      clearTimeout(timeout);
      throw new Error(`Fetch error: ${fetchError.message}`);
    }
    
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
