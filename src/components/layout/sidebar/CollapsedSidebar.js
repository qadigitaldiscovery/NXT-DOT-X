import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/context/AuthContext';
export const CollapsedSidebar = ({ navItems, textColor = "text-blue-200", activeBgColor = "bg-gradient-to-r from-blue-800 to-indigo-700", activeTextColor = "text-white", hoverBgColor = "hover:bg-indigo-900/50", homeItem }) => {
    const location = useLocation();
    const { user } = useAuth();
    const shouldShowItem = (item) => {
        if (!item.roles || item.roles.length === 0)
            return true;
        if (!user?.role)
            return false;
        return item.roles.includes(user.role);
    };
    const isItemActive = (item) => {
        const path = item.href || item.path || '';
        if (item.activeMatchPattern) {
            if (typeof item.activeMatchPattern === 'string') {
                return location.pathname.includes(item.activeMatchPattern);
            }
            else if (item.activeMatchPattern instanceof RegExp) {
                return item.activeMatchPattern.test(location.pathname);
            }
        }
        return location.pathname === path ||
            (path !== '/' && path !== '' && location.pathname.startsWith(path));
    };
    let allItems = [];
    if (navItems && navItems.length > 0) {
        if ('items' in navItems[0]) {
            const categories = navItems;
            allItems = categories.flatMap(category => category.items && Array.isArray(category.items) ? category.items : []);
        }
        else {
            allItems = navItems;
        }
    }
    const filteredItems = allItems
        .filter(item => shouldShowItem(item) && !(item.children && item.children.length > 0));
    const displayItems = homeItem ? [...filteredItems, homeItem] : filteredItems;
    return (_jsx("div", { className: "py-4 flex flex-col items-center space-y-2 overflow-y-auto", children: _jsx(TooltipProvider, { delayDuration: 300, children: displayItems.map((item, index) => {
                const to = item.href || item.path || '#';
                const isHomeItem = item === homeItem && displayItems.length > 1;
                const renderIcon = () => {
                    if (!item.icon) {
                        return null;
                    }
                    const IconComponent = item.icon;
                    return _jsx(IconComponent, { className: "h-5 w-5" });
                };
                return (_jsxs(React.Fragment, { children: [isHomeItem && _jsx("div", { className: "h-4" }), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(NavLink, { to: to, className: ({ isActive: linkActive }) => cn("p-2 rounded-lg transition-colors duration-150 flex justify-center", textColor, hoverBgColor, (isItemActive(item) || linkActive) && `${activeBgColor} ${activeTextColor}`), children: renderIcon() }) }), _jsx(TooltipContent, { side: "right", className: "bg-gray-800 text-white border-gray-700", children: item.label })] })] }, `${item.label}-${index}`));
            }) }) }));
};
