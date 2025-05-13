
import { NavCategory, NavItem } from "@/components/layout/sidebar/types";
import { UserRoleInfo } from "@/hooks/useModuleAccess";

/**
 * Filter sidebar items based on user's access permissions
 */
export function filterSidebarItems(
  categories: NavCategory[],
  userAccess: UserRoleInfo | null
): NavCategory[] {
  if (!userAccess) return [];

  return categories
    .map(category => {
      // Filter items in each category that the user has access to
      const filteredItems = category.items.filter(item => {
        // Get the module slug from the path
        const moduleSlug = getModuleSlugFromPath(item.path);
        return userAccess.hasAccess(moduleSlug);
      });

      // If no items remain after filtering, don't include the category
      if (filteredItems.length === 0) return null;

      return {
        ...category,
        items: filteredItems
      };
    })
    .filter((category): category is NavCategory => category !== null);
}

/**
 * Check if a user has access to a specific route
 */
export function hasRouteAccess(
  path: string,
  userAccess: UserRoleInfo | null
): boolean {
  if (!userAccess) return false;
  
  // Admin users have access to all routes
  if (userAccess.isAdmin) return true;
  
  const moduleSlug = getModuleSlugFromPath(path);
  return userAccess.hasAccess(moduleSlug);
}

/**
 * Extract module slug from a path
 * Example: /admin/users -> admin/users
 */
function getModuleSlugFromPath(path: string): string {
  // Remove leading slash and any trailing slashes
  const cleanPath = path.replace(/^\/|\/$/g, '');
  
  // For admin routes, include 'admin/' prefix
  if (cleanPath.startsWith('admin/')) {
    return cleanPath;
  }
  
  // For top-level routes, just take the first segment
  const segments = cleanPath.split('/');
  return segments[0] || 'home';
}

/**
 * Generate admin-only sidebar items
 */
export function getAdminSidebarItems(
  userAccess: UserRoleInfo | null
): NavCategory | null {
  if (!userAccess || !userAccess.isAdmin) return null;
  
  // List of admin-only modules
  const adminModules = userAccess.modules
    .filter(m => m.category === 'admin' && m.is_enabled);
  
  // If no admin modules, return null
  if (adminModules.length === 0) return null;
  
  // Create NavItems from admin modules
  const adminItems: NavItem[] = [
    {
      label: "Module Access",
      icon: () => <span className="h-5 w-5 flex items-center justify-center">🔑</span>,
      path: "/admin/module-access"
    }
  ];
  
  // Add other admin modules
  adminModules.forEach(module => {
    const path = `/admin/${module.module_slug}`;
    const label = module.module_slug.charAt(0).toUpperCase() + 
                  module.module_slug.slice(1).replace(/-/g, ' ');
    
    adminItems.push({
      label,
      icon: () => <span className="h-5 w-5 flex items-center justify-center">⚙️</span>,
      path
    });
  });
  
  return {
    name: "Administration",
    items: adminItems
  };
}
