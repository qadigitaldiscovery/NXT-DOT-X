
import { UnifiedSidebar } from './UnifiedSidebar';
import { Home } from 'lucide-react';
import type { NavItem } from './sidebar/types';

const defaultHomeItem: NavItem = {
  label: 'Home',
  href: '/dashboard',
  icon: Home
};

export interface SharedSidebarProps {
  homeItem?: NavItem;
  moduleTitle?: string;
  useGlobalNavigation?: boolean;
}

export function SharedSidebar({
  homeItem = defaultHomeItem,
  moduleTitle = 'Navigation',
  useGlobalNavigation = true,
  ...props
}: SharedSidebarProps) {
  return (
    <UnifiedSidebar 
      homeItem={homeItem}
      moduleTitle={moduleTitle}
      useGlobalNavigation={useGlobalNavigation}
      {...props}
    />
  );
}
