import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Permission, hasPermission, hasAnyPermission, hasAllPermissions } from './permissions';

// Mock user context - replace with actual user context in your app
const useCurrentUser = () => {
  // This should be replaced with your actual user auth logic
  return {
    isAuthenticated: true,
    role: 'ADMIN', // Default for testing - should come from auth system
    loading: false
  };
};

interface RouteGuardProps {
  children: React.ReactNode;
  requiredPermissions?: Permission | Permission[];
  requireAll?: boolean; // If true, user must have ALL permissions, otherwise ANY is sufficient
  redirectTo?: string; // Where to redirect if unauthorized
}

/**
 * Route Guard component to protect routes based on user permissions
 * Wrap any route component with this to enforce permission checks
 */
export const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  requiredPermissions = [],
  requireAll = false,
  redirectTo = '/unauthorized'
}) => {
  const { isAuthenticated, role, loading } = useCurrentUser();
  const location = useLocation();

  // Show loading state if user context is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Convert single permission to array for consistent processing
  const permissionsArray = Array.isArray(requiredPermissions) 
    ? requiredPermissions 
    : [requiredPermissions];

  // If no permissions required, allow access
  if (permissionsArray.length === 0) {
    return <>{children}</>;
  }

  // Check permissions based on requireAll flag
  const hasAccess = requireAll
    ? hasAllPermissions(role, permissionsArray)
    : hasAnyPermission(role, permissionsArray);

  if (!hasAccess) {
    return <Navigate to={redirectTo} replace />;
  }

  // User has required permissions, render the protected route
  return <>{children}</>;
};

/**
 * Higher-order component (HOC) version of RouteGuard
 * Use this to wrap route components
 */
export const withRouteGuard = (
  Component: React.ComponentType<any>,
  guardProps: Omit<RouteGuardProps, 'children'>
) => {
  return (props: any) => (
    <RouteGuard {...guardProps}>
      <Component {...props} />
    </RouteGuard>
  );
};

export default RouteGuard;