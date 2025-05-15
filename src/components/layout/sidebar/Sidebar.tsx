
import React from 'react';
import { SidebarNavList } from './SidebarNavList';
import { SidebarFooter } from './SidebarFooter';
import { SidebarToggleButton } from './SidebarToggleButton';
import { NavItem } from './types';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  navItems?: NavItem[];
  homeItem?: NavItem;
  removeBottomToggle?: boolean;
  customFooterContent?: React.ReactNode;
}

export const Sidebar = ({
  open,
  onToggle,
  navItems = [],
  homeItem,
  removeBottomToggle = false,
  customFooterContent
}: SidebarProps) => {
  return (
    <aside className={`w-64 bg-white border-r dark:bg-neutral-900 dark:border-neutral-700 ${open ? '' : 'hidden'} md:block`}>
      <div className="p-4">
        {homeItem && (
          <a href={homeItem.href} className="block font-bold text-lg mb-6">
            {homeItem.label}
          </a>
        )}
        <SidebarNavList items={navItems} />
      </div>
      {!removeBottomToggle && (
        <SidebarToggleButton onToggle={onToggle} />
      )}
      {customFooterContent && (
        <SidebarFooter>{customFooterContent}</SidebarFooter>
      )}
    </aside>
  );
};
