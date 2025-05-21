import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { MainSidebar } from '@/components/layout/sidebar/MainSidebar/MainSidebar';
import { masterDashItem } from '@/components/layout/sidebar/NavigationConfig';
import { SharedNavbar } from '@/components/layout/SharedNavbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { SidebarProvider } from '@/components/ui/sidebar/index';
// Separate inner content component that uses sidebar hooks
const PlatformLayoutContent = ({ children, navItems = [], navCategories = [], items = [], className, showTopLeftToggle = false, removeBottomToggle = true, initialSidebarState = 'expanded', onSidebarStateChange, moduleTitle, useGlobalNavigation = false }) => {
    const isMobile = useIsMobile();
    const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
    // Update sidebar state when mobile status changes
    useEffect(() => {
        setSidebarOpen(!isMobile);
    }, [isMobile]);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
        if (onSidebarStateChange) {
            onSidebarStateChange(sidebarOpen ? 'collapsed' : 'expanded');
        }
    };
    return (_jsxs("div", { className: "flex h-screen flex-col", children: [_jsx(SharedNavbar, { onMenuClick: toggleSidebar, moduleTitle: moduleTitle }), _jsxs("div", { className: "flex flex-1 overflow-hidden", children: [_jsx(MainSidebar, { open: sidebarOpen, onToggle: toggleSidebar, navItems: navItems, navCategories: navCategories, items: items, className: className, showToggleButton: showTopLeftToggle, removeBottomToggle: removeBottomToggle, initialState: initialSidebarState, onStateChange: onSidebarStateChange, homeItem: masterDashItem, useGlobalNavigation: useGlobalNavigation }), _jsx("main", { className: cn("flex-1 overflow-auto p-4", "bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black"), children: children })] })] }));
};
export const PlatformLayout = (props) => {
    return (_jsx(SidebarProvider, { defaultOpen: true, children: _jsx(PlatformLayoutContent, { ...props }) }));
};
