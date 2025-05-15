
import { IconType } from 'react-icons';
import { LucideIcon } from 'lucide-react';

export interface Vendor {
  id: string;
  company_name: string;
  local_score?: number;
  created_at?: string;
}

export interface VendorWithDetails extends Vendor {
  credit_ratings?: CreditRating[];
  vendor_reports?: VendorReport[];
  performance_data?: VendorPerformance[];
}

export interface CreditRating {
  id: number;
  vendor_id: string;
  rating_code: 'A' | 'B' | 'C' | 'D' | 'E';
  description: string;
  credit_limit: number;
  fetched_at: string;
}

export interface VendorPerformance {
  id: number;
  vendor_id: string;
  date: string;
  score: number;
}

export interface VendorReport {
  id: string;
  vendor_id: string;
  file_path: string;
  fetched_at: string;
}

export interface TabItem {
  key: string;
  label: string;
  icon: LucideIcon;
}

export interface SidebarItem {
  key: string;
  label: string;
  path: string;
  icon: LucideIcon;
  permissions?: string[];
  children?: SidebarItem[];
}

export interface SubScore {
  paymentTimeliness: number;
  financialHealth: number;
  operationalStability: number;
}
