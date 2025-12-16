import React from 'react';

export interface PermissionGuardProps {
  requiredPermissions?: string[];
  requiredRole?: string;
  moduleSlug?: string;
  children: React.ReactNode;
  requireAll?: boolean;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({ children }) => {
  // Security disabled - always allow access
  return <>{children}</>;
};

export default PermissionGuard;
