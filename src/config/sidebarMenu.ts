
import {
  LayoutDashboard,
  Users,
  Package,
  TrendingUp,
  Settings,
  FileText,
  Calendar,
  BarChart3,
  Briefcase,
  UserCheck,
  Building,
  ShoppingCart,
  Globe
} from 'lucide-react';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: any;
  path?: string;
  items?: SidebarItem[];
}

export const sidebarMenuItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard'
  },
  {
    id: 'data-management',
    label: 'Data Management',
    icon: BarChart3,
    path: '/data-management'
  },
  {
    id: 'suppliers',
    label: 'Supplier Management',
    icon: Building,
    path: '/suppliers'
  },
  {
    id: 'customers',
    label: 'Customer Management',
    icon: Users,
    path: '/customers'
  },
  {
    id: 'vendors',
    label: 'Vendor Management',
    icon: Briefcase,
    path: '/vendors'
  },
  {
    id: 'projects',
    label: 'Project Management',
    icon: Calendar,
    path: '/projects'
  },
  {
    id: 'trading-system',
    label: 'Trading System',
    icon: TrendingUp,
    path: '/trading-system'
  },
  {
    id: 'loyalty-rewards',
    label: 'Loyalty & Rewards',
    icon: UserCheck,
    path: '/loyalty-rewards'
  },
  {
    id: 'social-media',
    label: 'Social Media',
    icon: Globe,
    path: '/social-media'
  },
  {
    id: 'brand-marketing',
    label: 'Brand Marketing',
    icon: Package,
    path: '/brand-marketing'
  },
  {
    id: 'tech-hub',
    label: 'Tech Hub',
    icon: Settings,
    path: '/tech-hub'
  },
  {
    id: 'dot-x',
    label: 'DOT-X',
    icon: ShoppingCart,
    path: '/dot-x'
  },
  {
    id: 'admin',
    label: 'Administration',
    icon: Settings,
    path: '/admin'
  }
];
