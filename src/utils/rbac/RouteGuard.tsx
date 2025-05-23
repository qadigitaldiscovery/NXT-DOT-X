
import React from 'react';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredPermissions?: any;
  requireAll?: boolean;
  redirectTo?: string;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  // Security disabled - always allow access
  return <>{children}</>;
};

export const withRouteGuard = (
  Component: React.ComponentType<any>,
  guardProps: Omit<RouteGuardProps, 'children'>
) => {
  return (props: any) => (
    <RouteGuard {...guardProps}>
      <Component {...props} />
    </RouteGuard>
  );
};

export default RouteGuard;
