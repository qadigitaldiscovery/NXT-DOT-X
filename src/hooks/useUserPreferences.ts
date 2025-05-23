
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface UserPreference {
  id: string;
  user_id: string;
  module: string;
  key: string;
  value: any;
}

interface UseUserPreferencesProps {
  module: string;
  key: string;
  defaultValue: any;
}

export function useUserPreferences({ module, key, defaultValue }: UseUserPreferencesProps) {
  const [preferences, setPreferencesState] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  // Fetch preferences on component mount
  useEffect(() => {
    async function fetchPreferences() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('value')
          .eq('user_id', user.id)
          .eq('module', module)
          .eq('key', key)
          .maybeSingle();

        if (error) {
          console.error('Error fetching preferences:', error);
          setError(new Error(error.message));
          return;
        }

        if (data) {
          setPreferencesState(data.value);
        }
      } catch (err) {
        console.error('Failed to fetch preferences:', err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchPreferences();
  }, [user, module, key]);

  // Update preferences
  const setPreferences = async (newValue: any) => {
    if (!user) {
      console.warn('Cannot update preferences: User not authenticated');
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          module,
          key,
          value: newValue,
          updated_at: new Date()
        }, {
          onConflict: 'user_id,module,key'
        });

      if (error) {
        console.error('Error updating preferences:', error);
        toast.error('Failed to save preferences');
        setError(new Error(error.message));
        return;
      }

      setPreferencesState(newValue);
    } catch (err) {
      console.error('Failed to update preferences:', err);
      toast.error('Failed to save preferences');
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    preferences,
    setPreferences,
    isLoading,
    error
  };
}

// Export the old interface for backward compatibility
export const useUserPreferences_old = (userId?: string) => {
  const [preferences, setPreferences] = useState<UserPreference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPreferences = async () => {
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
      return { success: true };
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
