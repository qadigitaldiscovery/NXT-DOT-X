
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
      // Check if bucket exists
      const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
      
      if (listError) {
        return new Response(
          JSON.stringify({ success: false, message: "Failed to list buckets", error: listError.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
      
      if (bucketExists) {
        return new Response(
          JSON.stringify({ success: true, message: "Bucket already exists", bucketName }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );
      }
      
      // Create bucket if it doesn't exist
      const { data: createData, error: createError } = await supabaseAdmin.storage.createBucket(
        bucketName, 
        { public: true, fileSizeLimit: 52428800 } // 50MB limit
      );
      
      if (createError) {
        return new Response(
          JSON.stringify({ success: false, message: "Failed to create bucket", error: createError.message }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        );
      }
      
      // Set public access policy for the bucket
      try {
        const policy = {
          name: `${bucketName}_public_access`,
          definition: {
            id: '*',
            name: '*'
          }
        };
        
        await supabaseAdmin.rpc('create_storage_policy', { 
          bucket: bucketName, 
          policy_name: policy.name,
          definition: policy.definition
        });
        
        return new Response(
          JSON.stringify({ success: true, message: "Bucket created successfully with public access", bucketName }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );
      } catch (policyError) {
        console.error("Error setting bucket policy:", policyError);
        
        // Return success anyway since the bucket was created
        return new Response(
          JSON.stringify({ 
            success: true, 
            message: "Bucket created but policy setting failed", 
            bucketName,
            policyError: policyError.message 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        );
      }
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
