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
  
  // Use refs to prevent excessive re-rendering and track state
  const isMounted = useRef(true);
  const fetchedRef = useRef(false);
  const lastFetchedUserId = useRef<string | null>(null);
  const fetchInProgressRef = useRef(false);
  const fetchAttemptCount = useRef(0);

  // Validate user ID format (simple strings or UUID)
  const isValidUserId = useCallback((userId: any): boolean => {
    if (typeof userId === 'string') {
      // Accept simple numeric IDs used in the mock auth system
      if (/^[0-9]+$/.test(userId)) {
        return true;
      }
      // Also accept UUIDs for future compatibility
      return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId);
    }
    return false;
  }, []);

  // Effect cleanup
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Skip if fetch is already in progress to prevent race conditions
    if (fetchInProgressRef.current) return;
    
    // Limit fetch attempts to prevent refresh loops
    if (fetchAttemptCount.current > 3 && !user?.id) {
      setLoading(false);
      return;
    }
    
    // Skip if we've already fetched for this user
    if (fetchedRef.current && lastFetchedUserId.current === user?.id) {
      setLoading(false);
      return;
    }
    
    // If no user or invalid ID, use default value
    if (!user?.id || !isValidUserId(user.id)) {
      if (!user?.id) {
        console.log('No user ID available, using default preferences');
      } else {
        console.warn('Invalid user ID format, using default preferences');
      }
      setPreferences(defaultValue);
      setLoading(false);
      fetchedRef.current = true; // Mark as fetched to prevent repeated attempts
      fetchAttemptCount.current++;
      return;
    }

    const fetchPreferences = async () => {
      try {
        fetchInProgressRef.current = true;
        console.log(`Fetching preferences for user ${user.id}, module ${module}, key ${key}`);
        
        // Sanitize key to ensure it doesn't have invalid characters
        const sanitizedKey = key.replace(/[^a-zA-Z0-9_-]/g, '_');
        
        const { data, error } = await supabase
          .from('user_preferences')
          .select('value')
          .eq('user_id', user.id)
          .eq('module', module)
          .eq('key', sanitizedKey)
          .maybeSingle();

        if (!isMounted.current) return;

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (data) {
          console.log(`Found preferences for user ${user.id}:`, data.value);
          setPreferences(data.value);
        } else {
          // No stored preferences, use default
          console.log(`No stored preferences found, using default for ${module}.${sanitizedKey}`);
          setPreferences(defaultValue);
          
          // Only save default if we have a valid user ID
          if (isValidUserId(user.id)) {
            try {
              await supabase.from('user_preferences').insert({
                user_id: user.id,
                module,
                key: sanitizedKey,
                value: defaultValue,
              });
            } catch (insertErr) {
              console.warn('Error saving default preferences:', insertErr);
              // Non-fatal error, just log it
            }
          }
        }
        
        // Mark as fetched to prevent repeated fetching
        fetchedRef.current = true;
        lastFetchedUserId.current = user.id;
      } catch (err) {
        if (!isMounted.current) return;
        console.error('Error fetching preferences:', err);
        setError(err as Error);
        // Fall back to default preferences on error
        setPreferences(defaultValue);
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
        fetchInProgressRef.current = false;
        fetchAttemptCount.current++;
      }
    };

    fetchPreferences();
    
    // Only reset fetched status when key dependencies change
    return () => {
      if (module !== key) {
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
      // Validate user ID format
      if (!isValidUserId(user.id)) {
        console.log('Invalid user ID format, preferences will not be saved');
        return { success: false };
      }
      
      // Sanitize key to ensure it doesn't have invalid characters
      const sanitizedKey = key.replace(/[^a-zA-Z0-9_-]/g, '_');

      const { data, error } = await supabase
        .from('user_preferences')
        .select('id')
        .eq('user_id', user.id)
        .eq('module', module)
        .eq('key', sanitizedKey)
        .maybeSingle();

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
          user_id: user.id,
          module,
          key: sanitizedKey,
          value: newValue,
        });
      }
      
      return { success: true };
    } catch (err) {
      console.error('Error saving preferences:', err);
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
