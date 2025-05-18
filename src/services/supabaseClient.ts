
// supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Define fallback URL and key for development purposes
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ehzhosyzybzxhvhisojh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoemhvc3l6eWJ6eGh2aGlzb2poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MjIwOTQsImV4cCI6MjA2MjA5ODA5NH0.VtWHAoglSqwBEwr_Edujt5nSsLMJMCqEr1ALqbKVEVQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
