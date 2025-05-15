
import { ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface NavItem {
  icon: ReactNode | IconType;
  label: string;
  href: string; // Using href instead of path for consistency
  roles?: string[]; // Add roles for access control
}

export interface NavCategory {
  name: string;
  items: NavItem[];
}

export interface SidebarItemProps {
  item: NavItem;
  isActive: boolean;
  textColor?: string;
  textHoverColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
  iconColor?: string;
}

export interface SidebarProps {
  navItems?: NavItem[];
  navCategories?: NavCategory[];
  textColor?: string;
  textHoverColor?: string;
  activeTextColor?: string;
  activeBgColor?: string;
  iconColor?: string;
  isCollapsed?: boolean;
  onToggleCollapsed?: () => void;
  showToggleButton?: boolean;
  customFooterContent?: ReactNode;
  removeBottomToggle?: boolean;
  open?: boolean;
  onToggle?: () => void;
  homeItem?: NavItem;
}

export interface SidebarNavListProps {
  items?: NavItem[];
  textColor?: string;
  textHoverColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
  iconColor?: string;
  userRole?: string;
  expandedItems?: string[];
  onToggleExpand?: (label: string) => void;
  hoverBgColor?: string;
}
