
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Security disabled - always allow access
  return <>{children}</>;
};

export default ProtectedRoute;
