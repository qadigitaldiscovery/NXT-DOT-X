
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    console.log("Starting create-documents-bucket function");
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceRole) {
      throw new Error("Missing required environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }
    
    // Using service role for storage bucket operations
    const supabase = createClient(supabaseUrl, supabaseServiceRole);

    // Check if the documents bucket exists
    console.log("Checking if documents bucket exists...");
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      throw new Error(`Failed to list storage buckets: ${bucketsError.message}`);
    }
    
    const documentsBucketExists = buckets.some(bucket => bucket.name === 'documents');
    console.log(`Documents bucket exists: ${documentsBucketExists}`);
    
    if (!documentsBucketExists) {
      console.log("Creating documents bucket...");
      const { error: createError } = await supabase.storage.createBucket('documents', {
        public: true,
        fileSizeLimit: 52428800, // 50MB
      });
      
      if (createError) {
        throw new Error(`Failed to create documents bucket: ${createError.message}`);
      }
      console.log("Documents bucket created successfully");
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Documents storage created successfully" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      console.log("Documents bucket already exists, no action needed");
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Documents storage already exists" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
  } catch (error) {
    console.error("Error creating documents bucket:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Unknown error occurred" 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
