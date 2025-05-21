import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export const AppRoutes = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(RootHandler, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(DashboardLayout, {}), children: _jsx(Route, { index: true, element: _jsx(MasterDash, {}) }) }), DataManagementRoutes(), SocialMediaRoutes(), TechHubRoutes(), DotXRoutes(), AllAreaRoutes(), _jsx(Route, { path: "/master", element: _jsx(Navigate, { to: "/dashboard", replace: true }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }));
};
export default AppRoutes;
