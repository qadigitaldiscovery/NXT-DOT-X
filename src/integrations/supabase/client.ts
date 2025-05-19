import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Define fallback URL and key for development purposes
// These should match your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ehzhosyzybzxhvhisojh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoemhvc3l6eWJ6eGh2aGlzb2poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MjIwOTQsImV4cCI6MjA2MjA5ODA5NH0.VtWHAoglSqwBEwr_Edujt5nSsLMJMCqEr1ALqbKVEVQ';

// Create the Supabase client with proper error handling
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Log initialization for debugging
console.log(`Supabase client initialized with URL: ${supabaseUrl.substring(0, 16)}...`);

// Export the client
export { supabase };
