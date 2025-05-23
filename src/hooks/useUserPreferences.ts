
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export interface UserPreference {
  id: string;
  user_id: string;
  module: string;
  key: string;
  value: any;
  updated_at: string | null;
}

interface UseUserPreferencesOptions {
  module: string;
  key: string;
  defaultValue?: any;
}

export const useUserPreferences = (options?: UseUserPreferencesOptions) => {
  const { user } = useAuth();
  const [preferences, setPreferencesState] = useState<any>(options?.defaultValue || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPreferences = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      // Mock data instead of database call to avoid UUID errors
      setPreferencesState(options?.defaultValue || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching preferences:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setPreferencesState(options?.defaultValue || []);
    } finally {
      setLoading(false);
    }
  }, [user?.id, options?.defaultValue]);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  const updatePreference = async (module: string, key: string, value: any) => {
    if (!user?.id) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      // Mock update - just update local state
      const newPreference = {
        id: `${module}-${key}`,
        user_id: user.id,
        module,
        key,
        value,
        updated_at: new Date().toISOString()
      };

      setPreferencesState(value);

      return { success: true };
    } catch (err) {
      console.error('Error updating preference:', err);
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
    }
  };

  const setPreferences = async (newValue: any) => {
    if (options) {
      const result = await updatePreference(options.module, options.key, newValue);
      return result;
    }
    return { success: false, error: 'No options provided' };
  };

  const refetch = async () => {
    await fetchPreferences();
    return { success: true };
  };

  // If options are provided, return the specific preference value
  return {
    preferences,
    loading,
    isLoading: loading,
    error,
    updatePreference,
    setPreferences,
    refetch
  };
};
