
import React from 'react';
import { useUserPermissions } from '@/hooks/useUserPermissions';
import { AlertOctagon } from 'lucide-react';
import { useAuth } from '@/context/auth';

interface PermissionGuardProps {
  requiredPermission: string | string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  requiredPermission,
  children,
  fallback
}) => {
  const { hasPermission, hasAnyPermission } = useUserPermissions();
  const { user } = useAuth();
  
  // Admin users bypass all permission checks
  if (user?.role === 'admin') {
    return <>{children}</>;
  }
  
  // Check permissions
  const hasAccess = Array.isArray(requiredPermission)
    ? hasAnyPermission(requiredPermission)
    : hasPermission(requiredPermission);
  
  // Default fallback component
  const defaultFallback = (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <AlertOctagon className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="font-medium text-lg mb-1">Access Restricted</h3>
      <p className="text-muted-foreground">
        You don't have permission to access this feature.
      </p>
    </div>
  );
  
  // Render children if they have access, otherwise render fallback
  return hasAccess ? <>{children}</> : <>{fallback || defaultFallback}</>;
};

export default PermissionGuard;
