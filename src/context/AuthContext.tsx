
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Mock users for demonstration
  const mockUsers = [
    {
      id: '1',
      username: 'admin',
      email: 'admin@example.com',
      password: 'pass1',
      role: 'admin',
      permissions: ['users.view', 'users.create', 'users.edit', 'users.delete', 'settings.access', 'modules.all', 'modules.rag']
    },
    {
      id: '2',
      username: 'manager',
      email: 'manager@example.com',
      password: 'manager1',
      role: 'manager',
      permissions: ['users.view', 'settings.access', 'modules.data', 'modules.loyalty']
    },
    {
      id: '3',
      username: 'user',
      email: 'user@example.com',
      password: 'user1',
      role: 'user',
      permissions: ['modules.data']
    }
  ];

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    
    if (storedUser && isAuth) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (usernameOrEmail: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    const foundUser = mockUsers.find(
      u => (u.email === usernameOrEmail || u.username === usernameOrEmail) && u.password === password
    );
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      toast.success(`Welcome back, ${foundUser.username}!`);
      return true;
    }
    
    toast.error('Invalid credentials');
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    toast.info('You have been logged out');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // Admin always has all permissions
    if (user.role === 'admin') return true;
    
    return user.permissions.includes(permission) || user.permissions.includes('modules.all');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      login, 
      logout,
      hasPermission
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
