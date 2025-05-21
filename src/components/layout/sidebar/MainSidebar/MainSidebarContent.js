import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navCategories as globalNavCategories } from '../NavigationConfig';
export function MainSidebarContent({ onClose, navCategories = [], navItems = [], items = [], homeItem, useGlobalNavigation = false }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [expandedCategories, setExpandedCategories] = useState([]);
    // Determine which navigation to use
    let effectiveNavCategories = [];
    const isDataManagement = location.pathname.startsWith('/data-management');
    if (isDataManagement && useGlobalNavigation) {
        effectiveNavCategories = globalNavCategories;
    }
    else if (useGlobalNavigation) {
        effectiveNavCategories = globalNavCategories;
    }
    else if (items && items.length > 0) {
        effectiveNavCategories = items;
    }
    else if (navCategories && navCategories.length > 0) {
        effectiveNavCategories = navCategories;
    }
    else if (navItems && navItems.length > 0) {
        effectiveNavCategories = [{
                name: 'Navigation',
                label: 'Navigation',
                items: navItems
            }];
    }
    // Toggle category expansion
    const toggleCategory = (categoryName) => {
        setExpandedCategories(prev => prev.includes(categoryName)
            ? prev.filter(name => name !== categoryName)
            : [...prev, categoryName]);
    };
    // Check if item is active
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
    const handleItemClick = (item) => {
        if (item.href || item.path) {
            navigate(item.href || item.path || '/');
            console.log("NavItem clicked - navigating to:", item.href || item.path);
        }
        // Handle custom onClick if provided
        if ('onClick' in item && typeof item.onClick === 'function') {
            item.onClick();
        }
        if (onClose && window.innerWidth < 768) {
            onClose();
        }
    };
    // Auto-expand categories based on active path
    useEffect(() => {
        effectiveNavCategories.forEach(category => {
            const hasActiveItem = category.items?.some(isItemActive);
            if (hasActiveItem) {
                const categoryName = category.name || category.label || '';
                if (categoryName && !expandedCategories.includes(categoryName)) {
                    setExpandedCategories(prev => [...prev, categoryName]);
                }
            }
        });
    }, [location.pathname, effectiveNavCategories]);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex h-14 items-center justify-between border-b border-sidebar-border bg-gray-900 text-white px-4", children: [_jsx("span", { className: "font-semibold", children: "Navigation" }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: onClose, className: "h-8 w-8 p-0 text-white hover:bg-gray-800 md:hidden", children: [_jsx(X, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Close" })] })] }), _jsxs("div", { className: "flex-1 overflow-auto bg-gray-900 text-white", children: [homeItem && (_jsx("div", { className: "px-3 pt-4", children: _jsxs(Button, { variant: "ghost", className: cn("w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 mb-2", isItemActive(homeItem) && "bg-gray-800 text-white"), onClick: () => handleItemClick(homeItem), children: [homeItem.icon && _jsx(homeItem.icon, { className: "mr-2 h-5 w-5" }), homeItem.label] }) })), _jsx("div", { className: "px-3 py-2", children: effectiveNavCategories.map((category, index) => {
                            const isExpanded = expandedCategories.includes(category.name || category.label || `category-${index}`);
                            const categoryName = category.name || category.label || `category-${index}`;
                            return (_jsxs("div", { className: "mb-3", children: [_jsxs(Button, { variant: "ghost", className: "w-full justify-between items-center text-gray-400 hover:text-white hover:bg-gray-800/30 py-2", onClick: () => toggleCategory(categoryName), children: [_jsx("span", { className: "text-xs font-semibold uppercase tracking-wider", children: category.label || category.name }), isExpanded ? (_jsx(ChevronDown, { className: "h-4 w-4" })) : (_jsx(ChevronRight, { className: "h-4 w-4" }))] }), isExpanded && category.items && (_jsx("div", { className: "mt-1 ml-2 space-y-1", children: category.items.map((item, itemIndex) => (_jsxs(Button, { variant: "ghost", className: cn("w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/50 py-1.5 h-auto", isItemActive(item) && "bg-gray-800/50 text-white"), onClick: () => handleItemClick(item), children: [item.icon && _jsx(item.icon, { className: "mr-2 h-4 w-4" }), _jsx("span", { className: "text-sm", children: item.label })] }, `${item.label}-${itemIndex}`))) }))] }, `${categoryName}-${index}`));
                        }) })] })] }));
}
