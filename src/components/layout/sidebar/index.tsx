
import React from 'react';
import { cn } from '@/lib/utils';
import { Sidebar as SidebarComponent } from './Sidebar';
import { SidebarHeader } from './SidebarHeader';
import { SidebarItem } from './SidebarItem';
import { SidebarCategoryMenu } from './SidebarCategoryMenu';
import { CompactSidebar } from './CompactSidebar';
import { SidebarFooter } from './SidebarFooter';
import { SidebarToggleButton } from './SidebarToggleButton';
import { NavCategory, NavItem } from './types';
import { getAdminSidebarItems } from '@/utils/rbac/index';

// Export all sidebar components for external use
export {
  SidebarComponent as Sidebar,
  SidebarHeader,
  SidebarItem,
  SidebarCategoryMenu,
  CompactSidebar,
  SidebarFooter,
  SidebarToggleButton
};

// Also export the types
export type { NavCategory, NavItem };
