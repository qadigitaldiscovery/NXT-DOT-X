
import { useModuleAccess } from "@/hooks/useModuleAccess";
import { NavCategory, NavItem } from "@/components/layout/sidebar/types";

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
  items: SidebarItemConfig[],
  userRoles: string[] = [],
  userPermissions: string[] = []
): SidebarItemConfig[] => {
  return items.filter(item => {
    // Check if there are required roles or permissions
    if (
      (!item.requiredRoles || item.requiredRoles.length === 0) &&
      (!item.requiredPermissions || item.requiredPermissions.length === 0)
    ) {
      return true;
    }

    // Check if user has required roles
    if (item.requiredRoles && item.requiredRoles.length > 0) {
      if (!item.requiredRoles.some(role => userRoles.includes(role))) {
        return false;
      }
    }

    // Check if user has required permissions
    if (item.requiredPermissions && item.requiredPermissions.length > 0) {
      if (!item.requiredPermissions.some(permission => userPermissions.includes(permission))) {
        return false;
      }
    }

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
  
  // Check if module is enabled - we'll implement a simple placeholder since isModuleEnabled is missing
  if (moduleSlug && !isModuleEnabled(moduleSlug, userRoles)) {
    return false;
  }

  // Add specific route permissions logic here
  // For now, returning true for all routes as default
  return true;
};

/**
 * Helper function to check if a module is enabled
 * This replaces the missing isModuleEnabled function
 */
export const isModuleEnabled = (moduleSlug: string, userRoles: string[]): boolean => {
  // Default implementation - admins have access to all modules
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
): SidebarGroupConfig[] => {
  // Define admin sidebar structure
  const adminSidebarGroups: SidebarGroupConfig[] = [
    {
      title: 'Administration',
      items: [
        {
          title: 'User Management',
          path: '/admin/users',
          icon: 'Users',
          requiredRoles: ['admin'],
          requiredPermissions: ['manage_users']
        },
        {
          title: 'Module Access',
          path: '/admin/module-access',
          icon: 'Shield',
          requiredRoles: ['admin'],
          requiredPermissions: ['manage_access']
        },
        {
          title: 'Database Admin',
          path: '/admin/database',
          icon: 'Database',
          requiredRoles: ['admin'],
          requiredPermissions: ['manage_database']
        },
        {
          title: 'Documentation',
          path: '/admin/documentation',
          icon: 'FileText',
          requiredRoles: ['admin', 'manager'],
          requiredPermissions: ['view_documentation']
        }
      ]
    }
  ];

  // Filter each group's items based on user roles and permissions
  const filteredGroups = adminSidebarGroups.map(group => {
    return {
      ...group,
      items: filterSidebarItems(group.items, userRoles, userPermissions)
    };
  });

  // Remove empty groups
  return filteredGroups.filter(group => group.items.length > 0);
};

// Add an alias for generateAdminSidebarItems to match the import in sidebar/index.tsx
export const getAdminSidebarItems = generateAdminSidebarItems;
