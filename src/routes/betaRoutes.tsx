import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RouteGuard } from '../utils/rbac/RouteGuard';
import { Permission } from '../utils/rbac/permissions';

// Placeholder components - to be replaced with actual implementations
const Beta1Dashboard = () => (
  <div className="module-container">
    <h1>Beta1 Dashboard</h1>
    <p>Beta feature preview and testing environment.</p>
  </div>
);

const Beta2Dashboard = () => (
  <div className="module-container">
    <h1>Beta2 Dashboard</h1>
    <p>Advanced beta features and testing environment.</p>
  </div>
);

const Beta2Analytics = () => (
  <div className="module-container">
    <h1>Beta2 Analytics</h1>
    <p>Experimental analytics features in beta.</p>
  </div>
);

/**
 * Beta Features routes
 * For early access and testing of upcoming features
 */
export const BetaRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <RouteGuard requiredPermissions={Permission.BETA_ACCESS}>
          <Beta1Dashboard />
        </RouteGuard>
      } />
      
      <Route path="/dashboard" element={
        <RouteGuard requiredPermissions={Permission.BETA_ACCESS}>
          <Beta1Dashboard />
        </RouteGuard>
      } />
      
      <Route path="/analytics" element={
        <RouteGuard requiredPermissions={Permission.BETA_ACCESS}>
          <Beta2Analytics />
        </RouteGuard>
      } />
    </Routes>
  );
};

export default BetaRoutes;
