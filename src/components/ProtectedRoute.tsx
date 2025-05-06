
import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check authentication status
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // Check if coming from prototype selector
  const selectedPrototype = localStorage.getItem('selectedPrototype');

  useEffect(() => {
    // If we're coming from prototype selector and this is the dashboard route
    if (selectedPrototype === 'beta1' && location.pathname === '/') {
      console.log("Accessing dashboard from prototype selector");
      // Clear the flag now that we've handled it
      localStorage.removeItem('selectedPrototype');
    }
  }, [location.pathname, selectedPrototype]);

  console.log("Protected route check - Auth status:", isAuthenticated);
  console.log("Current path:", location.pathname);
  
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to landing");
    return <Navigate to="/landing" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
