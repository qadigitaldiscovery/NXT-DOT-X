
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.8"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get supabase client for the edge function
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? '',
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ''
    )

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Extract token from the Authorization header
    const token = authHeader.replace('Bearer ', '')

    // Verify the token and get the user id
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token', details: userError }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get body from request
    const { provider, endpoint, payload } = await req.json()

    // Fetch API key from the database
    const { data: providerData, error: providerError } = await supabaseClient
      .from('api_provider_settings')
      .select('api_key, preferred_model')
      .eq('user_id', user.id)
      .eq('provider_name', provider)
      .maybeSingle()

    if (providerError || !providerData?.api_key) {
      return new Response(
        JSON.stringify({ error: 'API key not found', details: providerError }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let apiUrl = ''
    let headers = { 'Content-Type': 'application/json' }
    
    // Determine provider-specific settings
    if (provider === 'openai') {
      apiUrl = `https://api.openai.com/v1/${endpoint}`
      headers = {
        ...headers,
        'Authorization': `Bearer ${providerData.api_key}`,
        'User-Agent': 'nxt-dot-x',
      }
    } else if (provider === 'requesty') {
      apiUrl = `https://router.requesty.ai/v1/${endpoint}`
      headers = {
        ...headers,
        'Authorization': `Bearer ${providerData.api_key}`,
      }
    } else {
      return new Response(
        JSON.stringify({ error: 'Unsupported provider' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Make the actual API call
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })
    
    // Return the API response
    const responseData = await apiResponse.json()
    
    return new Response(
      JSON.stringify(responseData),
      { 
        status: apiResponse.status, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
    
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
