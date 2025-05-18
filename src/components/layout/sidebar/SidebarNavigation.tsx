
import { SidebarCategoryMenu } from './SidebarCategoryMenu';
import { SidebarItem } from './SidebarItem';
import { NavCategory, NavItem } from './types';
import { useLocation } from 'react-router-dom';

interface SidebarNavigationProps {
  categories: NavCategory[];
  userRole?: string;
}

export const SidebarNavigation = ({
  categories,
  userRole
}: SidebarNavigationProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const shouldShowCategory = (category: NavCategory) => {
    if (!category.roles || category.roles.length === 0) return true;
    if (!userRole) return false;
    return category.roles.includes(userRole);
  };

  const shouldShowItem = (item: NavItem) => {
    if (!item.roles || item.roles.length === 0) return true;
    if (!userRole) return false;
    return item.roles.includes(userRole);
  };

  return (
    <div className="space-y-1">
      {categories.filter(shouldShowCategory).map((category) => (
        <SidebarCategoryMenu
          key={category.label || 'category'}
          title={category.label}
          items={category.items.filter(shouldShowItem)}
          currentPath={currentPath}
          userRole={userRole || ''} // Convert possible undefined to empty string
        />
      ))}
    </div>
  );
};
