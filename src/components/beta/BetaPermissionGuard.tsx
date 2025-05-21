
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useModules } from '../../context/ModulesContext';
// Removed unused BetaAccessStatus import

interface BetaPermissionGuardProps {
  featureId: string;
  children: ReactNode;
  fallbackPath?: string;
  fallbackComponent?: ReactNode;
}

const BetaPermissionGuard = ({
  featureId,
  children,
  fallbackPath = '/dashboard',
  fallbackComponent
}: BetaPermissionGuardProps) => {
  const { user, isAuthenticated } = useAuth();
  const { isFeatureEnabled } = useModules(); // Removed unused modules variable

  // Debug logging
  console.log(`Beta permission check - Feature: ${featureId}, User: ${user?.id}`);

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to landing');
    return <Navigate to="/landing" replace />;
  }

  // Admin users always have access to beta features
  if (user?.role === 'admin') {
    return <>{children}</>;
  }

  // Check if the feature exists and is enabled
  const hasFeatureAccess = isFeatureEnabled ? isFeatureEnabled(featureId) : false;
  
  if (!hasFeatureAccess) {
    console.log(`No access to beta feature: ${featureId}`);
    
    // If a fallback component is provided, show that instead of redirecting
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }

    // Otherwise, redirect to the fallback path
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

export default BetaPermissionGuard;
