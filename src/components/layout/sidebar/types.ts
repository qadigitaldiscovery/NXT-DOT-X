
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NavCategory {
  name: string;
  items: NavItem[];
}
