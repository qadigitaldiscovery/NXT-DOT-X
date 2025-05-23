
import { supabase } from '@/integrations/supabase/client';

/**
 * Helper function to check if a column exists in a table
 */
export const columnExists = async (table: string, column: string): Promise<boolean> => {
  try {
    // Instead of directly querying information_schema, try a safer approach
    // by attempting to select the column and catching the error
    try {
      // Use a type assertion to bypass TypeScript's type checking for dynamic table access
      const { error } = await (supabase
        .from(table as any)
        .select(`${column}`)
        .limit(1) as any);
      
      // If there's an error about the column not existing, return false
      if (error && error.message.includes(`column "${column}" does not exist`)) {
        console.info(`Column ${column} does not exist in ${table}.`);
        return false;
      }
      
      // If no error related to column not existing, assume it exists
      console.info(`Column ${column} exists in ${table}.`);
      return true;
    } catch (queryError) {
      console.error(`Error in column check method:`, queryError);
      return false;
    }
  } catch (error) {
    console.error(`Error checking if column ${column} exists in ${table}:`, error);
    return false;
  }
};
