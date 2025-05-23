import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, ProfileData } from './types';
import { checkPermission, createAuthUser } from './authUtils';

// Create the context with undefined as initial value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [session, setSession] = useState<AuthContextType['session']>(null);
  const [loading, setLoading] = useState(true);

  // Helper function to fetch user profile
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      return { profileData: data as ProfileData | null, error };
    } catch (error) {
      console.error('Error fetching profile:', error);
      return { profileData: null, error };
    }
  };

  // Set up auth state listener
  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.email);
        
        setSession(currentSession);
        
        if (currentSession?.user) {
          // Load profile data in a timeout to avoid deadlocks
          setTimeout(async () => {
            try {
              // Try to fetch user profile data
              const { profileData, error } = await fetchUserProfile(currentSession.user!.id);
                
              if (error) {
                console.log('No profile found for user');
                
                // For admin@admin.com, create an admin profile
                if (currentSession.user!.email === 'admin@admin.com') {
                  // Create admin profile
                  const adminProfile: ProfileData = {
                    id: currentSession.user!.id,
                    username: 'Admin',
                    email: currentSession.user!.email,
                    role: 'admin',
                    permissions: ['users.view', 'users.create', 'users.edit', 'users.delete', 'settings.access', 'modules.all']
                  };
                  
                  await supabase.from('profiles').upsert(adminProfile);
                  
                  // Set up admin user role
                  await supabase.from('user_roles').upsert({
                    user_id: currentSession.user!.id,
                    role: 'admin'
                  });
                  
                  // Update user with admin role
                  setUser(createAuthUser(currentSession.user, adminProfile));
                } else {
                  // Create regular user profile
                  const userProfile: ProfileData = {
                    id: currentSession.user!.id,
                    username: currentSession.user!.email?.split('@')[0] || 'User',
                    email: currentSession.user!.email,
                    role: 'user',
                    permissions: []
                  };
                  
                  await supabase.from('profiles').upsert(userProfile);
                  
                  // Add regular user role
                  await supabase.from('user_roles').upsert({
                    user_id: currentSession.user!.id,
                    role: 'user'
                  });

                  // Set basic user
                  setUser(createAuthUser(currentSession.user, userProfile));
                }
              } else if (profileData) {
                // Update user with profile data
                setUser(createAuthUser(currentSession.user, profileData));
              }
            } catch (err) {
              console.error('Error updating user profile:', err);
            } finally {
              setLoading(false);
            }
          }, 0);
          
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
          setLoading(false);
        }
      }
    );
    
    // Then check for existing session
    const initAuth = async () => {
      setLoading(true);
      try {
        // Get current session
        const { data: sessionData } = await supabase.auth.getSession();
        setSession(sessionData?.session || null);
        
        if (sessionData?.session?.user) {
          const { profileData, error } = await fetchUserProfile(sessionData.session.user.id);
          
          if (error) {
            console.log('No profile found for existing user');
            
            // Basic user without profile
            setUser(createAuthUser(sessionData.session.user, null));
          } else {
            // User with profile
            setUser(createAuthUser(sessionData.session.user, profileData));
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
    
    // Cleanup the subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      if (!email || !password) {
        toast.error('Please provide both email and password');
        return false;
      }
      
      // Use Supabase auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error.message);
        toast.error(error.message || 'Invalid credentials');
        return false;
      }
      
      if (!data.user) {
        toast.error('Login failed - user not found');
        return false;
      }
      
      toast.success(`Welcome back, ${data.user.email}!`);
      return true;
    } catch (err: any) {
      console.error('Login exception:', err);
      toast.error(err.message || 'An error occurred during login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      toast.info('You have been logged out');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    } finally {
      setLoading(false);
    }
  };

  // Check permission function
  const hasPermission = (permission: string): boolean => {
    return checkPermission(user, permission);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      login, 
      logout,
      hasPermission,
      loading,
      session
    }}>
      {children}
    </AuthContext.Provider>
  );
};
