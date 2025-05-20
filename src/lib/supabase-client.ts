import { createClient } from '@supabase/supabase-js';

// Fallback to demo/test values if env vars are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key';

console.warn('Using demo/test Supabase configuration');

export type Database = {
  public: {
    Tables: {
      suppliers: {
        Row: {
          id: string;
          businessName: string;
          status: 'active' | 'pending' | 'inactive';
          contactEmail: string;
          contactPhone?: string;
          address?: string;
          website?: string;
          description?: string;
          creditRating?: {
            grade: string;
            description: string;
            lastUpdated: string;
          };
          creditLimit?: number;
          localScore?: number;
          marketData?: {
            industryRank: number;
            marketShare: number;
            growthTrend: 'up' | 'down' | 'stable';
          };
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['suppliers']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['suppliers']['Insert']>;
      };
      supplier_performance: {
        Row: {
          id: string;
          supplier_id: string;
          onTimeDelivery: number;
          qualityScore: number;
          responseTime: number;
          historical: Array<{
            date: string;
            score: number;
          }>;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['supplier_performance']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['supplier_performance']['Insert']>;
      };
    };
  };
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
