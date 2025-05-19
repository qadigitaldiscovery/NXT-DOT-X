import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

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

const UserManagementContext = createContext<UserManagementContextType | undefined>(undefined);

export function UserManagementProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data || []);
      }
    }

    async function fetchRoles() {
      const { data, error } = await supabase.from('roles').select('*');
      if (error) {
        console.error('Error fetching roles:', error);
      } else {
        setRoles(data || []);
      }
    }

    async function fetchPermissions() {
      const { data, error } = await supabase.from('permissions').select('*');
      if (error) {
        console.error('Error fetching permissions:', error);
      } else {
        setPermissions(data || []);
      }
    }

    fetchUsers();
    fetchRoles();
    fetchPermissions();
  }, []);

  const addUser = async (user: User) => {
    const { data, error } = await supabase.from('users').insert(user);
    if (error) {
      console.error('Error adding user:', error);
    } else if (data) {
      setUsers(prev => [...prev, data[0]]);
    }
  };

  const addRole = async (role: Role) => {
    const { data, error } = await supabase.from('roles').insert(role);
    if (error) {
      console.error('Error adding role:', error);
    } else if (data) {
      setRoles(prev => [...prev, data[0]]);
    }
  };

  const updateUser = async (id: string, userData: Partial<User>) => {
    const { data, error } = await supabase.from('users').update(userData).eq('id', id);
    if (error) {
      console.error('Error updating user:', error);
    } else if (data) {
      setUsers(prev => prev.map(user => (user.id === id ? { ...user, ...userData } : user)));
    }
  };

  const updateRole = async (id: string, roleData: Partial<Role>) => {
    const { data, error } = await supabase.from('roles').update(roleData).eq('id', id);
    if (error) {
      console.error('Error updating role:', error);
    } else if (data) {
      setRoles(prev => prev.map(role => (role.id === id ? { ...role, ...roleData } : role)));
    }
  };

  const deleteUser = async (id: string) => {
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) {
      console.error('Error deleting user:', error);
    } else {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  const deleteRole = async (id: string) => {
    const { error } = await supabase.from('roles').delete().eq('id', id);
    if (error) {
      console.error('Error deleting role:', error);
    } else {
      setRoles(prev => prev.filter(role => role.id !== id));
    }
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
    deleteRole,
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
