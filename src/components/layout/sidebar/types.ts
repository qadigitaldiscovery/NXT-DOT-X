
import { ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface NavItem {
  icon: ReactNode | IconType;
  label: string;
  href: string;
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
}

export interface SidebarNavListProps {
  items?: NavItem[];
  textColor?: string;
  textHoverColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
  iconColor?: string;
}
