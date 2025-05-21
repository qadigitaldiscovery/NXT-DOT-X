
import React from 'react';
import { Route } from 'react-router-dom';
import ModuleAutoPage from '../pages/auto/ModuleAutoPage';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';

/**
 * AllAreaRoutes
 * 
 * This component handles routes for legacy or auto-generated module pages.
 * It dynamically creates routes for modules that don't have explicitly defined routes.
 */
export const AllAreaRoutes = () => {
  // Define modules that should be handled by the auto-routing system
  const autoModules = [
    'analytics',
    'billing',
    'finance',
    'hr',
    'crm',
    'inventory',
    'marketing',
    'procurement',
    'resources',
  ];
  
  return (
    <>
      {/* Map each auto module to its routes */}
      {autoModules.map((module) => (
        <Route 
          key={module}
          path={`/${module}/*`} 
          element={
            <ModuleAutoPage />
          } 
        />
      ))}
    </>
  );
};
