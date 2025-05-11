
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// Get API keys from environment variables
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const REQUESTY_API_KEY = Deno.env.get('REQUESTY_API_KEY');

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { provider, endpoint, payload, config } = await req.json();
    
    // Check which provider is being used
    if (provider === 'openai') {
      return handleOpenAIRequest(endpoint, payload, config);
    } else if (provider === 'requesty') {
      return handleRequestyRequest(endpoint, payload);
    } else {
      return new Response(
        JSON.stringify({ error: 'Unsupported provider' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error(`Error in api-proxy function:`, error);
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

/**
 * Handle OpenAI API requests
 */
async function handleOpenAIRequest(endpoint: string, payload: any, config: any = null) {
  if (!OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'OpenAI API key not configured on the server' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Apply any additional config parameters if available
  if (config) {
    // Apply temperature if it exists
    if (config.temperature_default !== undefined && payload.temperature === undefined) {
      payload.temperature = config.temperature_default;
    }
    
    // Apply max_tokens if it exists
    if (config.max_tokens_default !== undefined && payload.max_tokens === undefined) {
      payload.max_tokens = config.max_tokens_default;
    }
    
    // Apply frequency_penalty if it exists
    if (config.frequency_penalty_default !== undefined && payload.frequency_penalty === undefined) {
      payload.frequency_penalty = config.frequency_penalty_default;
    }
    
    // Apply presence_penalty if it exists
    if (config.presence_penalty_default !== undefined && payload.presence_penalty === undefined) {
      payload.presence_penalty = config.presence_penalty_default;
    }
  }

  // Set up the request URL
  const baseUrl = 'https://api.openai.com/v1';
  const url = `${baseUrl}/${endpoint}`;
  
  // Set up request headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
  };
  
  // Add organization if configured
  if (config?.organization_id) {
    headers['OpenAI-Organization'] = config.organization_id;
  }
  
  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    // Get the response data
    const data = await response.json();
    
    // Return the response
    return new Response(
      JSON.stringify(data),
      { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Error calling OpenAI API' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Handle Requesty API requests
 */
async function handleRequestyRequest(endpoint: string, payload: any) {
  if (!REQUESTY_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'Requesty API key not configured on the server' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
  
  // Set up the request URL
  const url = `https://router.requesty.ai/v1/${endpoint}`;
  
  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${REQUESTY_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    // Get the response data
    const data = await response.json();
    
    // Return the response
    return new Response(
      JSON.stringify(data),
      { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error calling Requesty API:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Error calling Requesty API' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
