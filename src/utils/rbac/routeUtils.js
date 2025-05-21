import { isModuleEnabled } from "@/hooks/useModuleAccess";
/**
 * Extracts the module slug from a route path
 * @param route The route path
 * @returns The module slug or null if not found
 */
export const extractModuleSlug = (route) => {
    // Remove leading slash and get first segment
    const segments = route.replace(/^\//, '').split('/');
    if (segments.length > 0 && segments[0]) {
        return segments[0];
    }
    return null;
};
/**
 * Checks if a user has access to a specific route
 * @param route The route path
 * @param userRoles The user's roles
 * @param userPermissions The user's permissions
 * @returns Boolean indicating if the user has access
 */
export const hasRouteAccess = (route, userRoles = [], userPermissions = []) => {
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
