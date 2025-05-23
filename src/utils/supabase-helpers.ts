
import { supabase } from '@/integrations/supabase/client';
import { PostgrestQueryBuilder } from '@supabase/supabase-js';

/**
 * Helper function for type-safe access to Supabase tables
 * This allows us to safely access tables that might not be in the generated types
 * but that we know exist in the database
 */
export function typedSupabaseQuery<T = any>(tableName: string) {
  // Cast to any to bypass TypeScript's type checking for dynamic table access
  return supabase.from(tableName) as unknown as PostgrestQueryBuilder<any, T>;
}

/**
 * Helper function to check if a column exists in a table
 * Useful for migrations and feature detection
 */
export async function checkColumnExists(tableName: string, columnName: string, schemaName = 'public') {
  try {
    const { data, error } = await supabase.rpc('column_exists', {
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
 * Helper function to access the profiles table in a type-safe way
 */
export interface ProfileData {
  id: string;
  username?: string;
  email?: string;
  role?: 'admin' | 'manager' | 'user';
  permissions?: string[];
  created_at?: string;
  updated_at?: string;
}

export function profilesTable() {
  return typedSupabaseQuery<ProfileData>("profiles");
}
