
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

  // This is a simplified implementation - in a real scenario,
  // you would check against the actual user permissions from context or props
  if (requiredPermission && !userPermissions.includes(requiredPermission)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // For now, we're just returning the children
  // In a real app, you would check if the user has the required role
  return <>{children}</>;
}

// Add default export for compatibility with existing imports
export default PermissionGuard;
