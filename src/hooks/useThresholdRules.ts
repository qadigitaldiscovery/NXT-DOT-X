
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type ThresholdRule = {
  id: string;
  module_id: string;
  metric: string;
  operator: '>' | '<' | '==' | '>=' | '<=';
  threshold: number;
  duration_seconds: number | null;
  resulting_status: 'green' | 'orange' | 'red';
  condition: string; // Alias for operator to match UI component naming
  created_at: string;
};

export function useThresholdRules(moduleId?: string) {
  const [rules, setRules] = useState<ThresholdRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRules = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // For now, we're returning mock data since we haven't created the threshold_rules table yet
      const mockRules: ThresholdRule[] = moduleId ? [
        {
          id: '1',
          module_id: moduleId,
          metric: 'CPU Usage',
          operator: '>',
          condition: '>', // Alias for operator
          threshold: 90,
          duration_seconds: 300,
          resulting_status: 'orange',
          created_at: new Date().toISOString()
        }
      ] : [];
      
      setRules(mockRules);
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [moduleId]);

  useEffect(() => {
    fetchRules();
  }, [fetchRules]);

  const addRule = async (rule: Omit<ThresholdRule, 'id' | 'created_at' | 'condition' | 'operator'> & { condition: string }) => {
    // In a real implementation, this would insert into the database
    const newRule = {
      ...rule,
      operator: rule.condition as '>' | '<' | '==' | '>=' | '<=',
      condition: rule.condition, // Keep condition as an alias for operator
      id: Math.random().toString(),
      created_at: new Date().toISOString()
    };
    
    setRules(prev => [...prev, newRule as ThresholdRule]);
    return { success: true, error: null };
  };

  const deleteRule = async (id: string) => {
    // In a real implementation, this would delete from the database
    setRules(prev => prev.filter(rule => rule.id !== id));
    return { success: true, error: null };
  };

  // Add the missing getRulesByModuleId function
  const getRulesByModuleId = useCallback((moduleId: string) => {
    return Promise.resolve(
      rules.filter(rule => rule.module_id === moduleId)
    );
  }, [rules]);

  return { rules, loading, error, addRule, deleteRule, getRulesByModuleId };
}
