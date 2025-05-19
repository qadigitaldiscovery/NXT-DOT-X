import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PermissionGuardProps {
  children: React.ReactNode;
  requiredPermission: string;
  userPermissions: string[];
}

export function PermissionGuard({
  children,
  requiredPermission,
  userPermissions,
}: PermissionGuardProps) {
  const location = useLocation();

  if (!userPermissions.includes(requiredPermission)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
