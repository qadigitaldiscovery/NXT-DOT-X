import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { MainSidebarBackdrop } from "./MainSidebarBackdrop";
import { MainSidebarContent } from "./MainSidebarContent";
import { MainSidebarCollapsed } from "./MainSidebarCollapsed";
import { useIsMobile } from "@/hooks/use-mobile";
export function MainSidebar({ isOpen = false, onClose, open, onToggle, className, navItems = [], navCategories = [], items = [], homeItem, useGlobalNavigation = false }) {
    const isMobile = useIsMobile();
    // Use either the new or old prop naming for consistency
    const sidebarOpen = open !== undefined ? open : isOpen;
    const handleClose = onClose || onToggle;
    return (_jsxs(_Fragment, { children: [_jsx(MainSidebarBackdrop, { isOpen: sidebarOpen, onClose: handleClose }), _jsxs("aside", { className: cn("fixed left-0 top-0 z-40 flex h-full flex-col transition-transform duration-300 ease-in-out", "md:sticky md:border-r md:border-r-sidebar-border", sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-16", className), children: [(sidebarOpen || !isMobile) && (_jsx(MainSidebarContent, { onClose: handleClose, navCategories: navCategories, navItems: navItems, items: items, homeItem: homeItem, useGlobalNavigation: useGlobalNavigation })), !sidebarOpen && !isMobile && (_jsx(MainSidebarCollapsed, { navCategories: navCategories, navItems: navItems, items: items, homeItem: homeItem, useGlobalNavigation: useGlobalNavigation }))] })] }));
}
