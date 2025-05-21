import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
export function PermissionGuard({ children, requiredPermission, requiredRole, moduleSlug, userPermissions = [], }) {
    const location = useLocation();
    // Check if user has required permission
    if (requiredPermission && !userPermissions.includes(requiredPermission)) {
        return _jsx(Navigate, { to: "/unauthorized", state: { from: location }, replace: true });
    }
    // Check if user has required role (this is just a placeholder)
    // In a real implementation, you would check against user roles from context
    if (requiredRole) {
        const userRoles = ['admin']; // Replace with actual user roles from context
        if (!userRoles.includes(requiredRole)) {
            return _jsx(Navigate, { to: "/unauthorized", state: { from: location }, replace: true });
        }
    }
    // Check if user has access to module (this is just a placeholder)
    // In a real implementation, you would check against user module access from context
    if (moduleSlug) {
        const accessibleModules = ['admin', 'dashboard']; // Replace with actual modules
        if (!accessibleModules.includes(moduleSlug)) {
            return _jsx(Navigate, { to: "/unauthorized", state: { from: location }, replace: true });
        }
    }
    // If all checks pass, render children
    return _jsx(_Fragment, { children: children });
}
// Add default export for compatibility with existing imports
export default PermissionGuard;
