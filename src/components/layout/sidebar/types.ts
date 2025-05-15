
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  icon: LucideIcon | IconType;
  href?: string;   // For backward compatibility
  path?: string;   // For new components using path
  children?: NavItem[];
  roles?: string[];
  divider?: boolean;
  activeMatchPattern?: RegExp | string;
}

export interface NavCategory {
  name: string;
  items: NavItem[];
}

export interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  navItems?: NavCategory[];
  homeItem?: NavItem;
  customFooterContent?: ReactNode;
  className?: string;
  removeBottomToggle?: boolean;
}

export interface SidebarNavListProps {
  items?: NavItem[];
  userRole?: string;
  expandedItems: string[];
  onToggleExpand: (label: string) => void;
  textColor: string;
  textHoverColor: string;
  activeBgColor: string;
  activeTextColor: string;
  hoverBgColor: string;
  navItems?: NavCategory[];
}

export interface SidebarItemProps {
  item: NavItem;
  isActive: boolean;
  onClick?: () => void;
  textColor: string;
  textHoverColor: string;
  activeBgColor: string;
  activeTextColor: string;
  hoverBgColor: string;
  hasChildren?: boolean;
  isExpanded?: boolean;
}

export interface SidebarToggleButtonProps {
  open: boolean;
  onToggle: () => void;
}
