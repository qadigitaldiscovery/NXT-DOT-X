
// Re-export all RBAC-related functionality
export { filterSidebarItems, generateAdminSidebarItems, getAdminSidebarItems } from './sidebarUtils';
export { hasRouteAccess, extractModuleSlug } from './routeUtils';
export { getNavItemsByPermission, generateNavItems } from './navUtils';
