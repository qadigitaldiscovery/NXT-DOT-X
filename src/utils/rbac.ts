import { useModuleAccess } from "@/hooks/useModuleAccess";
import { NavCategory, NavItem } from "@/components/layout/sidebar/types";
import { Users, Shield, Database, FileText } from 'lucide-react';

// Define the structure for sidebar item configurations
export interface SidebarItemConfig extends NavItem {
  requiredRoles?: string[];
  requiredPermissions?: string[];
}

// Define the structure for sidebar group configurations
export interface SidebarGroupConfig {
  title: string;
  items: SidebarItemConfig[];
}

/**
 * Filters sidebar items based on the user's roles and permissions
 * @param items The sidebar items configuration
 * @param userRoles The user's roles
 * @param userPermissions The user's permissions
 * @returns Filtered sidebar items
 */
export const filterSidebarItems = (
  items: NavCategory[],
  userRoles: string[] = [],
  userPermissions: string[] = []
): NavCategory[] => {
  // If user is admin, return all items
  if (userRoles.includes('admin')) {
    return items;
  }
  
  // Otherwise, filter based on permissions
  return items.filter(item => {
    // For now, just return all items since we're adapting the function
    return true;
  });
};

/**
 * Checks if a user has access to a specific route
 * @param route The route path
 * @param userRoles The user's roles
 * @param userPermissions The user's permissions
 * @returns Boolean indicating if the user has access
 */
export const hasRouteAccess = (
  route: string,
  userRoles: string[] = [],
  userPermissions: string[] = []
): boolean => {
  // Admin role has access to all routes
  if (userRoles.includes('admin')) {
    return true;
  }

  // Extract module slug from route
  const moduleSlug = extractModuleSlug(route);
  
  // Check if module is enabled
  if (moduleSlug && !isModuleEnabled(moduleSlug, userRoles)) {
    return false;
  }

  // Add specific route permissions logic here
  // For now, returning true for all routes as default
  return true;
};

/**
 * Helper function to check if a module is enabled
 */
export const isModuleEnabled = (moduleSlug: string, userRoles: string[]): boolean => {
  // Admin users have access to all modules
  if (userRoles.includes('admin')) {
    return true;
  }
  
  // Add module-specific checks here if needed
  // For now, we'll consider all modules enabled for simplicity
  return true;
};

/**
 * Extracts the module slug from a route path
 * @param route The route path
 * @returns The module slug or null if not found
 */
export const extractModuleSlug = (route: string): string | null => {
  // Remove leading slash and get first segment
  const segments = route.replace(/^\//, '').split('/');
  if (segments.length > 0 && segments[0]) {
    return segments[0];
  }
  return null;
};

/**
 * Generates sidebar items for admin section based on user access
 * @param userRoles The user's roles
 * @param userPermissions The user's permissions
 * @returns An array of sidebar group configurations
 */
export const generateAdminSidebarItems = (
  userRoles: string[] = [],
  userPermissions: string[] = []
): NavCategory[] => {
  // Define admin sidebar structure
  const adminSidebarGroups: NavCategory = {
    name: 'Administration',
    items: [
      {
        title: 'User Management',
        path: '/admin/users',
        icon: Users,
        roles: ['admin']
      },
      {
        title: 'Module Access',
        path: '/admin/module-access',
        icon: Shield,
        roles: ['admin']
      },
      {
        title: 'Database Admin',
        path: '/admin/database',
        icon: Database,
        roles: ['admin']
      },
      {
        title: 'Documentation',
        path: '/admin/documentation',
        icon: FileText,
        roles: ['admin', 'manager']
      }
    ]
  };

  // If user is not admin, return empty array
  if (!userRoles.includes('admin')) {
    return [];
  }

  return [adminSidebarGroups];
};

// Add an alias for generateAdminSidebarItems to match the import in sidebar/index.tsx
export const getAdminSidebarItems = generateAdminSidebarItems;
