
import React, { useEffect } from 'react';
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
  
  // Check if we're coming from prototype selector (for debugging)
  useEffect(() => {
    const fromPrototypeSelector = localStorage.getItem('fromPrototypeSelector');
    if (fromPrototypeSelector) {
      console.log("Navigation from prototype selector detected, timestamp:", fromPrototypeSelector);
      // Clear the flag after we've used it for debugging
      localStorage.removeItem('fromPrototypeSelector');
    }
  }, []);

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to landing");
    return <Navigate to="/landing" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
