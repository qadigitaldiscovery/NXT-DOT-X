import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavCategory } from './types';
import { SidebarCategoryMenu } from './SidebarCategoryMenu';

// Simple permission check function since the imported one isn't available
const checkPermission = (userRole?: string | null, requiredRoles?: string[]): boolean => {
  // If no roles required, allow access
  if (!requiredRoles || requiredRoles.length === 0) return true;
  
  // If roles required but no user role, deny access
  if (!userRole) return false;
  
  // Check if user's role is in the required roles
  return requiredRoles.includes(userRole);
};

interface SidebarNavigationProps {
  categories: NavCategory[];
  userRole?: string | null;
}

export const SidebarNavigation = ({ categories, userRole }: SidebarNavigationProps) => {
  const location = useLocation();
  const [expandedCategories] = useState<Record<string, boolean>>({});
  
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

  return (
    <div className="space-y-1">
      {filteredCategories.map((category) => (
        <SidebarCategoryMenu 
          key={category.name || category.label} 
          category={category}
          currentPath={location.pathname}
          userRole={userRole}
        />
      ))}
    </div>
  );
};
