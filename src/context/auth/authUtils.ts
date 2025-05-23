
import { User } from '@supabase/supabase-js';
import { AuthUser, ProfileData } from './types';

/**
 * Creates an AuthUser object from Supabase User and profile data
 */
export const createAuthUser = (
  user: User | null, 
  profileData: ProfileData | null
): AuthUser | null => {
  if (!user) return null;
  
  // Create basic auth user with defaults
  const authUser: AuthUser = {
    id: user.id,
    email: user.email || null,
    username: profileData?.username || user.email?.split('@')[0] || 'User',
    role: profileData?.role || 'user',
    permissions: profileData?.permissions || [],
    created_at: user.created_at,
    provider: user.app_metadata?.provider || 'email'
  };
  
  return authUser;
};

/**
 * Checks if a user has a specific permission
 */
export const checkPermission = (user: AuthUser | null, permission: string): boolean => {
  if (!user) return false;
  
  // Admin always has all permissions
  if (user.role === 'admin') return true;
  
  // Check for exact permission match
  if (user.permissions?.includes(permission)) return true;
  
  // Check for wildcard permissions (e.g., 'users.*' includes 'users.view')
  const permissionParts = permission.split('.');
  if (permissionParts.length > 1) {
    const wildcardPermission = `${permissionParts[0]}.*`;
    if (user.permissions?.includes(wildcardPermission)) return true;
  }
  
  // Check for 'modules.all' which grants access to all modules
  if (permission.startsWith('module.') && user.permissions?.includes('modules.all')) {
    return true;
  }
  
  return false;
};
