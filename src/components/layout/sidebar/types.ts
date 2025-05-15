
export interface NavItem {
  label: string;
  href?: string;
  path?: string;  // For backward compatibility
  icon?: any;
  roles?: string[];
  activeMatchPattern?: string;
}

export interface NavCategory {
  label: string;
  items: NavItem[];
  icon?: any;
  roles?: string[];
  expanded?: boolean;
}

export interface SidebarProps {
  items: NavCategory[];
  userRole?: 'user' | 'admin' | 'manager';
  expandedItems?: string[];
  onToggleExpand?: (label: string) => void;
  textColor?: string;
  textHoverColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
  hoverBgColor?: string;
}

export interface SidebarItemProps {
  item: NavItem;
  textColor?: string;
  textHoverColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
  hoverBgColor?: string;
}

export interface SidebarToggleButtonProps {
  collapsed: boolean;
  onClick: () => void;
}
