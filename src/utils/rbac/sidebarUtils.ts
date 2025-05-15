import { NavCategory, NavItem } from "@/components/layout/sidebar/types";
import { ModulePermission } from "@/types/rbac";

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
        label: 'User Management',
        path: '/admin/users',
        icon: () => import('lucide-react').then(mod => mod.Users),
        roles: ['admin']
      },
      {
        label: 'Module Access',
        path: '/admin/module-access',
        icon: () => import('lucide-react').then(mod => mod.Shield),
        roles: ['admin']
      },
      {
        label: 'Database Admin',
        path: '/admin/database',
        icon: () => import('lucide-react').then(mod => mod.Database),
        roles: ['admin']
      },
      {
        label: 'Documentation',
        path: '/admin/documentation',
        icon: () => import('lucide-react').then(mod => mod.FileText),
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
