
import { supabase } from '@/integrations/supabase/client';

/**
 * Helper function to check if a column exists in a table
 */
export const columnExists = async (table: string, column: string): Promise<boolean> => {
  try {
    // Use a direct SQL query instead of the RPC method
    const { data, error } = await supabase
      .from('information_schema.columns')
      .select('column_name')
      .eq('table_schema', 'public')
      .eq('table_name', table)
      .eq('column_name', column)
      .single();
    
    if (error) {
      console.error(`Error checking if column ${column} exists in ${table}:`, error);
      
      // Fallback method: Try a simple query with the column
      try {
        const { error: queryError } = await supabase
          .from(table)
          .select(`${column}`)
          .limit(1);
        
        // If there's an error about the column not existing, return false
        if (queryError && queryError.message.includes(`column "${column}" does not exist`)) {
          console.info(`Column ${column} does not exist in ${table}.`);
          return false;
        }
        
        // If no error related to column not existing, assume it exists
        console.info(`Config column already exists.`);
        return true;
      } catch (queryError) {
        console.error(`Error in fallback method:`, queryError);
        return false;
      }
    }
    
    return !!data;
  } catch (error) {
    console.error(`Error checking if column ${column} exists in ${table}:`, error);
    return false;
  }
};
