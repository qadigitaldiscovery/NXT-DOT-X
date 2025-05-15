
import { ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface NavItem {
  icon: ReactNode | IconType;
  label: string;
  href: string;
  path?: string; // For backwards compatibility
  roles?: string[]; // Add roles for access control
  activeMatchPattern?: RegExp | string; // For custom active pattern matching
  children?: NavItem[]; // For nested navigation items
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
  hoverBgColor?: string;
  hasChildren?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
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
  className?: string;
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
