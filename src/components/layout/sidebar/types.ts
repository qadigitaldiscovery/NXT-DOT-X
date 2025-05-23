import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  icon?: LucideIcon;
  href?: string;
  path?: string;  // For backward compatibility
  roles?: string[];
  activeMatchPattern?: string | RegExp;
  children?: NavItem[];
}

export interface NavCategory {
  label: string;
  name?: string;  // For backward compatibility
  items: NavItem[];
  icon?: any;
  roles?: string[];
  expanded?: boolean;
}

export interface SidebarProps {
  items?: NavCategory[];
  navItems?: NavItem[];
  navCategories?: NavCategory[];
  userRole?: 'user' | 'admin' | 'manager';
  expandedItems?: string[];
  onToggleExpand?: (label: string) => void;
  textColor?: string;
  textHoverColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
  hoverBgColor?: string;
  open?: boolean;
  onToggle?: () => void;
  homeItem?: NavItem;
  customFooterContent?: ReactNode;
  className?: string;
  removeBottomToggle?: boolean;
  showToggleButton?: boolean;
  initialState?: string;
  onStateChange?: (state: string) => void;
  useGlobalNavigation?: boolean;
}

export interface SidebarItemProps {
  item: NavItem;
  textColor?: string;
  textHoverColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
  hoverBgColor?: string;
  isActive?: boolean;
  onClick?: () => void;
  hasChildren?: boolean;
  isExpanded?: boolean;
}

export interface SidebarToggleButtonProps {
  collapsed?: boolean;
  onClick?: () => void;
  open?: boolean;
  onToggle?: () => void;
}
