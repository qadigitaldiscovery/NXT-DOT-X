
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
    
    // Initialize Supabase client with explicit error handling
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceRole) {
      throw new Error("Missing required environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }
    
    // Using service role key because bucket creation requires admin privileges
    const supabase = createClient(supabaseUrl, supabaseServiceRole);
    
    // Check if bucket exists
    console.log("Checking if documents bucket exists...");
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error("Error listing buckets:", bucketsError);
      throw new Error(`Failed to check existing buckets: ${bucketsError.message}`);
    }
    
    const documentsBucketExists = buckets?.some(bucket => bucket.name === 'documents');
    console.log("Documents bucket exists:", documentsBucketExists);
    
    if (!documentsBucketExists) {
      // Create the documents bucket
      console.log("Creating documents bucket...");
      const { data, error } = await supabase.storage.createBucket('documents', {
        public: true, // Make the bucket public
        fileSizeLimit: 52428800, // 50MB limit
      });
      
      if (error) {
        console.error("Error creating bucket:", error);
        throw new Error(`Failed to create documents bucket: ${error.message}`);
      }
      
      console.log("Documents bucket created successfully");
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Documents bucket created successfully", 
          data 
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    } else {
      console.log("Documents bucket already exists, no action needed");
      return new Response(
        JSON.stringify({ success: true, message: "Documents bucket already exists" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error creating documents bucket:", error);
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
