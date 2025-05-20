import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PermissionGuardProps {
  requiredRole?: string;
  moduleSlug?: string;
  children: React.ReactNode;
  fallbackPath?: string;
}

const PermissionGuard = ({ 
  requiredRole,
  moduleSlug,
  children, 
  fallbackPath = '/landing'
}: PermissionGuardProps) => {
  const { isAuthenticated, hasPermission, user } = useAuth();
  
  // Improved logging for debugging
  console.log(`Auth check - Auth: ${isAuthenticated}, Role: ${requiredRole}, Module: ${moduleSlug}`);
  
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to", fallbackPath);
    return <Navigate to={fallbackPath} replace />;
  }

  // Check role first if required
  if (requiredRole && user?.role !== requiredRole) {
    console.log("Missing required role:", requiredRole);
    return <Navigate to="/unauthorized" replace />;
  }

  // Check module access if specified
  if (moduleSlug && !hasPermission(`access:${moduleSlug}`)) {
    console.log("Missing module access:", moduleSlug);
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PermissionGuard;
