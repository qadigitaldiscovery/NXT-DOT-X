
import { createClient } from '@supabase/supabase-js';

// This script can be used to set the ODOO_API_KEY secret
// Usage: SUPABASE_URL=your-url SUPABASE_SERVICE_ROLE=your-role node setOdooApiKeySecret.js your-api-key

async function setOdooApiKeySecret() {
  const apiKey = process.argv[2];
  
  if (!apiKey) {
    console.error("Please provide an API key as an argument");
    process.exit(1);
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;
  
  if (!supabaseUrl || !supabaseServiceRole) {
    console.error("Missing environment variables: SUPABASE_URL and SUPABASE_SERVICE_ROLE are required");
    process.exit(1);
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceRole);
    
    // Set the secret
    const { error } = await supabase.functions.setSecret('api-integrations', 'ODOO_API_KEY', apiKey);
    
    if (error) {
      console.error("Failed to set secret:", error);
      process.exit(1);
    }
    
    console.log("ODOO_API_KEY secret set successfully");
  } catch (err) {
    console.error("Error setting secret:", err);
    process.exit(1);
  }
}

setOdooApiKeySecret();
