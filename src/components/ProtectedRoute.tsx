
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  
  // Check authentication status
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  useEffect(() => {
    // Check if coming from prototype selector (only for dashboard route)
    if (isAuthenticated && location.pathname === '/') {
      const selectedPrototype = localStorage.getItem('selectedPrototype');
      
      if (selectedPrototype) {
        // Extract base prototype name before timestamp
        const prototypeName = selectedPrototype.split('_')[0];
        console.log(`Accessing dashboard from prototype selector: ${prototypeName}`);
        
        // Show welcome toast
        toast.success(`Welcome to ${prototypeName} dashboard`);
        
        // Clear the flag now that we've handled it
        localStorage.removeItem('selectedPrototype');
      }
    }
  }, [location.pathname, isAuthenticated]);

  console.log("Protected route check - Auth status:", isAuthenticated);
  console.log("Current path:", location.pathname);
  
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to landing");
    return <Navigate to="/landing" replace={true} />;
  }

  // Special case: if we're at root and we just navigated from prototype selector, render the component
  return <>{children}</>;
};

export default ProtectedRoute;
