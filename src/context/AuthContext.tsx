import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  permissions: string[];
}

// Define a type for the profile data structure
interface ProfileData {
  id: string;
  username?: string;
  email?: string;
  role?: 'admin' | 'manager' | 'user';
  permissions?: string[];
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        // Try to get session from Supabase
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (sessionData?.session?.user) {
          // Get user profile data
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', sessionData.session.user.id)
            .single();
            
          if (userError) {
            console.error('Error fetching user profile:', userError);
            setUser(null);
          } else if (userData) {
            // Cast the userData to our ProfileData type
            const profileData = userData as unknown as ProfileData;
            
            // Set user with complete profile data
            const loggedInUser: User = {
              id: sessionData.session.user.id,
              username: profileData.username || sessionData.session.user.email?.split('@')[0] || 'User',
              email: sessionData.session.user.email || '',
              role: profileData.role || 'user',
              permissions: profileData.permissions || []
            };
            setUser(loggedInUser);
            console.log('User authenticated from session:', loggedInUser);
          }
        } else {
          // Check localStorage for legacy support
          const storedUser = localStorage.getItem('user');
          const isAuth = localStorage.getItem('isAuthenticated') === 'true';
          
          if (storedUser && isAuth) {
            const parsedUser = JSON.parse(storedUser);
            console.log('Found stored user in localStorage:', parsedUser);
            setUser(parsedUser);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error during authentication initialization:', error);
        setUser(null);
      } finally {
        setIsInitialized(true);
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Set up auth state listener
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // Get user profile data when signed in
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (userError) {
            console.error('Error fetching user profile on auth change:', userError);
          } else if (userData) {
            // Cast the userData to our ProfileData type
            const profileData = userData as unknown as ProfileData;
            
            const loggedInUser: User = {
              id: session.user.id,
              username: profileData.username || session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              role: profileData.role || 'user',
              permissions: profileData.permissions || []
            };
            setUser(loggedInUser);
            console.log('User authenticated on auth change:', loggedInUser);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.removeItem('user');
          localStorage.removeItem('isAuthenticated');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Legacy support - make sure user is properly set in localStorage when it changes
  useEffect(() => {
    if (isInitialized && user) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [isInitialized, user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        toast.error(error.message || 'Invalid credentials');
        return false;
      }

      if (data?.user) {
        // Get user profile data
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (userError) {
          console.error('Error fetching user profile after login:', userError);
        } else if (userData) {
          // Cast the userData to our ProfileData type
          const profileData = userData as unknown as ProfileData;
          
          const loggedInUser: User = {
            id: data.user.id,
            username: profileData.username || data.user.email?.split('@')[0] || 'User',
            email: data.user.email || '',
            role: profileData.role || 'user',
            permissions: profileData.permissions || []
          };
          setUser(loggedInUser);
          toast.success(`Welcome back, ${loggedInUser.username}!`);
        }
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Login error:', err);
      toast.error('An error occurred during login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      toast.info('You have been logged out');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out');
    } finally {
      setLoading(false);
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // Admin always has all permissions
    if (user.role === 'admin') return true;
    
    return user.permissions?.includes(permission) || user.permissions?.includes('modules.all') || false;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      login, 
      logout,
      hasPermission,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
