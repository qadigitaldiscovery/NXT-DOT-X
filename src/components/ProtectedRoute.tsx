
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  
  // Check for both isLoggedIn and isAuthenticated keys for backward compatibility
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true' || 
                          localStorage.getItem('isLoggedIn') === 'true';

  console.log("Protected route check - Auth status:", isAuthenticated);
  console.log("Current path:", location.pathname);
  
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to landing");
    return <Navigate to="/landing" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
