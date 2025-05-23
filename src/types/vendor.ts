
export interface SidebarItem {
  id: string;
  label: string;
  icon?: any;
  path?: string;
}

export interface TabItem {
  id: string;
  label: string;
  icon?: any;
  content: React.ReactNode;
}

export interface SubScore {
  category: string;
  score: number;
  weight: number;
}

export interface VendorReport {
  id: string;
  title: string;
  created_at: string;
  file_url: string;
  type: string;
}

export interface VendorDetail {
  id: string;
  company_name: string;
  local_score: number;
  created_at: string;
  sub_scores?: SubScore[];
}
