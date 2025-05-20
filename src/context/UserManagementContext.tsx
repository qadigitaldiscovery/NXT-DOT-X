import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  role: string;
  permissions: string[];
}

interface UserManagementContextType {
  users: User[];
  currentUser: User | null;
  permissions: string[];
  hasPermission: (permission: string) => boolean;
  updateUserPermissions: (userId: string, permissions: string[]) => void;
}

const UserManagementContext = createContext<UserManagementContextType | undefined>(undefined);

export function UserManagementProvider({ children }: { children: React.ReactNode }) {
  // For development, we'll use a mock current user
  const [currentUser] = useState<User>({
    id: '1',
    email: 'admin@example.com',
    role: 'admin',
    permissions: ['suppliers.view', 'suppliers.edit', 'suppliers.create', 'suppliers.delete']
  });

  const [users] = useState<User[]>([
    currentUser,
    // Add more users as needed
  ]);

  const [permissions] = useState<string[]>([
    'suppliers.view',
    'suppliers.edit',
    'suppliers.create',
    'suppliers.delete',
    // Add more permissions as needed
  ]);

  const hasPermission = (permission: string): boolean => {
    return currentUser?.permissions.includes(permission) ?? false;
  };

  const updateUserPermissions = (userId: string, newPermissions: string[]) => {
    // Implementation for updating user permissions
    console.log('Update permissions for user:', userId, newPermissions);
  };

  return (
    <UserManagementContext.Provider 
      value={{ 
        users, 
        currentUser, 
        permissions, 
        hasPermission, 
        updateUserPermissions 
      }}
    >
      {children}
    </UserManagementContext.Provider>
  );
}

export function useUserManagement() {
  const context = useContext(UserManagementContext);
  if (context === undefined) {
    throw new Error('useUserManagement must be used within a UserManagementProvider');
  }
  return context;
}
