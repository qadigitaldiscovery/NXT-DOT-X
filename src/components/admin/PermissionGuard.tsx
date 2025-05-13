
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useModuleAccess } from '@/hooks/useModuleAccess';
import { AlertTriangle } from 'lucide-react';

interface PermissionGuardProps {
  requiredRole?: string;
  moduleSlug?: string;
  submenuSlug?: string;
  children: React.ReactNode;
  fallbackPath?: string;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  requiredRole = 'admin',
  moduleSlug,
  submenuSlug,
  children,
  fallbackPath = '/unauthorized'
}) => {
  const { moduleAccess, loading } = useModuleAccess();
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="w-8 h-8 border-t-2 border-b-2 border-gray-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500">Checking permissions...</p>
      </div>
    );
  }
  
  // Check if user has the required role
  const hasRequiredRole = moduleAccess?.roles.includes(requiredRole);
  
  // Check if user has access to the specific module/submenu
  const hasModuleAccess = moduleSlug 
    ? moduleAccess?.hasAccess(moduleSlug, submenuSlug)
    : true;
  
  if (!moduleAccess || !hasRequiredRole || !hasModuleAccess) {
    return <Navigate to={fallbackPath} replace />;
  }
  
  return <>{children}</>;
};

export default PermissionGuard;
