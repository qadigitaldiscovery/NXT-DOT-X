
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const requestBody = await req.json();
    const { action, bucketName = "documents" } = requestBody;

    if (!action) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing action parameter" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Initialize Supabase client with admin credentials
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") as string,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string
    );

    if (action === 'create-bucket') {
      console.log(`Starting create-bucket action for ${bucketName}`);
      
      // Check if bucket exists
      const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
      
      if (listError) {
        console.error("Error listing buckets:", listError);
        return new Response(
          JSON.stringify({ success: false, message: "Failed to list buckets", error: listError.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
      
      if (bucketExists) {
        console.log(`Bucket ${bucketName} already exists`);
        return new Response(
          JSON.stringify({ success: true, message: "Bucket already exists", bucketName }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );
      }
      
      // Create bucket if it doesn't exist
      console.log(`Creating bucket ${bucketName}`);
      const { data: createData, error: createError } = await supabaseAdmin.storage.createBucket(
        bucketName, 
        { public: true, fileSizeLimit: 52428800 } // 50MB limit
      );
      
      if (createError) {
        console.error("Error creating bucket:", createError);
        return new Response(
          JSON.stringify({ success: false, message: "Failed to create bucket", error: createError.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      // After creating the bucket, set public access policy
      try {
        // Creating public access policy for the bucket
        const { error: policyError } = await supabaseAdmin.storage.from(bucketName).createPolicy('public-read', {
          name: `${bucketName}_public_read`,
          definition: {
            role: '*', // Allow all roles
            operations: ['SELECT'] // Allow read operations
          }
        });
        
        if (policyError) {
          console.error("Error creating bucket policy:", policyError);
          // Don't fail the request, just log the error
        } else {
          console.log(`Policy created for ${bucketName}`);
        }
        
        // Create upload policy for authenticated users
        const { error: uploadPolicyError } = await supabaseAdmin.storage.from(bucketName).createPolicy('authenticated-upload', {
          name: `${bucketName}_auth_upload`,
          definition: {
            role: 'authenticated', // Authenticated users
            operations: ['INSERT', 'UPDATE'] // Allow upload operations
          }
        });
        
        if (uploadPolicyError) {
          console.error("Error creating upload policy:", uploadPolicyError);
          // Don't fail the request, just log the error
        } else {
          console.log(`Upload policy created for ${bucketName}`);
        }
      } catch (policyError) {
        console.error("Error setting bucket policies:", policyError);
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Bucket created successfully", 
          bucketName 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    } else if (action === 'get-upload-url') {
      const { filePath } = requestBody;
      
      if (!filePath) {
        return new Response(
          JSON.stringify({ success: false, message: "Missing filePath parameter" }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
      }
      
      const { data, error } = await supabaseAdmin
        .storage
        .from(bucketName)
        .createSignedUploadUrl(filePath);
      
      if (error) {
        console.error("Error creating signed URL:", error);
        return new Response(
          JSON.stringify({ success: false, message: "Failed to create signed URL", error: error.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }
    
    return new Response(
      JSON.stringify({ success: false, message: "Invalid action" }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  } catch (error) {
    console.error("Error processing storage request:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
