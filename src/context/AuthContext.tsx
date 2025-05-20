import React, { createContext, useContext, useState, useEffect } from 'react';
// Another no-op change to force re-read

type User = {
  id: string;
  email: string;
  role?: string;
  permissions?: string[];
  name?: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock authentication check
    const checkAuth = () => {
      const mockUser = {
        id: "123",
        email: "admin@example.com",
        role: "admin",
        permissions: ["admin/*"],
      };
      
      setUser(mockUser);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    // Mock implementation
    setUser({
      id: "123",
      email: email,
      role: "admin",
      permissions: ["admin/*"],
    });
  };

  const signOut = async () => {
    // Mock implementation
    setUser(null);
  };

  if (isLoading) {
    return <div aria-label="Loading authentication">Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isAuthenticated: !!user,
        hasPermission: (permission: string) => {
          return user?.permissions?.includes(permission) || false;
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
