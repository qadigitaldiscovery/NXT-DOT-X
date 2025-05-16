
import { useState, useEffect, useRef, useCallback } from 'react';
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
  
  // Use refs to prevent excessive re-rendering
  const fetchedRef = useRef(false);
  const lastFetchedUserId = useRef<string | null>(null);

  // Validate user ID
  const isValidUserId = useCallback((userId: any): boolean => {
    return typeof userId === 'string' && 
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId);
  }, []);

  useEffect(() => {
    // Skip if we've already fetched for this user or there's no user
    if (
      (fetchedRef.current && lastFetchedUserId.current === user?.id) || 
      !user?.id
    ) {
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
        if (!isValidUserId(userId)) {
          console.log('Using default preferences due to invalid user ID format');
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
          .maybeSingle(); // Use maybeSingle instead of single to prevent errors

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (data) {
          setPreferences(data.value);
        } else {
          // No stored preferences, use default but don't try to save it immediately
          // This reduces unnecessary operations
          setPreferences(defaultValue);
          
          // Only save default if we have a valid user ID
          if (isValidUserId(userId)) {
            try {
              await supabase.from('user_preferences').insert({
                user_id: userId,
                module,
                key,
                value: defaultValue,
              });
            } catch (insertErr) {
              console.log('Error saving default preferences:', insertErr);
              // Non-fatal error, just log it
            }
          }
        }
        
        // Mark as fetched to prevent repeated fetching
        fetchedRef.current = true;
        lastFetchedUserId.current = userId;
      } catch (err) {
        console.log('Error fetching preferences:', err);
        // Fall back to default preferences on error
        setPreferences(defaultValue);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
    
    // Reset fetched ref when module, key, or defaultValue changes
    return () => {
      if (module !== key) { // Only reset if we're accessing a different preference
        fetchedRef.current = false;
        lastFetchedUserId.current = null;
      }
    };
  }, [module, key, defaultValue, user?.id, isValidUserId]);

  const setPreferencesValue = useCallback(async (newValue: any) => {
    // Update local state immediately
    setPreferences(newValue);
    
    if (!user?.id) {
      console.log('No user ID available, preferences will not be saved');
      return { success: false };
    }

    try {
      // Make sure we're using a valid UUID format
      const userId = user.id;
      if (!isValidUserId(userId)) {
        console.log('Invalid user ID format, preferences will not be saved');
        return { success: false };
      }

      const { data, error } = await supabase
        .from('user_preferences')
        .select('id')
        .eq('user_id', userId)
        .eq('module', module)
        .eq('key', key)
        .maybeSingle(); // Use maybeSingle instead of single

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
      console.log('Error saving preferences:', err);
      return { success: false, error: err };
    }
  }, [user?.id, module, key, isValidUserId]);

  return {
    preferences,
    setPreferences: setPreferencesValue,
    loading,
    error,
  };
}
