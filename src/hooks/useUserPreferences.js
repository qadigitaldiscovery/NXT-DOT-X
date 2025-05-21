import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
export function useUserPreferences({ module, key, defaultValue }) {
    const [preferences, setPreferencesState] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
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
                    setError(error.message);
                    return;
                }
                if (data) {
                    setPreferencesState(data.value);
                }
            }
            catch (err) {
                console.error('Failed to fetch preferences:', err);
                setError(err.message || 'An unknown error occurred');
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchPreferences();
    }, [user, module, key]);
    // Update preferences
    const setPreferences = async (newValue) => {
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
                setError(error.message);
                return;
            }
            setPreferencesState(newValue);
        }
        catch (err) {
            console.error('Failed to update preferences:', err);
            toast.error('Failed to save preferences');
            setError(err.message || 'An unknown error occurred');
        }
        finally {
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
