
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  
  // Check authentication status
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Additional logging to help with debugging
  console.log("Protected route check - Auth status:", isAuthenticated);
  console.log("Current path:", location.pathname);
  
  // If not authenticated, redirect to landing page
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to landing");
    return <Navigate to="/landing" replace={true} />;
  }

  // If we're on the dashboard path, show a welcome toast once
  React.useEffect(() => {
    if (location.pathname === '/') {
      // Use sessionStorage to ensure the toast only shows once per session
      const welcomeShown = sessionStorage.getItem('welcomeShown');
      if (!welcomeShown) {
        toast.success("Welcome to Beta 1 dashboard");
        sessionStorage.setItem('welcomeShown', 'true');
      }
    }
  }, [location.pathname]);

  // If authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
