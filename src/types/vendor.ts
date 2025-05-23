
export interface SidebarItem {
  id: string;
  title: string;
  icon?: React.ComponentType<any>;
  path: string;
  children?: SidebarItem[];
}

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface Vendor {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  rating?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  localScore?: number;
  website?: string;
}

export interface VendorTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface VendorReport {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  fileUrl: string;
}
