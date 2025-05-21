import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar, SidebarProvider, useSidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel } from '../ui/sidebar';
import { Button } from '../ui/button';
import { MenuIcon, Home } from 'lucide-react';
import { SharedNavbar } from './SharedNavbar';
import { navCategories, masterDashItem } from './sidebar/NavigationConfig';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
// Separate the inner content that uses the sidebar hook
const TradingSystemContent = ({ moduleTitle, children }) => {
    const navigate = useNavigate();
    const { toggle } = useSidebar();
    const location = useLocation();
    const handleNavigate = (path) => {
        if (path) {
            navigate(path);
        }
    };
    return (_jsxs("div", { className: "flex h-screen overflow-hidden bg-gray-50", children: [_jsxs(Sidebar, { children: [_jsx(SidebarHeader, { className: "p-4 border-b", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-xl font-bold", children: "DOT-X Platform" }), _jsx(Button, { variant: "ghost", size: "icon", onClick: toggle, className: "text-gray-500 hover:bg-gray-100", children: _jsx(MenuIcon, { className: "h-5 w-5" }) })] }) }), _jsx(SidebarContent, { children: navCategories.map((category) => (_jsxs(SidebarGroup, { children: [_jsx(SidebarGroupLabel, { children: category.name }), _jsx(SidebarMenu, { children: category.items.map((item) => (_jsx(SidebarMenuItem, { children: _jsxs(SidebarMenuButton, { onClick: () => item.path ? handleNavigate(item.path) : item.href ? handleNavigate(item.href) : undefined, tooltip: item.label, isActive: Boolean((item.path && location.pathname === item.path) ||
                                                (item.href && location.pathname === item.href) ||
                                                (item.path && location.pathname.startsWith(`${item.path}/`)) ||
                                                (item.href && location.pathname.startsWith(`${item.href}/`))), children: [item.icon && _jsx(item.icon, { className: "h-4 w-4" }), _jsx("span", { children: item.label })] }) }, item.path || item.href || item.label))) })] }, category.name))) }), _jsxs(SidebarFooter, { className: "p-4 border-t", children: [_jsx(SidebarMenuItem, { children: _jsxs(SidebarMenuButton, { onClick: () => masterDashItem.path ? handleNavigate(masterDashItem.path) : masterDashItem.href ? handleNavigate(masterDashItem.href) : undefined, tooltip: "Master Dashboard", children: [_jsx(Home, { className: "h-4 w-4" }), _jsx("span", { children: "Master Dashboard" })] }) }), _jsx("div", { className: "text-xs text-muted-foreground mt-2 text-center", children: "DOT-X v2.5.8" })] })] }), _jsxs("div", { className: cn("flex flex-col flex-1 overflow-hidden", "md:rounded-tl-xl"), children: [_jsx(SharedNavbar, { onMenuClick: toggle, moduleTitle: moduleTitle || "Data Management" }), _jsx("main", { className: "flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50", children: children || _jsx(Outlet, {}) })] })] }));
};
// Main layout component that provides the SidebarProvider context
export const TradingSystemLayout = (props) => {
    return (_jsx(SidebarProvider, { defaultOpen: true, children: _jsx(TradingSystemContent, { ...props }) }));
};
export default TradingSystemLayout;
