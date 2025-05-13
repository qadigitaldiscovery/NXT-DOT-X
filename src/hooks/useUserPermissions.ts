
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export type Permission = {
  id: string;
  name: string;
  description: string;
  category: string;
};

export function useUserPermissions() {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPermissions = async () => {
      try {
        setLoading(true);
        
        // In a real-world scenario, we would fetch the permissions from the server
        // based on the user's role and assigned permissions
        if (user) {
          // For now, we'll use the permissions from the mock user
          setPermissions(user.permissions || []);
        } else {
          setPermissions([]);
        }
      } catch (err) {
        console.error('Error loading permissions:', err);
        setError(err instanceof Error ? err : new Error('Unknown error loading permissions'));
      } finally {
        setLoading(false);
      }
    };

    loadPermissions();
  }, [user]);

  // Check if the user has a specific permission
  const hasPermission = (permissionId: string): boolean => {
    return permissions.includes(permissionId) || permissions.includes('modules.all');
  };

  // Check if the user has any of the given permissions
  const hasAnyPermission = (permissionIds: string[]): boolean => {
    return permissionIds.some(p => hasPermission(p)) || permissions.includes('modules.all');
  };

  // Get all permissions for a specific category
  const getPermissionsByCategory = (category: string): string[] => {
    // In a real implementation, this would filter from a complete list of permissions
    return permissions.filter(p => p.startsWith(`${category}.`));
  };

  return {
    permissions,
    hasPermission,
    hasAnyPermission,
    getPermissionsByCategory,
    loading,
    error
  };
}
