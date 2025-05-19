
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '../integrations/supabase/client';

interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  hasPermission: (permission: string) => boolean;
  logout: () => Promise<void>; // Added alias for compatibility
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    // Add your permission logic here
    return false;
  };

  useEffect(() => {
    console.log("AuthProvider: Initializing");
    let mounted = true;

    // Set up auth state change listener FIRST to prevent missing auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("AuthProvider: Auth state changed:", event);
      
      // Use setTimeout to prevent potential deadlock with Supabase client
      setTimeout(async () => {
        if (!mounted) return;
        
        if (session?.user) {
          try {
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();

            if (mounted) {
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                role: profileData?.role || 'user',
                name: profileData?.name,
              });
              console.log("AuthProvider: User updated on auth change");
            }
            
            if (profileError) {
              console.error("Error fetching profile:", profileError);
            }
          } catch (error) {
            console.error("Error in auth state change:", error);
            // Still set the user with basic info even if profile fetch fails
            if (mounted) {
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                role: 'user',
                name: undefined,
              });
            }
          }
        } else if (mounted) {
          setUser(null);
        }
        
        if (mounted) {
          setLoading(false);
        }
      }, 0);
    });

    // THEN check for existing session
    async function checkSession() {
      try {
        console.log("AuthProvider: Checking session");
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user && mounted) {
          console.log("AuthProvider: Session found for:", session.user.email);
          
          try {
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();

            if (mounted) {
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                role: profileData?.role || 'user',
                name: profileData?.name,
              });
              console.log("AuthProvider: User set with role:", profileData?.role || 'user');
            }
            
            if (profileError) {
              console.error("Error fetching profile:", profileError);
            }
          } catch (profileErr) {
            console.error("Error fetching profile:", profileErr);
            // Still set the basic user even if profile fetch fails
            if (mounted) {
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                role: 'user', // Default role if profile fetch fails
                name: undefined,
              });
            }
          }
        } else if (mounted) {
          console.log("AuthProvider: No active session");
          setUser(null);
        }
        
        if (mounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Session check error:", error);
        if (mounted) {
          setLoading(false);
          setUser(null);
        }
      }
    }

    checkSession();

    return () => {
      console.log("AuthProvider: Cleaning up");
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      // Normalize email: trim whitespace and convert to lowercase
      const normalizedEmail = email.trim().toLowerCase();
      
      console.log("AuthProvider: Attempting sign in with:", normalizedEmail);
      
      // For demo purposes, use hardcoded test credentials
      if (normalizedEmail === 'admin@example.com' && password === 'Pass1') {
        console.log("AuthProvider: Using test account");
        
        try {
          // Sign in with the test account credentials
          const { data, error } = await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password: password
          });
          
          if (error) {
            // If login fails, the user might not exist yet - try creating it
            if (error.message.includes('Invalid login credentials')) {
              console.log("Test account doesn't exist yet, creating...");
              
              const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email: normalizedEmail,
                password: password
              });
              
              if (signUpError) {
                console.error("Failed to create test account:", signUpError);
                toast.error("Failed to set up test account");
                return;
              }
              
              // Now try to sign in again
              const { data: secondTry, error: secondError } = await supabase.auth.signInWithPassword({
                email: normalizedEmail,
                password: password
              });
              
              if (secondError) {
                console.error("Test login failed after creation:", secondError);
                toast.error("Authentication failed. Please try again.");
                return;
              }
              
              // Use the data from the successful sign-in
              data = secondTry;
            } else {
              console.error("Test login failed:", error);
              toast.error(error.message || "Authentication failed");
              return;
            }
          }
          
          // Create or update the profile if needed
          if (data?.user) {
            const { error: profileError } = await supabase
              .from('profiles')
              .upsert({
                id: data.user.id,
                name: 'Admin User',
                role: 'admin',
                updated_at: new Date()
              });
              
            if (profileError) {
              console.error("Error updating admin profile:", profileError);
            }
            
            setUser({
              id: data.user.id,
              email: 'admin@example.com',
              role: 'admin',
              name: 'Admin User'
            });
            
            toast.success('Successfully logged in as admin');
            navigate('/master');
          }
        } catch (error) {
          console.error("Test account setup failed:", error);
          toast.error("Failed to set up test account");
        }
      } else {
        // Regular authentication flow
        const { data, error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        if (error) {
          console.error('Login error:', error);
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password. Please try again.');
          } else {
            toast.error(error.message || 'Authentication failed');
          }
          return;
        }

        if (data?.user) {
          try {
            // Fetch profile data
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .maybeSingle();

            if (profileError) {
              console.error("Profile fetch error:", profileError);
              toast.error('Error loading user profile. Some features may be limited.');
            }

            setUser({
              id: data.user.id,
              email: data.user.email || '',
              role: profileData?.role || 'user',
              name: profileData?.name,
            });

            console.log("AuthProvider: Login successful for:", data.user.email);
            toast.success('Successfully logged in');
            navigate('/master');
          } catch (profileError) {
            console.error("Error fetching profile after login:", profileError);
            // Still set the user even if profile fetch fails
            setUser({
              id: data.user.id,
              email: data.user.email || '',
              role: 'user', // Default role if profile fetch fails
              name: undefined,
            });
            
            toast.success('Logged in successfully');
            navigate('/master');
          }
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      console.log("AuthProvider: Signing out");
      await supabase.auth.signOut();
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error.message || 'Error signing out');
    } finally {
      setLoading(false);
    }
  };

  // Alias for signOut to maintain compatibility
  const logout = signOut;

  const updateUser = async (data: Partial<User>) => {
    if (!user) {
      toast.error('No user logged in');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) {
        console.error('Profile update error:', error);
        throw error;
      }

      setUser({ ...user, ...data });
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Update profile error:', error);
      toast.error(error.message || 'Error updating profile');
    }
  };

  const contextValue = {
    user, 
    loading, 
    isAuthenticated: !!user,
    signIn, 
    signOut,
    logout, 
    updateUser,
    hasPermission
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
