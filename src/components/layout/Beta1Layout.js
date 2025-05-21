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
export function Beta1Layout() {
    const isMobile = useIsMobile();
    return (_jsx(SidebarProvider, { defaultOpen: !isMobile, children: _jsx("div", { className: "flex min-h-screen flex-col", children: _jsxs("div", { className: "flex flex-1", children: [_jsx(UnifiedSidebar, { homeItem: homeItem, moduleTitle: "Beta 1", useGlobalNavigation: true }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsx(SharedNavbar, { moduleTitle: "Beta 1" }), _jsx("main", { className: "flex-1 overflow-auto p-4", children: _jsx(Outlet, {}) })] })] }) }) }));
}
export default Beta1Layout;
