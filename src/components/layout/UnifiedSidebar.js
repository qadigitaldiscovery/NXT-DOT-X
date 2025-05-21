import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebar } from '@/context/SidebarContext';
import { SidebarMobileBackdrop } from './sidebar/unified/SidebarMobileBackdrop';
import { SidebarHeader } from './sidebar/unified/SidebarHeader';
import { ExpandedSidebarContent } from './sidebar/unified/ExpandedSidebarContent';
import { CollapsedSidebarContent } from './sidebar/unified/CollapsedSidebarContent';
import { useNavigation } from './sidebar/unified/useNavigation';
import { navCategories } from './sidebar/NavigationConfig';
export function UnifiedSidebar({ isOpen: propIsOpen, onToggle: propOnToggle, items = [], homeItem, moduleTitle = 'Navigation', useGlobalNavigation = false }) {
    const isMobile = useIsMobile();
    // Use the context if available, otherwise use props
    const sidebarContext = useSidebar();
    const isOpen = propIsOpen !== undefined ? propIsOpen : sidebarContext?.isOpen;
    const onToggle = propOnToggle || sidebarContext?.toggle;
    // Determine which navigation to use
    const effectiveNavItems = useGlobalNavigation ? navCategories : items;
    // Use our custom navigation hook
    const { expandedCategories, setExpandedCategories, isItemActive, handleItemClick } = useNavigation();
    return (_jsxs(_Fragment, { children: [isMobile && isOpen && (_jsx(SidebarMobileBackdrop, { isOpen: true, onClose: () => onToggle?.() })), _jsxs("aside", { className: cn("fixed left-0 top-0 z-50 flex h-full flex-col transition-transform duration-300 ease-in-out bg-gray-900", "md:sticky md:border-r md:border-r-gray-800", isOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-16"), children: [_jsx(SidebarHeader, { isOpen: !!isOpen, onToggle: () => onToggle?.(), moduleTitle: moduleTitle }), _jsx("div", { className: cn("flex-1 overflow-auto bg-gray-900 text-white", !isOpen && "hidden md:hidden"), children: _jsx(ExpandedSidebarContent, { homeItem: homeItem, navItems: effectiveNavItems, expandedCategories: expandedCategories, setExpandedCategories: setExpandedCategories, isItemActive: isItemActive, handleItemClick: (item) => handleItemClick(item, onToggle, isMobile), isMobile: isMobile }) }), !isOpen && !isMobile && (_jsx(CollapsedSidebarContent, { homeItem: homeItem, navItems: effectiveNavItems, isItemActive: isItemActive, handleItemClick: (item) => handleItemClick(item, onToggle, isMobile) }))] })] }));
}
