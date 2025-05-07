
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface PermissionGuardProps {
  requiredPermission?: string;
  children: React.ReactNode;
  fallbackPath?: string;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({ 
  requiredPermission, 
  children, 
  fallbackPath = '/landing'
}) => {
  const { isAuthenticated, hasPermission } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PermissionGuard;
