import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PermissionGuardProps {
  requiredPermission?: string;
  children: React.ReactNode;
  fallbackPath?: string;
}

const PermissionGuard = ({ 
  requiredPermission, 
  children, 
  fallbackPath = '/landing'
}: PermissionGuardProps) => {
  const { isAuthenticated, hasPermission, user } = useAuth();
  
  // Improved logging for debugging
  console.log(`Permission check - Auth: ${isAuthenticated}, Required: ${requiredPermission}`);
  
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to", fallbackPath);
    return <Navigate to={fallbackPath} replace />;
  }

  // Admin users bypass all permission checks
  if (user?.role === 'admin') {
    return <>{children}</>;
  }
  
  // For others, check specific permissions
  if (requiredPermission && !hasPermission(requiredPermission)) {
    console.log("Missing permission:", requiredPermission);
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PermissionGuard;
