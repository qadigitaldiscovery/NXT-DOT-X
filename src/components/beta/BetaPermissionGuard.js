import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useModules } from '../../context/ModulesContext';
const BetaPermissionGuard = ({ featureId, children, fallbackPath = '/dashboard', fallbackComponent }) => {
    const { user, isAuthenticated } = useAuth();
    const { isFeatureEnabled } = useModules();
    // Debug logging
    console.log(`Beta permission check - Feature: ${featureId}, User: ${user?.id}`);
    if (!isAuthenticated) {
        console.log('User not authenticated, redirecting to landing');
        return _jsx(Navigate, { to: "/landing", replace: true });
    }
    // Admin users always have access to beta features
    if (user?.role === 'admin') {
        return _jsx(_Fragment, { children: children });
    }
    // Check if the feature exists and is enabled
    const hasFeatureAccess = isFeatureEnabled ? isFeatureEnabled(featureId) : false;
    if (!hasFeatureAccess) {
        console.log(`No access to beta feature: ${featureId}`);
        // If a fallback component is provided, show that instead of redirecting
        if (fallbackComponent) {
            return _jsx(_Fragment, { children: fallbackComponent });
        }
        // Otherwise, redirect to the fallback path
        return _jsx(Navigate, { to: fallbackPath, replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default BetaPermissionGuard;
