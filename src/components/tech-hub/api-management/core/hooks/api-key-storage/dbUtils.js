import { supabase } from '@/integrations/supabase/client';
/**
 * Helper function to check if a column exists in a table
 */
export const columnExists = async (table, column) => {
    try {
        // Don't use information_schema direct query through the client as it's not in the generated types
        // Instead use a simpler approach with error handling
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
            console.info(`Column ${column} already exists.`);
            return true;
        }
        catch (queryError) {
            console.error(`Error in column check method:`, queryError);
            return false;
        }
    }
    catch (error) {
        console.error(`Error checking if column ${column} exists in ${table}:`, error);
        return false;
    }
};
