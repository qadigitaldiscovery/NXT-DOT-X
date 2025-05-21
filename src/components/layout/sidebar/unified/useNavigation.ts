
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavItem } from '../types';

export function useNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
  // Helper to check if an item is active
  const isItemActive = (item: NavItem): boolean => {
    const path = item.href || item.path || '';
    if (item.activeMatchPattern) {
      if (typeof item.activeMatchPattern === 'string') {
        return location.pathname.includes(item.activeMatchPattern);
      } else if (item.activeMatchPattern instanceof RegExp) {
        return item.activeMatchPattern.test(location.pathname);
      }
    }
    
    return location.pathname === path || 
      (path !== '/' && path !== '' && location.pathname.startsWith(path));
  };

  // Handle item click
  const handleItemClick = (item: NavItem, onToggleMobile?: () => void, isMobile?: boolean) => {
    if (item.href || item.path) {
      navigate(item.href || item.path || '/');
    }
    
    if ('onClick' in item && typeof item.onClick === 'function') {
      item.onClick();
    }
    
    if (isMobile && onToggleMobile) {
      onToggleMobile();
    }
  };

  return {
    expandedCategories,
    setExpandedCategories,
    isItemActive,
    handleItemClick
  };
}
