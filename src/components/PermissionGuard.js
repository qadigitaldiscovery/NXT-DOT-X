import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const PermissionGuard = ({ requiredRole, moduleSlug, children, fallbackPath = '/landing' }) => {
    const { isAuthenticated, hasPermission, user } = useAuth();
    // Improved logging for debugging
    console.log(`Auth check - Auth: ${isAuthenticated}, Role: ${requiredRole}, Module: ${moduleSlug}`);
    if (!isAuthenticated) {
        console.log("Not authenticated, redirecting to", fallbackPath);
        return _jsx(Navigate, { to: fallbackPath, replace: true });
    }
    // Check role first if required
    if (requiredRole && user?.role !== requiredRole) {
        console.log("Missing required role:", requiredRole);
        return _jsx(Navigate, { to: "/unauthorized", replace: true });
    }
    // Check module access if specified
    if (moduleSlug && !hasPermission(`access:${moduleSlug}`)) {
        console.log("Missing module access:", moduleSlug);
        return _jsx(Navigate, { to: "/unauthorized", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default PermissionGuard;
