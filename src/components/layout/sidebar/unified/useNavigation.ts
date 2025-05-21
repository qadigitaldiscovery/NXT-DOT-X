
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { type NavItem } from '../types';

export function useNavigation() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const location = useLocation();

  // Check if a specific nav item is currently active based on the URL
  const isItemActive = (item: NavItem) => {
    if (!item.path && !item.href) return false;
    
    const path = item.path || item.href || '';
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  // Handle clicking on a navigation item
  const handleItemClick = (
    item: NavItem, // Fixed: Removed underscore prefix from param name
    onToggle?: () => void, 
    isMobile?: boolean
  ) => {
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
