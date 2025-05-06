
import React from 'react';
import { cn } from '@/lib/utils';
import { SidebarHeader } from './SidebarHeader';
import { SidebarItem } from './SidebarItem';
import { SidebarCategoryMenu } from './SidebarCategoryMenu';
import { CompactSidebar } from './CompactSidebar';
import { SidebarFooter } from './SidebarFooter';
import { SidebarToggleButton } from './SidebarToggleButton';
import { SidebarProps } from './types';
import { topLevelNavItems, navCategories, settingsItem } from './NavigationConfig';
import { useIsMobile } from '@/hooks/use-mobile';

export const Sidebar = ({ open, onToggle }: SidebarProps) => {
  const isMobile = useIsMobile();
  const [openCategories, setOpenCategories] = React.useState<string[]>(["Cost Management"]);

  const handleCategoryToggle = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category) 
        : [...prev, category]
    );
  };

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
            {topLevelNavItems.map((item) => (
              <SidebarItem key={item.path} item={item} />
            ))}
          </ul>
          
          {/* Categorized navigation items */}
          <SidebarCategoryMenu 
            categories={navCategories}
            openCategories={openCategories}
            onCategoryToggle={handleCategoryToggle}
          />
        </nav>

        {/* Icons only sidebar for collapsed state on desktop */}
        {!open && (
          <CompactSidebar
            topLevelItems={topLevelNavItems}
            categoriesItems={navCategories}
            footerItem={settingsItem}
          />
        )}

        <SidebarFooter item={settingsItem} open={open} />
      </aside>

      <SidebarToggleButton open={open} onToggle={onToggle} />
    </>
  );
};
