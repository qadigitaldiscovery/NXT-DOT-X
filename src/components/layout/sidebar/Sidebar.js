import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { cn } from '../../../lib/utils';
import { useIsMobile } from '../../../hooks/use-mobile';
import { SidebarNavList } from './SidebarNavList';
import { CollapsedSidebar } from './CollapsedSidebar';
import { useAuth } from '../../../context/AuthContext';
import { SidebarToggleButton } from './SidebarToggleButton';
import { ChevronLeft, Menu } from 'lucide-react';
// Helper function to normalize navigation items
const normalizeNavItems = (items = []) => {
    return items.map(item => ({
        ...item,
        href: item.href || item.path || '#'
    }));
};
const normalizeNavCategories = (categories = []) => {
    return categories.map(category => ({
        ...category,
        items: category.items.map(item => ({
            ...item,
            href: item.href || item.path || '#'
        }))
    }));
};
const Sidebar = ({ open, onToggle, navItems = [], navCategories = [], items = [], homeItem, customFooterContent, removeBottomToggle = false, showToggleButton = true, initialState, onStateChange }) => {
    const isMobile = useIsMobile();
    const [expandedItems, setExpandedItems] = useState([]);
    const { user } = useAuth();
    const [internalOpen, setInternalOpen] = useState(() => {
        if (initialState) {
            return initialState === 'expanded';
        }
        return true;
    });
    const isOpen = open !== undefined ? open : internalOpen;
    const toggleSidebar = () => {
        if (onToggle) {
            onToggle();
        }
        else {
            setInternalOpen(!internalOpen);
        }
        if (onStateChange) {
            onStateChange(isOpen ? 'collapsed' : 'expanded');
        }
    };
    // Combined navigation items
    const allCategories = [...normalizeNavCategories(navCategories), ...normalizeNavCategories(items)];
    const allNavItems = [...normalizeNavItems(navItems)];
    if (allNavItems.length > 0 && allCategories.length === 0) {
        allCategories.push({
            label: "Navigation",
            name: "Navigation",
            items: allNavItems
        });
    }
    const toggleExpanded = (label) => {
        setExpandedItems(prev => prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]);
    };
    return (_jsxs(_Fragment, { children: [isOpen && isMobile && (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-20 backdrop-blur-sm", onClick: toggleSidebar })), _jsxs("aside", { className: cn("fixed md:sticky top-0 left-0 h-screen z-30 shadow-lg flex flex-col transition-all duration-300 ease-in-out", "bg-gray-900", "border-r border-gray-800", isOpen ? "w-64" : "w-0 md:w-16", isMobile && !isOpen && "-translate-x-full", isMobile && isOpen && "translate-x-0"), children: [_jsxs("div", { className: "h-16 flex items-center justify-between px-4 border-b border-gray-800", children: [isOpen && (_jsx("span", { className: "text-lg font-semibold text-gray-100", children: "Data Management" })), _jsx("button", { onClick: toggleSidebar, className: "p-2 rounded-md hover:bg-gray-800 text-gray-300", children: isOpen ? _jsx(ChevronLeft, {}) : _jsx(Menu, {}) })] }), _jsx("nav", { className: cn("flex-1 pt-4 px-3 overflow-y-auto scrollbar-thin", "scrollbar-thumb-gray-700", "scrollbar-track-gray-800", !isOpen && "hidden"), children: _jsx(SidebarNavList, { categories: allCategories, userRole: user?.role, expandedCategories: expandedItems, onCategoryToggle: toggleExpanded, textColor: "text-gray-300", textHoverColor: "hover:text-gray-100", activeBgColor: "bg-gray-800", activeTextColor: "text-gray-100", hoverBgColor: "hover:bg-gray-800/50" }) }), !isOpen && !isMobile && (_jsx(CollapsedSidebar, { navItems: allCategories, textColor: "text-gray-300", activeBgColor: "bg-gray-800", activeTextColor: "text-gray-100", hoverBgColor: "hover:bg-gray-800/50", homeItem: homeItem })), customFooterContent && (_jsx("div", { className: "border-t border-gray-800 p-4", children: customFooterContent }))] }), !removeBottomToggle && showToggleButton && (_jsx(SidebarToggleButton, { open: isOpen, onToggle: toggleSidebar }))] }));
};
export { Sidebar };
export default Sidebar;
