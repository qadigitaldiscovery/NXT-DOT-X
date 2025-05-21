import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import { UnifiedSidebar } from './UnifiedSidebar';
import MasterDashNavbar from '../master-dash/MasterDashNavbar';
import MasterDashFooter from '../master-dash/MasterDashFooter';
import { useIsMobile } from '../../hooks/use-mobile';
import { Home } from 'lucide-react';
import { SidebarProvider } from '@/context/SidebarContext';
const homeItem = {
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home
};
export function DashboardLayout() {
    const isMobile = useIsMobile();
    return (_jsx(SidebarProvider, { defaultOpen: !isMobile, children: _jsxs("div", { className: "flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-950", children: [_jsx(UnifiedSidebar, { homeItem: homeItem, moduleTitle: "Data Management", useGlobalNavigation: true }), _jsxs("div", { className: "flex flex-col flex-1", children: [_jsx(MasterDashNavbar, {}), _jsx("main", { className: "flex-1 p-6 overflow-y-auto bg-gray-200", children: _jsx(Outlet, {}) }), _jsx(MasterDashFooter, {})] })] }) }));
}
export default DashboardLayout;
