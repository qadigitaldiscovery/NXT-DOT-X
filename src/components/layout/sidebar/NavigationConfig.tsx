
import { Home, FileUp, BarChart3, LineChart, ArrowDownUp, FileDown, Settings, Database, FileArchive, BookOpen, BrainCircuit, Cloud, Server, Users, Truck, UserCog, Shield, Globe, Building, AlertTriangle } from 'lucide-react';
import { NavItem, NavCategory } from './types';

// Top level nav items (not in categories)
export const topLevelNavItems: NavItem[] = [
  { label: 'Dashboard', icon: Home, path: '/' }
];

// Organize remaining nav items into categories
export const navCategories: NavCategory[] = [
  {
    name: "Data Management",
    items: [
      { label: 'Dashboard', icon: Database, path: '/data-management' },
      { label: 'Supplier Directory', icon: Truck, path: '/data-management/suppliers' },
      { label: 'Customer Directory', icon: Building, path: '/data-management/customers' },
      { label: 'Supplier Costing', icon: BarChart3, path: '/data-management/supplier-costing' },
      { label: 'Cost Analysis', icon: BarChart3, path: '/data-management/cost-analysis' },
      { label: 'Cost Management', icon: Database, path: '/data-management/cost-management' },
      { label: 'Competitor Pricing', icon: LineChart, path: '/data-management/pricing/competitor-pricing' },
      { label: 'Price Management', icon: ArrowDownUp, path: '/data-management/pricing/price-management' },
      { label: 'File Uploads', icon: FileUp, path: '/data-management/uploads' },
      { label: 'Document Repository', icon: FileArchive, path: '/data-management/documents' },
      { label: 'Export Data', icon: FileDown, path: '/data-management/export-data' }
    ]
  },
  {
    name: "Tech Hub",
    items: [
      { label: 'AI Personas', icon: BrainCircuit, path: '/tech-hub/personas' },
      { label: 'API Management', icon: Server, path: '/tech-hub/api-management' },
      { label: 'Cloud Services', icon: Cloud, path: '/tech-hub/cloud-services' }
    ]
  },
  {
    name: "Admin",
    items: [
      { label: 'User Management', icon: Users, path: '/admin/users' },
      { label: 'Customer Management', icon: Building, path: '/admin/customers' },
      { label: 'Roles & Permissions', icon: UserCog, path: '/admin/roles' },
      { label: 'Security', icon: Shield, path: '/admin/security' },
      { label: 'Reporting', icon: BarChart3, path: '/admin/reporting' },
      { label: 'Localization', icon: Globe, path: '/admin/localization' },
      { label: 'Documentation', icon: BookOpen, path: '/admin/documentation' },
      { label: 'Database Admin', icon: Database, path: '/admin/database' },
      { label: 'System Settings', icon: Settings, path: '/admin/system-settings' },
      { label: 'RAG Dashboard', icon: AlertTriangle, path: '/dashboard/rag' }
    ]
  }
];

// Settings item (for footer)
export const settingsItem: NavItem = { label: 'Settings', icon: Settings, path: '/settings' };

// Home item for master dashboard (to be placed at the bottom of specialized layouts)
export const masterDashItem: NavItem = { label: 'Master Dashboard', icon: Home, path: '/' };
