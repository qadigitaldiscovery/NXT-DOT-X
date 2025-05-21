import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import { SharedNavbar } from './SharedNavbar';
import { SidebarProvider } from '@/context/SidebarContext';
import { UnifiedSidebar } from './UnifiedSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Home } from 'lucide-react';
const homeItem = {
    label: 'Back to Dashboard',
    href: '/dashboard',
    icon: Home
};
export function BrandMarketingLayout() {
    const isMobile = useIsMobile();
    return (_jsx(SidebarProvider, { defaultOpen: !isMobile, children: _jsx("div", { className: "flex min-h-screen flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-red-50", children: _jsxs("div", { className: "flex flex-1", children: [_jsx(UnifiedSidebar, { homeItem: homeItem, moduleTitle: "Brand Marketing", useGlobalNavigation: true }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(SharedNavbar, { moduleTitle: "Brand Marketing" }), _jsx("main", { className: "flex-1 overflow-auto p-6", children: _jsx("div", { className: "max-w-7xl mx-auto", children: _jsx(Outlet, {}) }) })] })] }) }) }));
}
// Make sure we have both named and default exports
export default BrandMarketingLayout;
