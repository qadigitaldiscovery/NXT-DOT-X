
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Route } from 'react-router-dom';
import ModuleAutoPage from '../pages/auto/ModuleAutoPage';

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
    _jsx(_Fragment, {
      children: autoModules.map((module) => (
        _jsx(Route, { 
          path: `/${module}/*`,
          element: _jsx(ModuleAutoPage, {}),
        }, module)
      ))
    })
  );
};
