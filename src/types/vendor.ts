
import { LucideIcon } from 'lucide-react';

export interface SidebarItem {
  key: string;
  label: string;
  path: string;
  icon: LucideIcon;
  permissions?: string[];
  children?: SidebarItem[];
}

export interface TabItem {
  key: string;
  label: string;
  icon?: LucideIcon;
}

export interface Vendor {
  id: string;
  name: string;
  type: 'supplier' | 'vendor';
  creditRating?: string;
  creditRisk?: string;
  creditLimit?: string;
  localScore?: number;
  status: 'active' | 'inactive';
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  contact?: string;
  description?: string;
}
