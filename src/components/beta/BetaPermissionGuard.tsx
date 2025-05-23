
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';

interface BetaPermissionGuardProps {
  betaModule: 'beta1' | 'beta2';
  children: React.ReactNode;
  fallbackPath?: string;
}

/**
 * Permission guard component that specifically checks for Beta module access
 * It restricts access to Beta features based on user permissions
 */
const BetaPermissionGuard: React.FC<BetaPermissionGuardProps> = ({ 
  betaModule, 
  children, 
  fallbackPath = '/unauthorized'
}) => {
  const { isAuthenticated, hasPermission, user } = useAuth();
  
  // Log access check for debugging
  console.log(`Beta permission check - Auth: ${isAuthenticated}, Module: ${betaModule}`);
  
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to landing");
    return <Navigate to="/landing" replace />;
  }

  // Determine the required permission based on beta module
  const requiredPermission = betaModule === 'beta1' 
    ? 'modules.data' 
    : 'modules.loyalty';
  
  // Admin users bypass all permission checks
  if (user?.role === 'admin') {
    return <>{children}</>;
  }
  
  // For others, check specific module permission
  if (!hasPermission(requiredPermission)) {
    console.log(`Missing permission for beta module: ${requiredPermission}`);
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

export default BetaPermissionGuard;
