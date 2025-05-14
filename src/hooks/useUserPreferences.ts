
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

interface UseUserPreferencesProps {
  module: string;
  key: string;
  defaultValue?: any;
}

export function useUserPreferences<T>({ 
  module, 
  key, 
  defaultValue 
}: UseUserPreferencesProps) {
  const [preferences, setPreferences] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user) {
        setPreferences(defaultValue as T);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('user_preferences')
          .select('value')
          .eq('user_id', user.id)
          .eq('module', module)
          .eq('key', key)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching preferences:', error);
          setError(new Error(error.message));
          setPreferences(defaultValue as T);
        } else {
          setPreferences((data?.value as T) || defaultValue as T);
        }
      } catch (err) {
        console.error('Error in preference fetching:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setPreferences(defaultValue as T);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [user, module, key, defaultValue]);

  const savePreferences = async (newPreferences: T) => {
    if (!user) {
      setPreferences(newPreferences);
      return;
    }

    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          module,
          key,
          value: newPreferences,
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }
      
      setPreferences(newPreferences);
      
    } catch (err) {
      console.error('Error saving preferences:', err);
      toast({
        title: 'Error',
        description: 'Failed to save your preferences',
        variant: 'destructive'
      });
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    }
  };

  return {
    preferences,
    setPreferences: savePreferences,
    loading,
    error
  };
}
