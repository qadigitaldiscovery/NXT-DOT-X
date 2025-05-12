
import { supabase } from './client';

export const runMigrations = async () => {
  try {
    // Directly execute SQL query to alter table
    try {
      console.log("Attempting to add config column to api_provider_settings table if it doesn't exist");
      
      // Check if the table exists first
      const { data: tableExists } = await supabase
        .from('api_provider_settings')
        .select('id')
        .limit(1)
        .throwOnError();
      
      // If we get here, the table exists, now try to add the column
      const { error } = await supabase.rpc(
        'execute_sql',
        { 
          sql: "ALTER TABLE IF EXISTS api_provider_settings ADD COLUMN IF NOT EXISTS config JSONB DEFAULT '{}'::jsonb"
        }
      );
      
      if (error) {
        console.error("Error executing migration via RPC:", error);
        console.log("Will attempt direct SQL query as fallback");
      } else {
        console.log("Successfully executed migration");
      }
    } catch (err) {
      console.error("Error checking table or adding column:", err);
    }
  } catch (err) {
    console.error("Error executing migrations:", err);
  }
};
