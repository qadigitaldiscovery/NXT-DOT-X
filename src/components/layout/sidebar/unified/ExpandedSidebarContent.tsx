
import { useEffect } from 'react';
import { NavCategory, NavItem } from '../types';
import { SidebarHomeItem } from './SidebarHomeItem';
import { SidebarCategory } from './SidebarCategory';

interface ExpandedSidebarContentProps {
  homeItem?: NavItem;
  navItems: NavCategory[];
  expandedCategories: string[];
  setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  isItemActive: (item: NavItem) => boolean;
  handleItemClick: (item: NavItem) => void;
  isMobile: boolean;
}

export function ExpandedSidebarContent({
  homeItem,
  navItems,
  expandedCategories,
  setExpandedCategories,
  isItemActive,
  handleItemClick,
  isMobile
}: ExpandedSidebarContentProps) {
  // Toggle category expansion
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
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

  return (
    <nav className="flex-1 pt-4 px-3 overflow-y-auto scrollbar-thin">
      {/* Home item if provided */}
      {homeItem && (
        <SidebarHomeItem
          homeItem={homeItem}
          isActive={isItemActive(homeItem)}
          onClick={() => handleItemClick(homeItem)}
        />
      )}
      
      {/* Categories */}
      <div className="px-3 py-2">
        {navItems.map((category, index) => {
          const categoryName = category.name || category.label || `category-${index}`;
          const isExpanded = expandedCategories.includes(categoryName);
          
          return (
            <SidebarCategory
              key={`${categoryName}-${index}`}
              category={category}
              isExpanded={isExpanded}
              onToggle={() => toggleCategory(categoryName)}
              onItemClick={handleItemClick}
              isItemActive={isItemActive}
              isMobile={isMobile}
            />
          );
        })}
      </div>
    </nav>
  );
}
