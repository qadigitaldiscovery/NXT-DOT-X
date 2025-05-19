
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PermissionGuardProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredRole?: string;
  moduleSlug?: string;
  userPermissions?: string[];
}

export function PermissionGuard({
  children,
  requiredPermission,
  requiredRole,
  moduleSlug,
  userPermissions = [],
}: PermissionGuardProps) {
  const location = useLocation();

  // Check if user has required permission
  if (requiredPermission && !userPermissions.includes(requiredPermission)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // Check if user has required role (this is just a placeholder)
  // In a real implementation, you would check against user roles from context
  if (requiredRole) {
    const userRoles = ['admin']; // Replace with actual user roles from context
    if (!userRoles.includes(requiredRole)) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }

  // Check if user has access to module (this is just a placeholder)
  // In a real implementation, you would check against user module access from context
  if (moduleSlug) {
    const accessibleModules = ['admin', 'dashboard']; // Replace with actual modules
    if (!accessibleModules.includes(moduleSlug)) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }

  // If all checks pass, render children
  return <>{children}</>;
}

// Add default export for compatibility with existing imports
export default PermissionGuard;
