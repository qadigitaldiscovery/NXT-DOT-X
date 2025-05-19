
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

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

interface ProfileData {
  id: string;
  name: string | null;
  role: string | null;
  users: {
    email: string;
    created_at: string;
  } | null;
}

interface UserManagementContextType {
  users: User[];
  setUsers: (users: User[]) => void;
  roles: Role[];
  setRoles: (roles: Role[]) => void;
  permissions: Permission[];
  addUser: (user: User) => Promise<void>;
  addRole: (role: Role) => Promise<void>;
  updateUser: (id: string, userData: Partial<User>) => Promise<void>;
  updateRole: (id: string, roleData: Partial<Role>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  deleteRole: (id: string) => Promise<void>;
}

const UserManagementContext = createContext<UserManagementContextType | undefined>(undefined);

export function UserManagementProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsersWithRoles();
  }, []);

  async function fetchUsersWithRoles() {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          name,
          role,
          users (
            email,
            created_at
          )
        `);

      if (error) {
        console.error('Error fetching users:', error);
        setError(`Failed to fetch users: ${error.message}`);
        toast.error(`Error loading users: ${error.message}`);
        return;
      }

      if (!data || !Array.isArray(data)) {
        console.log('No user data returned or invalid data format');
        setUsers([]);
        setRoles([]);
        return;
      }

      // Safe type checking and mapping
      const mappedUsers: User[] = data.map(profile => {
        // Ensure we have valid profile data
        if (!profile || typeof profile !== 'object') {
          return {
            id: 'unknown',
            username: 'Unknown',
            email: 'No email',
            role: 'user',
            status: 'active',
            created: new Date().toISOString()
          };
        }
        
        const typedProfile = profile as ProfileData;
        
        return {
          id: typedProfile.id || 'unknown',
          username: typedProfile.name || 'Unknown',
          email: typedProfile.users?.email || 'No email',
          role: typedProfile.role || 'user',
          status: 'active', // Default status
          created: typedProfile.users?.created_at || new Date().toISOString()
        };
      });
      
      setUsers(mappedUsers);

      // Extract unique roles with proper type checking
      const roleNames = new Set<string>();
      data.forEach(profile => {
        if (profile && typeof profile === 'object' && 'role' in profile && typeof profile.role === 'string') {
          roleNames.add(profile.role);
        }
      });
      
      // Create role objects from unique names
      const roleObjects: Role[] = Array.from(roleNames).map(roleName => ({
        id: roleName,
        name: roleName,
        description: `${roleName} role`,
        permissions: []
      }));
      
      setRoles(roleObjects);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Failed to fetch user data:', errorMessage);
      setError(`Failed to fetch users: ${errorMessage}`);
      toast.error(`Error loading users: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }

  const addUser = async (user: User) => {
    try {
      // Start with validation
      if (!user.email) {
        toast.error('Email is required for new users');
        return;
      }
      
      const { data, error } = await supabase.from('profiles').insert({
        name: user.username,
        role: user.role,
        id: user.id
      });
      
      if (error) {
        console.error('Error adding user:', error);
        toast.error(`Failed to add user: ${error.message}`);
        return;
      }
      
      // Update local state only if database operation succeeded
      setUsers(prev => [...prev, user]);
      toast.success('User added successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Failed to add user:', errorMessage);
      toast.error(`Error adding user: ${errorMessage}`);
    }
  };

  const addRole = async (role: Role) => {
    try {
      // Validate role data
      if (!role.name) {
        toast.error('Role name is required');
        return;
      }
      
      const { data, error } = await supabase.from('roles').insert(role);
      
      if (error) {
        console.error('Error adding role:', error);
        toast.error(`Failed to add role: ${error.message}`);
        return;
      }
      
      // Update local state only if database operation succeeded
      setRoles(prev => [...prev, role]);
      toast.success('Role added successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Failed to add role:', errorMessage);
      toast.error(`Error adding role: ${errorMessage}`);
    }
  };

  const updateUser = async (id: string, userData: Partial<User>) => {
    try {
      // Map User interface fields to profiles table fields
      const profileData: Record<string, any> = {};
      
      if (userData.username !== undefined) profileData.name = userData.username;
      if (userData.role !== undefined) profileData.role = userData.role;
      
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', id);

      if (error) {
        console.error('Error updating user:', error);
        toast.error(`Failed to update user: ${error.message}`);
        return;
      }

      // Update local state only when database operation succeeds
      setUsers(prev => prev.map(user => (user.id === id ? { ...user, ...userData } : user)));
      toast.success('User updated successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Failed to update user:', errorMessage);
      toast.error(`Error updating user: ${errorMessage}`);
    }
  };

  const updateRole = async (id: string, roleData: Partial<Role>) => {
    try {
      // In a real implementation, this would update the roles table
      // For now, just update the local state
      const { error } = await supabase.from('roles').update(roleData).eq('id', id);
      
      if (error) {
        console.error('Error updating role:', error);
        toast.error(`Failed to update role: ${error.message}`);
        return;
      }

      setRoles(prev => prev.map(role => (role.id === id ? { ...role, ...roleData } : role)));
      toast.success('Role updated successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Failed to update role:', errorMessage);
      toast.error(`Error updating role: ${errorMessage}`);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      // Confirmation check could be added here
      const { error } = await supabase.from('profiles').delete().eq('id', id);
      
      if (error) {
        console.error('Error deleting user:', error);
        toast.error(`Failed to delete user: ${error.message}`);
        return;
      }

      // Only update UI after successful database operation
      setUsers(prev => prev.filter(user => user.id !== id));
      toast.success('User deleted successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Failed to delete user:', errorMessage);
      toast.error(`Error deleting user: ${errorMessage}`);
    }
  };

  const deleteRole = async (id: string) => {
    try {
      // Check if role is in use before deletion
      const usersWithRole = users.filter(user => user.role === id);
      
      if (usersWithRole.length > 0) {
        toast.error(`Cannot delete role: ${usersWithRole.length} users are assigned this role`);
        return;
      }
      
      const { error } = await supabase.from('roles').delete().eq('id', id);
      
      if (error) {
        console.error('Error deleting role:', error);
        toast.error(`Failed to delete role: ${error.message}`);
        return;
      }

      setRoles(prev => prev.filter(role => role.id !== id));
      toast.success('Role deleted successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Failed to delete role:', errorMessage);
      toast.error(`Error deleting role: ${errorMessage}`);
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
      {loading ? (
        <div>Loading user management data...</div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        children
      )}
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
