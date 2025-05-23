import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface PreferencesOptions {
  module: string;
  key: string;
  defaultValue: any;
}

// Create a localStorage-based preferences fallback
const localStoragePreferences = {
  getItem: (userId: string, module: string, key: string): any => {
    try {
      const storageKey = `preferences_${userId}_${module}_${key}`;
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  setItem: (userId: string, module: string, key: string, value: any): void => {
    try {
      const storageKey = `preferences_${userId}_${module}_${key}`;
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }
};

// UUID validation function
const isValidUUID = (id: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

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
  const usingLocalStorageFallbackRef = useRef(false);

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
    
    // If no user, use default value
    if (!user?.id) {
      console.log('No user ID available, using default preferences');
      setPreferences(defaultValue);
      setLoading(false);
      fetchedRef.current = true;
      fetchAttemptCount.current++;
      return;
    }

    const fetchPreferences = async () => {
      try {
        fetchInProgressRef.current = true;
        // Sanitize key to ensure it doesn't have invalid characters
        const sanitizedKey = key.replace(/[^a-zA-Z0-9_-]/g, '_');
        
        // Check if user ID is a valid UUID for Supabase
        const shouldUseSupabase = isValidUUID(user.id);
        
        if (!shouldUseSupabase) {
          usingLocalStorageFallbackRef.current = true;
          console.log(`User ID ${user.id} is not a valid UUID, using localStorage fallback`);
          
          // Attempt to fetch from localStorage
          const localData = localStoragePreferences.getItem(user.id, module, sanitizedKey);
          if (localData) {
            setPreferences(localData);
          } else {
            setPreferences(defaultValue);
            localStoragePreferences.setItem(user.id, module, sanitizedKey, defaultValue);
          }
          
          if (isMounted.current) {
            setLoading(false);
          }
          fetchedRef.current = true;
          lastFetchedUserId.current = user.id;
          fetchInProgressRef.current = false;
          fetchAttemptCount.current++;
          return;
        }
        
        console.log(`Fetching preferences from Supabase for user ${user.id}, module ${module}, key ${sanitizedKey}`);
        
        const { data, error } = await supabase
          .from('user_preferences')
          .select('value')
          .eq('user_id', user.id)
          .eq('module', module)
          .eq('key', sanitizedKey)
          .maybeSingle();

        if (!isMounted.current) return;

        if (error) {
          // Check if error is about non-existing table or permission issues
          if (error.code === '42P01' || error.code === '42501') {
            console.warn('User preferences table not found or no access. Using localStorage fallback');
            // Fallback to localStorage
            const localData = localStoragePreferences.getItem(user.id, module, sanitizedKey);
            if (localData) {
              setPreferences(localData);
            } else {
              setPreferences(defaultValue);
              localStoragePreferences.setItem(user.id, module, sanitizedKey, defaultValue);
            }
          } else {
            throw error;
          }
        } else if (data) {
          console.log(`Found preferences in Supabase for user ${user.id}:`, data.value);
          setPreferences(data.value);
        } else {
          // No stored preferences, use default
          console.log(`No stored preferences found in Supabase, using default for ${module}.${sanitizedKey}`);
          setPreferences(defaultValue);
          
          // Save default
          try {
            await supabase.from('user_preferences').insert({
              user_id: user.id,
              module,
              key: sanitizedKey,
              value: defaultValue,
            });
          } catch (insertErr) {
            console.warn('Error saving default preferences to Supabase:', insertErr);
            // Fallback to localStorage
            localStoragePreferences.setItem(user.id, module, sanitizedKey, defaultValue);
          }
        }
        
        // Mark as fetched to prevent repeated fetching
        fetchedRef.current = true;
        lastFetchedUserId.current = user.id;
      } catch (err) {
        if (!isMounted.current) return;
        console.error('Error fetching preferences:', err);
        setError(err as Error);
        
        // Try localStorage as fallback on error
        try {
          const localData = localStoragePreferences.getItem(user.id, module, key.replace(/[^a-zA-Z0-9_-]/g, '_'));
          if (localData) {
            setPreferences(localData);
          } else {
            setPreferences(defaultValue);
          }
        } catch {
          // Final fallback to default
          setPreferences(defaultValue);
        }
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
  }, [module, key, defaultValue, user?.id]);

  const setPreferencesValue = useCallback(async (newValue: any) => {
    // Update local state immediately
    setPreferences(newValue);
    
    if (!user?.id) {
      console.log('No user ID available, preferences will not be saved');
      return { success: false };
    }

    try {
      // Sanitize key to ensure it doesn't have invalid characters
      const sanitizedKey = key.replace(/[^a-zA-Z0-9_-]/g, '_');

      // Check if we should use Supabase or localStorage based on UUID validation
      if (!isValidUUID(user.id) || usingLocalStorageFallbackRef.current) {
        console.log(`Using localStorage for preferences (user ID ${user.id})`);
        localStoragePreferences.setItem(user.id, module, sanitizedKey, newValue);
        return { success: true };
      }

      // Try to save to Supabase
      const { data, error } = await supabase
        .from('user_preferences')
        .select('id')
        .eq('user_id', user.id)
        .eq('module', module)
        .eq('key', sanitizedKey)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.warn('Error checking preferences, falling back to localStorage:', error);
        localStoragePreferences.setItem(user.id, module, sanitizedKey, newValue);
        return { success: true };
      }

      if (data?.id) {
        // Update existing preference
        const { error: updateError } = await supabase
          .from('user_preferences')
          .update({ value: newValue })
          .eq('id', data.id);
          
        if (updateError) {
          console.warn('Error updating preference in Supabase, using localStorage fallback:', updateError);
          localStoragePreferences.setItem(user.id, module, sanitizedKey, newValue);
        }
      } else {
        // Insert new preference
        const { error: insertError } = await supabase.from('user_preferences').insert({
          user_id: user.id,
          module,
          key: sanitizedKey,
          value: newValue,
        });
        
        if (insertError) {
          console.warn('Error inserting preference in Supabase, using localStorage fallback:', insertError);
          localStoragePreferences.setItem(user.id, module, sanitizedKey, newValue);
        }
      }
      
      return { success: true };
    } catch (err) {
      console.error('Error saving preferences:', err);
      
      // Fallback to localStorage on error
      try {
        localStoragePreferences.setItem(user.id, module, key.replace(/[^a-zA-Z0-9_-]/g, '_'), newValue);
        return { success: true };
      } catch (localErr) {
        return { success: false, error: err };
      }
    }
  }, [user?.id, module, key]);

  return {
    preferences,
    setPreferences: setPreferencesValue,
    loading,
    error,
  };
}
