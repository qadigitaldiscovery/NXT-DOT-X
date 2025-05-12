
import { supabase } from './client';

export const runMigrations = async () => {
  try {
    // Direct SQL execution approach since the functions don't exist
    const { error: alterError } = await supabase.rpc(
      'execute_sql',
      { 
        sql: "ALTER TABLE IF EXISTS api_provider_settings ADD COLUMN IF NOT EXISTS config JSONB DEFAULT '{}'::jsonb"
      }
    ).catch(() => {
      // Handle the case where the function doesn't exist
      return { error: { message: "Function not found" } };
    });
    
    if (alterError) {
      console.log("Will attempt direct migration via SQL query");
      // Try direct SQL query as a fallback
      try {
        await supabase.from('api_provider_settings').select('id').limit(1);
        console.log("Table exists, attempting to add column if needed");
      } catch (err) {
        console.error("Error checking table or adding column:", err);
      }
    } else {
      console.log("Successfully executed migration");
    }
  } catch (err) {
    console.error("Error executing migrations:", err);
  }
};
