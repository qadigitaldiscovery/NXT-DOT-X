
import { ReactElement } from 'react';

export interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  roles?: string[]; // Optional: allowed roles for visibility
}

export interface NavCategory {
  name: string;
  items: NavItem[];
}

export interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}
