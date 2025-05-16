
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface OdooConfig {
  url: string;
  db_name: string;
  // Support both authentication methods
  username?: string;
  password?: string;
  api_key?: string;
}

interface WooCommerceConfig {
  url: string;
  consumer_key: string;
  consumer_secret: string;
}

async function handleOdoo(req: Request, data: { action: string; [key: string]: any }) {
  try {
    // For test_connection action, use the credentials from the request
    if (data.action === 'test_connection') {
      // Simulate a connection test with provided credentials
      console.log('Testing Odoo connection with provided credentials:', {
        url: data.url,
        db_name: data.db_name,
        // Log authentication method being used
        auth_method: data.api_key ? 'API Key' : 'Username/Password',
      });
      
      // Validate URL format
      try {
        new URL(data.url);
      } catch (e) {
        return { success: false, message: "Invalid URL format" };
      }
      
      // Validate that we have either (username+password) OR api_key
      if (!data.api_key && (!data.username || !data.password)) {
        return { success: false, message: "Either API key or username/password credentials are required" };
      }
      
      // For demo purposes, we'll consider the connection successful
      // In a real implementation, you would actually connect to Odoo
      return { success: true, message: "Connection to Odoo successful" };
    }
    
    // For other actions, get credentials from database
    let config: OdooConfig;
    
    if (data.integration_id) {
      const { data: configs, error } = await supabase
        .from('integration_configs')
        .select('*')
        .eq('id', data.integration_id)
        .eq('integration_type', 'odoo')
        .single();
      
      if (error) throw error;
      if (!configs) throw new Error("Odoo configuration not found");
      
      config = configs.config as OdooConfig;
      
      // Check if we have valid authentication details
      if (!config.api_key && (!config.username || !config.password)) {
        throw new Error("Invalid authentication configuration");
      }
    } else {
      throw new Error("Integration ID is required");
    }
    
    // Here you would actually connect to Odoo using a library
    // For this demo, we'll simulate different API endpoints
    
    switch (data.action) {
      case 'start_sync':
        // Simulate starting a synchronization process
        console.log(`Starting sync for integration ${data.integration_id} with entities:`, data.entities);
        return { 
          success: true, 
          message: "Synchronization started successfully",
          details: {
            integration_id: data.integration_id,
            entities: data.entities,
            started_at: new Date().toISOString()
          }
        };
        
      case 'get_products':
        // Simulate fetching products
        return { 
          success: true, 
          data: [
            { id: 1, name: "Product 1", price: 29.99, type: "service" },
            { id: 2, name: "Product 2", price: 49.99, type: "product" },
            { id: 3, name: "Product 3", price: 19.99, type: "consumable" },
          ]
        };
        
      case 'get_customers':
        // Simulate fetching customers
        return { 
          success: true, 
          data: [
            { id: 1, name: "Customer A", email: "customer.a@example.com" },
            { id: 2, name: "Customer B", email: "customer.b@example.com" },
          ]
        };
        
      default:
        return { success: false, message: "Unknown action" };
    }
  } catch (error) {
    console.error("Odoo API error:", error);
    return { success: false, message: error.message };
  }
}

async function handleWooCommerce(req: Request, data: { action: string; [key: string]: any }) {
  try {
    // Get WooCommerce configuration
    const { data: configs, error } = await supabase
      .from('integration_configs')
      .select('*')
      .eq('integration_type', 'woocommerce')
      .limit(1)
      .single();
    
    if (error) throw error;
    if (!configs) throw new Error("WooCommerce configuration not found");
    
    const config = configs.config as WooCommerceConfig;

    // Here you would actually connect to WooCommerce using a library
    // For this demo, we'll simulate different API endpoints
    
    switch (data.action) {
      case 'test_connection':
        // Simulate a connection test
        return { success: true, message: "Connection to WooCommerce successful" };
        
      case 'get_products':
        // Simulate fetching products
        return { 
          success: true, 
          data: [
            { id: 1, name: "WooCommerce Product 1", price: 29.99, stock: 10 },
            { id: 2, name: "WooCommerce Product 2", price: 49.99, stock: 5 },
            { id: 3, name: "WooCommerce Product 3", price: 19.99, stock: 15 },
          ]
        };
        
      case 'get_orders':
        // Simulate fetching orders
        return { 
          success: true, 
          data: [
            { id: 1001, status: "completed", total: 129.99, customer_id: 42 },
            { id: 1002, status: "processing", total: 89.99, customer_id: 43 },
          ]
        };
        
      default:
        return { success: false, message: "Unknown action" };
    }
  } catch (error) {
    console.error("WooCommerce API error:", error);
    return { success: false, message: error.message };
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create authenticated Supabase client
    const supabaseClient = createClient(
      supabaseUrl,
      supabaseAnonKey,
      { global: { headers: { Authorization: authHeader } } }
    );

    // Get the user from the auth header
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', details: userError }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the request body
    const requestData = await req.json();
    
    // Route the request to the appropriate handler
    let result;
    if (req.url.includes('/odoo')) {
      result = await handleOdoo(req, requestData);
    } else if (req.url.includes('/woocommerce')) {
      result = await handleWooCommerce(req, requestData);
    } else {
      result = { error: 'Invalid API endpoint' };
    }
    
    // Return the result
    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
