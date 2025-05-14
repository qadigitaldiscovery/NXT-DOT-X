
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";

serve(async (req: Request) => {
  console.log("Starting create-documents-bucket function");
  
  // Initialize Supabase client with service role key for admin operations
  const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
  
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Missing required environment variables");
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Server configuration error" 
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
  
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  
  try {
    console.log("Checking if documents bucket exists...");
    
    // First check if bucket already exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error("Error listing buckets:", listError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Failed to check if documents bucket exists",
          error: listError.message
        }),
        { 
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    
    const documentsBucketExists = buckets?.some(bucket => bucket.name === "documents") || false;
    console.log("Documents bucket exists:", documentsBucketExists);
    
    if (documentsBucketExists) {
      console.log("Documents bucket already exists, no action needed");
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Documents bucket already exists" 
        }),
        { 
          status: 200,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    
    // Create the documents bucket if it doesn't exist
    console.log("Creating documents bucket...");
    const { data: bucketData, error: bucketError } = await supabase.storage.createBucket(
      "documents",
      { 
        public: true, 
        fileSizeLimit: 52428800 // 50MB
      }
    );
    
    if (bucketError) {
      console.error("Error creating documents bucket:", bucketError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Failed to create documents bucket",
          error: bucketError.message
        }),
        { 
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    
    console.log("Documents bucket created successfully");
    
    // Also set up public access policies for the bucket
    console.log("Setting up bucket policies...");
    // Create policy allowing public SELECT access
    const { error: policyError } = await supabase
      .storage
      .from('documents')
      .createSignedUrl('test-policy', 10); // This is just a test to create an initial policy
    
    if (policyError && !policyError.message.includes('file/object not found')) {
      console.error("Error setting up bucket policies:", policyError);
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Documents bucket created successfully" 
      }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "An unexpected error occurred",
        error: error.message
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
});
