// Re-export all RBAC-related functionality
export { filterNavItemsByPermission, getNavigationForUserRole, FULL_NAVIGATION, type NavItem } from './sidebarUtils';
export { hasRouteAccess, extractModuleSlug } from './routeUtils';
export { getNavItemsByPermission, generateNavItems } from './navUtils';
