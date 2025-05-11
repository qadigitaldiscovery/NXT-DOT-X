
import { supabase } from './client';

export const runMigrations = async () => {
  try {
    // Check if config column exists in api_provider_settings table
    const { data, error: checkError } = await supabase.rpc(
      'column_exists',
      { 
        p_table: 'api_provider_settings',
        p_column: 'config'
      }
    );
    
    if (checkError || data === false) {
      // If the stored function doesn't exist or returns false, 
      // proceed with migration
      console.log("Adding config column to api_provider_settings table");
      
      // Execute raw SQL to add the column if it doesn't exist
      const { error } = await supabase.rpc(
        'execute_sql',
        { 
          sql: `ALTER TABLE api_provider_settings ADD COLUMN IF NOT EXISTS config JSONB DEFAULT '{}'::jsonb`
        }
      );
      
      if (error) {
        console.error("Error adding config column:", error);
      } else {
        console.log("Successfully added config column to api_provider_settings table");
      }
    } else {
      console.log("Column 'config' already exists in api_provider_settings table");
    }
  } catch (err) {
    console.error("Error checking or executing migrations:", err);
  }
};
