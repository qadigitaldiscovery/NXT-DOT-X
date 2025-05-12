
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type ThresholdRule = {
  id: string;
  module_id: string;
  metric: string;
  condition: string;
  threshold: number;
  duration_seconds: number | null;
  resulting_status: 'green' | 'orange' | 'red';
  created_at: string;
}

export function useThresholdRules(moduleId?: string) {
  const [rules, setRules] = useState<ThresholdRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        setLoading(true);
        
        // Use type assertion to fix the table name issue
        let query = supabase.from('threshold_rules' as any).select('*');
        
        if (moduleId) {
          query = query.eq('module_id', moduleId);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        // Use type assertion to handle the type mismatch
        setRules((data || []) as unknown as ThresholdRule[]);
      } catch (err) {
        console.error('Error fetching threshold rules:', err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchRules();
  }, [moduleId]);

  const addRule = async (rule: Omit<ThresholdRule, 'id' | 'created_at'>) => {
    try {
      // Use type assertion to fix the table name issue
      const { data, error } = await supabase
        .from('threshold_rules' as any)
        .insert(rule as any)
        .select();
      
      if (error) throw error;
      
      setRules(prev => [...prev, (data[0] as unknown as ThresholdRule)]);
      return { success: true, data: data[0] };
    } catch (err) {
      console.error('Error adding threshold rule:', err);
      return { success: false, error: err };
    }
  };

  const deleteRule = async (id: string) => {
    try {
      // Use type assertion to fix the table name issue
      const { error } = await supabase
        .from('threshold_rules' as any)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setRules(prev => prev.filter(rule => rule.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Error deleting threshold rule:', err);
      return { success: false, error: err };
    }
  };

  return { rules, loading, error, addRule, deleteRule };
}
