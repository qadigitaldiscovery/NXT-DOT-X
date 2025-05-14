
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
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    // Using service role key because bucket creation requires admin privileges
    const supabase = createClient(supabaseUrl, supabaseServiceRole);
    
    // Check if bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const documentsBucketExists = buckets?.some(bucket => bucket.name === 'documents');
    
    if (!documentsBucketExists) {
      // Create the documents bucket
      const { data, error } = await supabase.storage.createBucket('documents', {
        public: true, // Make the bucket public
        fileSizeLimit: 52428800, // 50MB limit
      });
      
      if (error) {
        throw new Error(`Failed to create documents bucket: ${error.message}`);
      }
      
      return new Response(
        JSON.stringify({ success: true, message: "Documents bucket created successfully", data }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ success: true, message: "Documents bucket already exists" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error creating documents bucket:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
