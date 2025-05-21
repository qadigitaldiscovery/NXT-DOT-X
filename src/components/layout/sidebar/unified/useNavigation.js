import { useState } from 'react';
import { useLocation } from 'react-router-dom';
export function useNavigation() {
    const [expandedCategories, setExpandedCategories] = useState([]);
    const location = useLocation();
    // Check if a specific nav item is currently active based on the URL
    const isItemActive = (item) => {
        if (!item.path && !item.href)
            return false;
        const path = item.path || item.href || '';
        return location.pathname === path ||
            (path !== '/' && location.pathname.startsWith(path));
    };
    // Handle clicking on a navigation item
    const handleItemClick = (_item, // Added underscore to indicate it's intentionally unused
    onToggle, isMobile) => {
        // If on mobile and a toggle function is provided, close the sidebar
        if (isMobile && onToggle) {
            onToggle();
        }
    };
    return {
        expandedCategories,
        setExpandedCategories,
        isItemActive,
        handleItemClick
    };
}
