
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface PreferencesOptions {
  module: string;
  key: string;
  defaultValue: any;
}

export function useUserPreferences({ module, key, defaultValue }: PreferencesOptions) {
  const [preferences, setPreferences] = useState<any>(defaultValue);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  
  // Use a ref to prevent excessive re-fetching
  const fetchedRef = useRef(false);

  useEffect(() => {
    // Skip if we've already fetched or there's no user
    if (fetchedRef.current || !user?.id) {
      if (!user?.id) {
        setPreferences(defaultValue);
        setLoading(false);
      }
      return;
    }

    const fetchPreferences = async () => {
      try {
        // Make sure we're using a valid UUID format
        const userId = user.id;
        if (typeof userId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
          console.warn('Invalid user ID format, using default preferences');
          setPreferences(defaultValue);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('user_preferences')
          .select('value')
          .eq('user_id', userId)
          .eq('module', module)
          .eq('key', key)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setPreferences(data.value);
        } else {
          // No stored preferences, save the default
          await supabase.from('user_preferences').insert({
            user_id: userId,
            module,
            key,
            value: defaultValue,
          });
          setPreferences(defaultValue);
        }
        
        // Mark as fetched to prevent repeated fetching
        fetchedRef.current = true;
      } catch (err) {
        console.error('Error fetching preferences:', err);
        // Fall back to default preferences on error
        setPreferences(defaultValue);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
    
    // Reset fetched ref when user changes
    return () => {
      fetchedRef.current = false;
    };
  }, [module, key, defaultValue, user?.id]);

  const setPreferencesValue = async (newValue: any) => {
    // Update local state immediately
    setPreferences(newValue);
    
    if (!user?.id) {
      console.warn('No user ID available, preferences will not be saved');
      return { success: false };
    }

    try {
      // Make sure we're using a valid UUID format
      const userId = user.id;
      if (typeof userId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
        console.warn('Invalid user ID format, preferences will not be saved');
        return { success: false };
      }

      const { data, error } = await supabase
        .from('user_preferences')
        .select('id')
        .eq('user_id', userId)
        .eq('module', module)
        .eq('key', key)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data?.id) {
        // Update existing preference
        await supabase
          .from('user_preferences')
          .update({ value: newValue })
          .eq('id', data.id);
      } else {
        // Insert new preference
        await supabase.from('user_preferences').insert({
          user_id: userId,
          module,
          key,
          value: newValue,
        });
      }
      
      return { success: true };
    } catch (err) {
      console.error('Error saving preferences:', err);
      return { success: false, error: err };
    }
  };

  return {
    preferences,
    setPreferences: setPreferencesValue,
    loading,
    error,
  };
}
