
// Follow Deno runtime requirements for Supabase Edge Functions
// deno-lint-ignore-file no-explicit-any

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";
import * as jszip from "https://deno.land/x/jszip@0.11.0/mod.ts";

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json'
};

interface ZipExtractionRequest {
  zipFileUrl: string;
  categoryId: string;
  author: string;
}

interface ProcessingResult {
  success: boolean;
  totalFiles: number;
  processedFiles: number;
  hasErrors: boolean;
  extractedFiles?: Array<{
    fileName: string;
    publicUrl: string;
    fileType: string;
  }>;
  errors?: Array<{
    fileName: string;
    error: string;
  }>;
  error?: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }
  
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
      { status: 500, headers: corsHeaders }
    );
  }

  // Initialize Supabase client with service role for admin operations
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  try {
    // Parse request body
    const { zipFileUrl, categoryId, author } = await req.json() as ZipExtractionRequest;

    if (!zipFileUrl || !categoryId || !author) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required parameters: zipFileUrl, categoryId, or author",
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    console.log(`Downloading ZIP file from: ${zipFileUrl}`);

    // Check if URL is a valid public URL from Supabase storage
    if (!zipFileUrl.includes('documents/') || !zipFileUrl.includes('supabase.co')) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid ZIP file URL. Must be a public Supabase Storage URL.",
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Download the ZIP file
    const zipResponse = await fetch(zipFileUrl);
    if (!zipResponse.ok) {
      console.error(`Failed to download ZIP file: HTTP ${zipResponse.status}`);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Failed to download ZIP file: HTTP ${zipResponse.status}`,
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    const zipBuffer = await zipResponse.arrayBuffer();
    console.log(`ZIP file downloaded, size: ${zipBuffer.byteLength} bytes`);

    // Extract the ZIP file
    const zip = new jszip.JSZip();
    await zip.loadAsync(zipBuffer);
    
    const files = Object.keys(zip.files);
    console.log(`Found ${files.length} files in ZIP archive`);

    // Process files
    const result: ProcessingResult = {
      success: true,
      totalFiles: files.length,
      processedFiles: 0,
      hasErrors: false,
      extractedFiles: [],
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
        
        // Determine file type
        let fileType = "other";
        const extension = fileName.split(".").pop()?.toLowerCase();
        
        if (extension === "md" || extension === "markdown") fileType = "markdown";
        else if (extension === "pdf") fileType = "pdf";
        else if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) fileType = "image";
        else if (["txt", "csv", "html"].includes(extension || "")) fileType = "text";

        // Upload file to Supabase storage
        const uploadPath = `documents/extracted/${Date.now()}-${fileName}`;
        
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

        // Add document record to database
        const { data: docData, error: docError } = await supabase
          .from('documents')
          .insert({
            title: fileName,
            description: `Extracted from ZIP archive`,
            type: fileType,
            url: urlData.publicUrl,
            category_id: categoryId,
            author: author
          })
          .select()
          .single();

        if (docError) {
          console.error(`Error creating document record: ${docError.message}`);
          throw new Error(`Database error: ${docError.message}`);
        }

        console.log(`File uploaded and registered: ${uploadPath}`);
        console.log(`Public URL: ${urlData.publicUrl}`);
        
        result.extractedFiles?.push({
          fileName,
          publicUrl: urlData.publicUrl,
          fileType
        });
        
        result.processedFiles++;
      } catch (fileError: any) {
        console.error(`Error processing file ${filePath}:`, fileError);
        result.hasErrors = true;
        result.errors?.push({
          fileName: filePath,
          error: fileError.message,
        });
      }
    }

    console.log(`ZIP extraction complete. Processed ${result.processedFiles} of ${result.totalFiles} files`);
    
    return new Response(
      JSON.stringify(result),
      { status: 200, headers: corsHeaders }
    );
  } catch (e: any) {
    console.error("Error in extract-zip function:", e);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: `Unexpected error: ${e.message}`,
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});

// Helper function to determine MIME type from file name
function getMimeType(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();
  
  const mimeTypes: Record<string, string> = {
    "pdf": "application/pdf",
    "md": "text/markdown",
    "markdown": "text/markdown",
    "txt": "text/plain",
    "html": "text/html",
    "htm": "text/html",
    "css": "text/css",
    "js": "application/javascript",
    "json": "application/json",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "png": "image/png",
    "gif": "image/gif",
    "webp": "image/webp",
    "svg": "image/svg+xml",
    "csv": "text/csv",
    "doc": "application/msword",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "xls": "application/vnd.ms-excel",
    "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
  
  return mimeTypes[extension || ""] || "application/octet-stream";
}
