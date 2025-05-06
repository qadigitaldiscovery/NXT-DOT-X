
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  
  // Check authentication status once
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  useEffect(() => {
    // Only handle selected prototype when on dashboard route (/)
    if (isAuthenticated && location.pathname === '/') {
      const selectedPrototype = localStorage.getItem('selectedPrototype');
      
      if (selectedPrototype) {
        // Extract base prototype name before timestamp
        const prototypeName = selectedPrototype.split('_')[0];
        console.log(`Accessing dashboard with prototype: ${prototypeName}`);
        
        // Show welcome toast
        toast.success(`Welcome to ${prototypeName} dashboard`);
        
        // Clear the flag to prevent future redirects
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

  return <>{children}</>;
};

export default ProtectedRoute;
