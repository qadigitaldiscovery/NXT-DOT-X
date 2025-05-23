
import React, { createContext, useState, useEffect } from 'react';
import { AuthContextType, Session, User } from './types';

// Create the context with undefined as initial value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock admin user with all permissions - no security restrictions
const mockAdminUser: User = {
  id: 'admin-123',
  email: 'admin@admin.com',
  username: 'Admin',
  role: 'admin',
  permissions: ['*'], // All permissions
  created_at: new Date().toISOString(),
  provider: 'mock',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user] = useState(mockAdminUser);
  const [session] = useState<Session>({ 
    user: mockAdminUser, 
    access_token: 'mock-token',
    refresh_token: 'mock-refresh',
    expires_in: 3600,
    token_type: 'bearer',
    expires_at: Date.now() + 3600000
  });
  const [loading] = useState(false);

  // Mock login function - always succeeds
  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('Mock login for:', email);
    return true;
  };

  // Mock logout function
  const logout = async () => {
    console.log('Mock logout');
  };

  // Always return true for permissions - no restrictions
  const hasPermission = (permission: string): boolean => {
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: true,
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
