import { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  created: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

interface Permission {
  id: string;
  name: string;
  category: string;
}

interface UserManagementContextType {
  users: User[];
  setUsers: (users: User[]) => void;
  roles: Role[];
  setRoles: (roles: Role[]) => void;
  permissions: Permission[];
  addUser: (user: User) => void;
  addRole: (role: Role) => void;
  updateUser: (id: string, userData: Partial<User>) => void;
  updateRole: (id: string, roleData: Partial<Role>) => void;
  deleteUser: (id: string) => void;
  deleteRole: (id: string) => void;
}

const initialUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    created: '2023-01-10'
  },
  {
    id: '2',
    username: 'manager',
    email: 'manager@example.com',
    role: 'manager',
    status: 'active',
    created: '2023-02-15'
  }
];

const initialRoles: Role[] = [
  {
    id: '1',
    name: 'admin',
    description: 'Full access to all system functions',
    permissions: ['users.view', 'users.create', 'users.edit', 'users.delete']
  },
  {
    id: '2',
    name: 'manager',
    description: 'Access to manage specific modules',
    permissions: ['users.view', 'modules.data']
  }
];

const initialPermissions: Permission[] = [
  { id: 'users.view', name: 'View Users', category: 'Users' },
  { id: 'users.create', name: 'Create Users', category: 'Users' },
  { id: 'users.edit', name: 'Edit Users', category: 'Users' },
  { id: 'users.delete', name: 'Delete Users', category: 'Users' },
  { id: 'modules.data', name: 'Access Data Module', category: 'Modules' }
];

const UserManagementContext = createContext<UserManagementContextType | undefined>(undefined);

export function UserManagementProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [permissions] = useState<Permission[]>(initialPermissions);

  const addUser = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  const addRole = (role: Role) => {
    setRoles(prev => [...prev, role]);
  };

  const updateUser = (id: string, userData: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...userData } : user
    ));
  };

  const updateRole = (id: string, roleData: Partial<Role>) => {
    setRoles(prev => prev.map(role => 
      role.id === id ? { ...role, ...roleData } : role
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const deleteRole = (id: string) => {
    setRoles(prev => prev.filter(role => role.id !== id));
  };

  const value: UserManagementContextType = {
    users,
    setUsers,
    roles,
    setRoles,
    permissions,
    addUser,
    addRole,
    updateUser,
    updateRole,
    deleteUser,
    deleteRole
  };

  return (
    <UserManagementContext.Provider value={value}>
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

export type { User, Role, Permission };
