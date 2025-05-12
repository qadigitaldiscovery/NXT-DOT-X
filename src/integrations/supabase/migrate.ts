
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
    
    if (checkError) {
      console.error("Error checking if column exists:", checkError);
      // If the function doesn't exist or fails, try to add the column anyway
      await tryAddConfigColumn();
      return;
    }
    
    if (data === false) {
      console.log("Adding config column to api_provider_settings table");
      await tryAddConfigColumn();
    } else {
      console.log("Column 'config' already exists in api_provider_settings table");
    }
  } catch (err) {
    console.error("Error checking or executing migrations:", err);
    // Try to add the column anyway
    await tryAddConfigColumn();
  }
};

async function tryAddConfigColumn() {
  try {
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
  } catch (err) {
    console.error("Failed to add config column:", err);
  }
}
