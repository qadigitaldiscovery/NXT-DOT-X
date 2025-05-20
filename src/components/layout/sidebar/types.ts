
export interface NavItem {
  label: string;
  path?: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  activeMatchPattern?: string | RegExp;
  onClick?: () => void;
  roles?: string[];
  children?: NavItem[];
}

export interface NavCategory {
  name: string;
  label?: string;
  items: NavItem[];
}
