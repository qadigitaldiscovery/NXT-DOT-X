
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UserPreference {
  id: string;
  user_id: string;
  module: string;
  key: string;
  value: any;
}

export const useUserPreferences = (userId?: string) => {
  const [preferences, setPreferences] = useState<UserPreference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPreferences = async () => {
    // Skip fetching if no valid userId
    if (!userId || userId === 'admin-123') {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      setPreferences(data || []);
    } catch (err) {
      console.error('Error fetching preferences:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, [userId]);

  const updatePreference = async (module: string, key: string, value: any) => {
    if (!userId || userId === 'admin-123') {
      return { success: true }; // Mock success for admin user
    }

    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: userId,
          module,
          key,
          value
        });

      if (error) throw error;

      await fetchPreferences();
      return { success: true };
    } catch (err) {
      console.error('Error updating preference:', err);
      return { success: false, error: err };
    }
  };

  return {
    preferences,
    loading,
    error,
    updatePreference,
    refetch: fetchPreferences
  };
};
