
import { supabase } from './client';

/**
 * This function runs migrations on the database
 * Call this function from your app's initialization code
 */
export async function runMigrations() {
  try {
    // Apply the user profile trigger
    const { error } = await supabase.rpc('apply_migrations');
    
    if (error) {
      console.error('Failed to run migrations:', error);
      return false;
    }

    console.log('Migrations applied successfully');
    return true;
  } catch (err) {
    console.error('Error running migrations:', err);
    return false;
  }
}

// Helper to apply a specific migration file
export async function applyMigration(migrationSQL: string) {
  try {
    const { error } = await supabase.rpc('run_sql', { sql: migrationSQL });
    
    if (error) {
      console.error('Failed to apply migration:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error applying migration:', err);
    return false;
  }
}
