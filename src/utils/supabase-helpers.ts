import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

/**
 * Helper function for type-safe access to Supabase tables
 * This allows us to safely access tables that might not be in the generated types
 * but that we know exist in the database
 */
export function typedSupabaseQuery<T = any>(tableName: string) {
  // Cast to any to bypass TypeScript's type checking for dynamic table access
  return supabase.from(tableName as any) as any;
}

/**
 * Helper function to check if a column exists in a table
 * Useful for migrations and feature detection
 */
export async function checkColumnExists(tableName: string, columnName: string, schemaName = 'public') {
  try {
    const { data, error } = await (supabase.rpc as any)('column_exists', {
      _table_name: tableName,
      _column_name: columnName,
      _schema_name: schemaName
    });
    
    if (error) {
      console.error('Error checking column existence:', error);
      return false;
    }
    
    return data;
  } catch (err) {
    console.error('Exception checking column existence:', err);
    return false;
  }
}

/**
 * Type alias for profile data from database
 */
export type ProfileData = Tables<'profiles'>;
export type ProfileInsert = TablesInsert<'profiles'>;
export type ProfileUpdate = TablesUpdate<'profiles'>;

/**
 * Helper function to access the profiles table with proper typing
 */
export function profilesTable() {
  return supabase.from('profiles');
}
