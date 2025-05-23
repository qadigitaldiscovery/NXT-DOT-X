
import React from 'react';

interface PermissionGuardProps {
  requiredPermissions?: string[];
  requiredPermission?: string;
  children: React.ReactNode;
  requireAll?: boolean;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({ children }) => {
  // Security disabled - always allow access
  return <>{children}</>;
};

export default PermissionGuard;
