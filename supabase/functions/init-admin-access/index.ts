
// supabase/functions/init-admin-access/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'userId is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // 1. Set this user as an admin
    const { error: roleError } = await supabase
      .from('user_roles')
      .upsert([
        { user_id: userId, role: 'admin' }
      ]);

    if (roleError) throw roleError;
    
    // 2. Insert default module access for the admin
    const defaultModules = [
      { module_slug: 'dashboard', category: 'project', submenu_slug: null, is_enabled: true },
      { module_slug: 'users', category: 'admin', submenu_slug: null, is_enabled: true },
      { module_slug: 'roles', category: 'admin', submenu_slug: null, is_enabled: true },
      { module_slug: 'security', category: 'admin', submenu_slug: null, is_enabled: true },
      { module_slug: 'database', category: 'system', submenu_slug: null, is_enabled: true },
      { module_slug: 'reporting', category: 'admin', submenu_slug: null, is_enabled: true },
      { module_slug: 'module-access', category: 'admin', submenu_slug: null, is_enabled: true },
    ];
    
    // Map the default modules to include the user ID
    const modulesWithUserId = defaultModules.map(module => ({
      user_id: userId,
      ...module
    }));
    
    const { error: moduleError } = await supabase
      .from('user_module_access')
      .upsert(modulesWithUserId);
    
    if (moduleError) throw moduleError;
    
    return new Response(
      JSON.stringify({ success: true, message: 'Admin access configured successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
