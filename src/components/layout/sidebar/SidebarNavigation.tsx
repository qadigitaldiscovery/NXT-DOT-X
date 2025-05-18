import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavCategory } from './types';
import { SidebarCategoryMenu } from './SidebarCategoryMenu';
import { checkPermission } from '@/hooks/usePermissions';

interface SidebarNavigationProps {
  categories: NavCategory[];
  userRole?: string | null;
}

export const SidebarNavigation = ({ categories, userRole }: SidebarNavigationProps) => {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  
  // Filter navigation items based on user role if roles are specified
  const filteredCategories = categories.map(category => ({
    ...category,
    items: category.items.filter(item => {
      // If no roles are specified for this item, show it to everyone
      if (!item.roles || item.roles.length === 0) return true;
      
      // Otherwise, only show if user has one of the required roles
      return checkPermission(userRole, item.roles);
    })
  })).filter(category => category.items.length > 0);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  return (
    <div className="space-y-1">
      {filteredCategories.map((category) => (
        <SidebarCategoryMenu 
          key={category.name} 
          category={category}
          currentPath={location.pathname}
          userRole={userRole}
        />
      ))}
    </div>
  );
};
