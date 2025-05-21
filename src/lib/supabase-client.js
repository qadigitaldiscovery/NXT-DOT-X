import { createClient } from '@supabase/supabase-js';
// Fallback to demo/test values if env vars are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key';
console.warn('Using demo/test Supabase configuration');
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
