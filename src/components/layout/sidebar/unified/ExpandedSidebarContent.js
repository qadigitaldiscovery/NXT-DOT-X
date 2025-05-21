import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { SidebarHomeItem } from './SidebarHomeItem';
import { SidebarCategory } from './SidebarCategory';
export function ExpandedSidebarContent({ homeItem, navItems, expandedCategories, setExpandedCategories, isItemActive, handleItemClick, isMobile }) {
    // Toggle category expansion
    const toggleCategory = (categoryName) => {
        setExpandedCategories(prev => prev.includes(categoryName)
            ? prev.filter(name => name !== categoryName)
            : [...prev, categoryName]);
    };
    // Auto-expand categories with active items
    useEffect(() => {
        navItems.forEach(category => {
            const hasActiveItem = category.items?.some(isItemActive);
            if (hasActiveItem) {
                const categoryName = category.name || category.label || '';
                if (categoryName && !expandedCategories.includes(categoryName)) {
                    setExpandedCategories(prev => [...prev, categoryName]);
                }
            }
        });
    }, [navItems, expandedCategories, isItemActive, setExpandedCategories]);
    return (_jsxs("nav", { className: "flex-1 pt-4 px-3 overflow-y-auto scrollbar-thin", children: [homeItem && (_jsx(SidebarHomeItem, { homeItem: homeItem, isActive: isItemActive(homeItem), onClick: () => handleItemClick(homeItem) })), _jsx("div", { className: "px-3 py-2", children: navItems.map((category, index) => {
                    const categoryName = category.name || category.label || `category-${index}`;
                    const isExpanded = expandedCategories.includes(categoryName);
                    return (_jsx(SidebarCategory, { category: category, isExpanded: isExpanded, onToggle: () => toggleCategory(categoryName), onItemClick: handleItemClick, isItemActive: isItemActive, isMobile: isMobile }, `${categoryName}-${index}`));
                }) })] }));
}
