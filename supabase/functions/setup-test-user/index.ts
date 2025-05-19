
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
    
    // Create admin test user if it doesn't exist
    const email = "admin@example.com";
    const password = "Pass1";
    
    // Check if the user already exists
    const { data: existingUser, error: lookupError } = await supabaseAdmin.auth.admin.getUserByEmail(email);
    
    let userId;
    
    if (lookupError || !existingUser) {
      // User doesn't exist, create a new one
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });
      
      if (createError) {
        throw createError;
      }
      
      userId = newUser.user.id;
    } else {
      userId = existingUser.id;
    }
    
    // Ensure the profile exists with admin role
    await supabaseAdmin.from("profiles").upsert({
      id: userId,
      name: "Admin User",
      role: "admin",
      updated_at: new Date(),
    });
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Test admin user setup complete" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
