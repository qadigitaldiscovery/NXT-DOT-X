
// Follow Deno runtime requirements for Supabase Edge Functions
// deno-lint-ignore-file no-explicit-any

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";

interface ResponseData {
  success: boolean;
  message?: string;
  error?: string;
}

serve(async (req: Request) => {
  console.log("Starting create-documents-bucket function");

  // Get Supabase client using environment variables
  const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") as string;
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

  // Initialize the client with the service role key for admin privileges
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  
  try {
    console.log("Checking if documents bucket exists...");
    
    // Check if the bucket already exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error("Error listing buckets:", listError);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Failed to check buckets: ${listError.message}`,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    
    const bucketExists = buckets?.some(bucket => bucket.name === "documents");
    console.log(`Documents bucket exists: ${bucketExists}`);
    
    if (bucketExists) {
      console.log("Documents bucket already exists, no action needed");
      return new Response(
        JSON.stringify({
          success: true,
          message: "Documents storage already exists",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Create the bucket if it doesn't exist
    const { data, error } = await supabase.storage.createBucket("documents", {
      public: true, // Make it public so files can be accessed without authentication
      fileSizeLimit: 52428800, // 50MB in bytes
    });
    
    if (error) {
      console.error("Error creating bucket:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Failed to create documents bucket: ${error.message}`,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
    
    console.log("Documents bucket created successfully");
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Documents storage created successfully",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Exception:", e);
    return new Response(
      JSON.stringify({
        success: false,
        error: `Unexpected error: ${e.message}`,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
