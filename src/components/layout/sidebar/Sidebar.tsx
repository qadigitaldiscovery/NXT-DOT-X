
import React from 'react';
import { cn } from '@/lib/utils';
import { SidebarHeader } from './SidebarHeader';
import { SidebarItem } from './SidebarItem';
import { SidebarCategoryMenu } from './SidebarCategoryMenu';
import { CompactSidebar } from './CompactSidebar';
import { SidebarFooter } from './SidebarFooter';
import { SidebarToggleButton } from './SidebarToggleButton';
import { NavCategory, NavItem, SidebarProps } from './types';
import { topLevelNavItems, navCategories, settingsItem } from './NavigationConfig';
import { useIsMobile } from '@/hooks/use-mobile';
import { useModuleAccess } from '@/hooks/useModuleAccess';
import { filterSidebarItems, getAdminSidebarItems } from '@/utils/rbac';

export const Sidebar = ({ 
  open, 
  onToggle, 
  navItems = navCategories, 
  homeItem,
  removeBottomToggle = false,
  customFooterContent
}: SidebarProps) => {
  const isMobile = useIsMobile();
  const { moduleAccess } = useModuleAccess();
  const [openCategories, setOpenCategories] = React.useState<string[]>(["Cost Management"]);
  const topLevelItems = homeItem ? [homeItem] : topLevelNavItems;

  const handleCategoryToggle = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category) 
        : [...prev, category]
    );
  };

  // Filter navigation items based on user access
  const filteredCategories = moduleAccess ? filterSidebarItems(navItems, moduleAccess.roles, moduleAccess.roles) : navItems;
  
  // Get admin-only items if user is an admin
  const adminCategory = moduleAccess ? getAdminSidebarItems(moduleAccess.roles, moduleAccess.roles) : [];

  // Combine regular categories with admin category if present
  const allCategories = adminCategory.length > 0
    ? [
        ...filteredCategories, 
        adminCategory[0]
      ] 
    : filteredCategories;

  return (
    <>
      {/* Mobile backdrop */}
      {open && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed md:sticky top-0 left-0 h-screen bg-sidebar z-30 shadow-lg flex flex-col transition-all duration-300 ease-in-out",
          open && !isMobile ? "w-64" : open && isMobile ? "w-64" : "w-0 md:w-16",
          isMobile && !open && "-translate-x-full",
          isMobile && open && "translate-x-0"
        )}
      >
        <SidebarHeader open={open} onToggle={onToggle} />

        {/* Full sidebar navigation - visible when open */}
        <nav className={cn(
          "flex-1 py-4 px-2 overflow-y-auto scrollbar-hide",
          !open && "md:hidden"
        )}>
          {/* Top level navigation items */}
          <ul className="space-y-1 mb-4">
            {topLevelItems.map((item) => (
              <SidebarItem key={item.path} item={item} />
            ))}
          </ul>
          
          {/* Categorized navigation items */}
          <SidebarCategoryMenu 
            categories={allCategories}
            openCategories={openCategories}
            onCategoryToggle={handleCategoryToggle}
          />
        </nav>

        {/* Icons only sidebar for collapsed state on desktop */}
        {!open && (
          <CompactSidebar
            topLevelItems={topLevelItems}
            categoriesItems={allCategories}
            footerItem={settingsItem}
          />
        )}

        <SidebarFooter item={settingsItem} open={open} />
      </aside>

      {!removeBottomToggle && (
        <SidebarToggleButton open={open} onToggle={onToggle} />
      )}
    </>
  );
};
