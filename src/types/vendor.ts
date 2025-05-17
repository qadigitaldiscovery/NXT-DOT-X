
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
  company_name?: string;
  type: 'supplier' | 'vendor';
  creditRating?: string;
  creditRisk?: string;
  creditLimit?: string;
  localScore?: number;
  local_score?: number;  // Support both naming conventions
  status: 'active' | 'inactive';
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  contact?: string;
  description?: string;
  created_at?: string;
}

export interface VendorReport {
  id: string;
  vendor_id: string;
  file_path: string;
  fetched_at: string;
}

export interface SubScore {
  name: string;
  value: number;
  color: string;
}
