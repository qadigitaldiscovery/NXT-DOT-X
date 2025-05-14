
import { supabase } from '@/integrations/supabase/client';

/**
 * Helper function to check if a column exists in a table
 */
export const columnExists = async (table: string, column: string): Promise<boolean> => {
  try {
    // Instead of directly querying information_schema or using an RPC that might not be defined
    // in TypeScript, use a more direct approach by trying to select the column
    try {
      // Attempt to select the column from the table
      const { error } = await supabase
        .from(table as any)
        .select(`${column}`)
        .limit(1);
      
      // If there's an error about the column not existing, return false
      if (error && error.message.includes(`column "${column}" does not exist`)) {
        console.info(`Column ${column} does not exist in ${table}.`);
        return false;
      }
      
      // If we got here without an error about the column not existing, assume it exists
      console.info(`Column ${column} exists in ${table}.`);
      return true;
    } catch (err) {
      console.error(`Error checking if column ${column} exists in ${table}:`, err);
      return false;
    }
  } catch (error) {
    console.error(`Error in columnExists function:`, error);
    return false;
  }
};
