
export interface Vendor {
  id: string;
  company_name: string;
  local_score: number | null;
  created_at: string;
}

export interface CreditRating {
  id: number;
  vendor_id: string;
  rating_code: 'A' | 'B' | 'C' | 'D' | 'E';
  description: string;
  credit_limit: number;
  fetched_at: string | null;
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

export interface VendorWithDetails extends Vendor {
  credit_ratings: CreditRating[];
  vendor_performance: VendorPerformance[];
  vendor_reports: VendorReport[];
}

export interface TabItem {
  key: string;
  label: string;
  icon: React.FC;
  permissions?: string[];
}

export interface SidebarItem {
  key: string;
  label: string;
  path: string;
  icon: React.FC<any>;
  permissions?: string[];
  children?: SidebarItem[];
}

export interface SubScore {
  paymentTimeliness: number;
  financialHealth: number;
  operationalStability: number;
}
