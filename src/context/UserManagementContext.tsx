import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the types for our data
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

// Sample data
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
  },
  {
    id: '3',
    username: 'user',
    email: 'user@example.com',
    role: 'user',
    status: 'active',
    created: '2023-03-20'
  }
];

const initialRoles: Role[] = [
  {
    id: '1',
    name: 'admin',
    description: 'Full access to all system functions',
    permissions: ['users.view', 'users.create', 'users.edit', 'users.delete', 'settings.access', 'modules.all']
  },
  {
    id: '2',
    name: 'manager',
    description: 'Access to manage specific modules',
    permissions: ['users.view', 'settings.access', 'modules.data', 'modules.loyalty']
  },
  {
    id: '3',
    name: 'user',
    description: 'Limited access to basic functions',
    permissions: ['modules.data']
  }
];

const initialPermissions: Permission[] = [
  { id: 'users.view', name: 'View Users', category: 'Users' },
  { id: 'users.create', name: 'Create Users', category: 'Users' },
  { id: 'users.edit', name: 'Edit Users', category: 'Users' },
  { id: 'users.delete', name: 'Delete Users', category: 'Users' },
  { id: 'settings.access', name: 'Access Settings', category: 'Settings' },
  { id: 'modules.all', name: 'Access All Modules', category: 'Modules' },
  { id: 'modules.data', name: 'Access Data Module', category: 'Modules' },
  { id: 'modules.loyalty', name: 'Access Loyalty Module', category: 'Modules' }
];

// Define the context type
interface UserManagementContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  roles: Role[];
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
  permissions: Permission[];
  addUser: (user: User) => void;
  addRole: (role: Role) => void;
  updateUser: (id: string, userData: Partial<User>) => void;
  updateRole: (id: string, roleData: Partial<Role>) => void;
  deleteUser: (id: string) => void;
  deleteRole: (id: string) => void;
}

// Create the context
const UserManagementContext = createContext<UserManagementContextType>(undefined as any);

// Create the provider component
export const UserManagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [permissions] = useState<Permission[]>(initialPermissions);
    const [roles, setRoles] = useState<Role[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    
    // Fetch users and roles from an API or state management
    // Ensure proper sanitization and validation where necessary
// Ensuring proper sanitization and validation where necessary
const deleteUser = (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    console.log('User deleted:', id);
};

const updateRole = (id: string, roleData: Partial<Role>) => {
    setRoles((prevRoles) =>
        prevRoles.map((role) =>
            role.id === id ? { ...role, ...roleData } : role
        )
    );
    console.log('Role updated:', { id, roleData });
};
  const deleteUser = (id: string) => {
  setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [permissions] = useState<Permission[]>(initialPermissions);

const addUser = (user: User) => {
       setUsers((prevUsers) => [...prevUsers, user]);
      setUsers((prevUsers) => [...prevUsers, user]);
      // Logging the added user for debugging
      console.log('User added:', user);
  };

  const addRole = (role: Role) => {
      setRoles((prevRoles) => [...prevRoles, role]);
      // Logging the added role for debugging
      console.log('Role added:', role);
  };

  const updateUser = (id: string, userData: Partial<User>) => {
      setUsers((prevUsers) =>
          prevUsers.map((user) =>
              user.id === id ? { ...user, ...userData } : user
          )
      );
      // Logging the updated user for debugging
      console.log('User updated:', { id, userData });
      };
    };
  };

        setRoles((prevRoles) =>
            prevRoles.map((role) =>
                role.id === id ? { ...role, ...roleData } : role
            )
        );
          prevRoles.map((role) =>
              role.id === id ? { ...role, ...roleData } : role
          )
      });
      // Logging the updated role for debugging
      console.log('Role updated:', { id, roleData });
      };
    });
  };

  const deleteUser = (id: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const deleteRole = (id: string) => {
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
      // Logging the deleted role for debugging
      console.log('Role deleted:', id);
  };

  return (
    <UserManagementContext.Provider 
      value={{ 
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
      }}
    >
      {children}
    </UserManagementContext.Provider>
  };
};

// Create a hook to use the context
export const useUserManagement = () => {
  const context = useContext(UserManagementContext);
  if (context === undefined) {
    throw new Error('useUserManagement must be used within a UserManagementProvider');
  }
  return context;
};

// Export the types for use in other files
export type { User, Role, Permission };
