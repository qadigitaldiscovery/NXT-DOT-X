
import { supabase } from '@/integrations/supabase/client';

/**
 * Helper function to check if a column exists in a table
 */
export const columnExists = async (table: string, column: string): Promise<boolean> => {
  try {
    // Try a simple query with the column
    const { error } = await supabase
      .from(table as any) // Cast to any to bypass TypeScript's table name checking
      .select(`${column}`)
      .limit(1);
    
    // If there's an error about the column not existing, return false
    if (error && error.message.includes(`column '${column}' does not exist`)) {
      return false;
    }
    
    // If there's no error related to the column not existing, assume it exists
    return true;
  } catch (error) {
    console.error(`Error checking if column ${column} exists in ${table}:`, error);
    return false;
  }
};
