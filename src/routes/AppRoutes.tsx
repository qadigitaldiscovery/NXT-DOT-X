
/**
 * Application Routes
 * 
 * This file implements a hierarchical routing structure where:
 * - MasterDash serves as the central hub
 * - Module dashboards branch out from MasterDash
 * - Sub-module pages branch out from module dashboards
 * 
 * NOTE: The routing structure has two patterns:
 * 1. Explicitly managed module routes:
 *    - DataManagementRoutes
 *    - SocialMediaRoutes
 *    - TechHubRoutes
 *    - DOT-X routes
 * 
 * 2. Legacy grouped routes:
 *    - All other module routes managed through AllAreaRoutes()
 */

import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import DashboardLayout from '../components/layout/DashboardLayout';

// Core Pages
import RootHandler from '../components/RootHandler';
import MasterDash from '../pages/MasterDash';

// Explicitly managed route modules
import { DataManagementRoutes } from './dataManagementRoutes';
import { SocialMediaRoutes } from './socialMediaRoutes';
import { TechHubRoutes } from './techHubRoutes';
import { DotXRoutes } from './dotXRoutes';

// Legacy grouped routes
import { AllAreaRoutes } from './AllAreaRoutes';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Root handler - decides where to send users initially */}
      <Route path="/" element={<RootHandler />} />
      
      {/* Main Dashboard - the central hub */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<MasterDash />} />
      </Route>
      
      {/* Explicitly managed module routes */}
      {DataManagementRoutes()}
      {SocialMediaRoutes()}
      {TechHubRoutes()}
      {DotXRoutes()}
      
      {/* Legacy grouped routes - maintained for backward compatibility */}
      <AllAreaRoutes />
      
      {/* Master dashboard shortcut */}
      <Route path="/master" element={<Navigate to="/dashboard" replace />} />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
