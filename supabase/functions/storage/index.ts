
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json'
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }
  
  console.log("Starting storage management function");

  const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Missing environment variables");
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server configuration error",
      }),
      { status: 500, headers: corsHeaders }
    );
  }
  
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
  
  try {
    const { action, bucketName, filePath } = await req.json();
    
    if (action === 'create-bucket') {
      console.log(`Checking if bucket exists: ${bucketName}`);
      
      // First check if bucket already exists
      const { data: buckets, error: listError } = await supabase.storage.listBuckets();
      
      if (listError) {
        console.error("Error listing buckets:", listError);
        return new Response(
          JSON.stringify({
            success: false,
            message: "Failed to check if bucket exists",
            error: listError.message
          }),
          { status: 500, headers: corsHeaders }
        );
      }
      
      const bucketExists = buckets?.some(bucket => bucket.name === bucketName) || false;
      console.log("Bucket exists:", bucketExists);
      
      if (bucketExists) {
        console.log("Bucket already exists, no action needed");
        return new Response(
          JSON.stringify({
            success: true,
            message: "Bucket already exists",
            bucketName
          }),
          { status: 200, headers: corsHeaders }
        );
      }
      
      // Create the bucket if it doesn't exist
      console.log(`Creating bucket: ${bucketName}`);
      const { data: bucketData, error: bucketError } = await supabase.storage.createBucket(
        bucketName,
        { public: true, fileSizeLimit: 52428800 }
      );
      
      if (bucketError) {
        console.error("Error creating bucket:", bucketError);
        return new Response(
          JSON.stringify({
            success: false,
            message: "Failed to create bucket",
            error: bucketError.message
          }),
          { status: 500, headers: corsHeaders }
        );
      }
      
      console.log("Bucket created successfully");
      
      // Create public policy for the bucket
      const policyName = `${bucketName}_public_access`;
      const { error: policyError } = await supabase.rpc('create_storage_policy', {
        bucket_name: bucketName,
        policy_name: policyName
      });
      
      if (policyError && !policyError.message.includes('already exists')) {
        console.warn("Error setting policy:", policyError);
      }
      
      return new Response(
        JSON.stringify({
          success: true,
          message: "Bucket created successfully",
          bucketName
        }),
        { status: 200, headers: corsHeaders }
      );
    } 
    else if (action === 'get-upload-url') {
      if (!filePath || !bucketName) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Missing filePath or bucketName",
          }),
          { status: 400, headers: corsHeaders }
        );
      }
      
      console.log(`Getting upload URL for ${bucketName}/${filePath}`);
      
      // Generate a signed URL for uploading
      const { data, error } = await supabase.storage
        .from(bucketName)
        .createSignedUploadUrl(filePath);
      
      if (error) {
        console.error("Error creating signed URL:", error);
        return new Response(
          JSON.stringify({
            success: false,
            message: "Failed to create upload URL",
            error: error.message
          }),
          { status: 500, headers: corsHeaders }
        );
      }
      
      return new Response(
        JSON.stringify({
          success: true,
          data,
        }),
        { status: 200, headers: corsHeaders }
      );
    }
    else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid action",
        }),
        { status: 400, headers: corsHeaders }
      );
    }
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An unexpected error occurred",
        error: error.message
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});
