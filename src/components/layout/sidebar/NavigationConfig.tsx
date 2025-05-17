import { Home, FileUp, BarChart3, LineChart, ArrowDownUp, FileDown, Settings, Database, FileArchive, BookOpen, BrainCircuit, Cloud, Server, Users, Truck, UserCog, Shield, Globe, Building, AlertTriangle, Calculator, FileText, Award, Gift } from 'lucide-react';
import { NavItem, NavCategory } from './types';

// Top level nav items (not in categories)
export const topLevelNavItems: NavItem[] = [
  { label: 'Dashboard', icon: Home, href: '/', path: '/' }
];

// Organize remaining nav items into categories
export const navCategories: NavCategory[] = [
  {
    label: "Data Management",
    name: "Data Management",
    items: [
      { label: 'Dashboard', icon: Database, href: '/data-management', path: '/data-management' },
      { label: 'Supplier Directory', icon: Truck, href: '/data-management/suppliers', path: '/data-management/suppliers' },
      { label: 'Vendor Directory', icon: Building, href: '/vendors', path: '/vendors' },
      { label: 'Vendor Reports', icon: FileText, href: '/vendors/reports', path: '/vendors/reports' },
      { label: 'Vendor Contacts', icon: Users, href: '/vendors/contacts', path: '/vendors/contacts' },
      { label: 'Vendor & Supplier Comparison', icon: ArrowDownUp, href: '/data-management/vendor-supplier-comparison', path: '/data-management/vendor-supplier-comparison' },
      { label: 'Customer Directory', icon: Building, href: '/data-management/customers', path: '/data-management/customers' },
      { label: 'Supplier Costing', icon: Calculator, href: '/data-management/supplier-costing', path: '/data-management/supplier-costing' },
      { label: 'Cost Analysis', icon: BarChart3, href: '/data-management/cost-analysis', path: '/data-management/cost-analysis' },
      { label: 'Cost Management', icon: Database, href: '/data-management/cost-management', path: '/data-management/cost-management' },
      { label: 'Competitor Pricing', icon: LineChart, href: '/data-management/pricing/competitor-pricing', path: '/data-management/pricing/competitor-pricing' },
      { label: 'Price Management', icon: ArrowDownUp, href: '/data-management/pricing/price-management', path: '/data-management/pricing/price-management' },
      { label: 'File Uploads', icon: FileUp, href: '/data-management/uploads', path: '/data-management/uploads' },
      { label: 'Document Repository', icon: FileArchive, href: '/data-management/documents', path: '/data-management/documents' },
      { label: 'Export Data', icon: FileDown, href: '/data-management/export-data', path: '/data-management/export-data' },
      { label: 'Data Insights', icon: BrainCircuit, href: '/data-management/insights', path: '/data-management/insights' },
      { label: 'Data Connections', icon: Server, href: '/data-management/connections', path: '/data-management/connections' },
      { label: 'Data Management Settings', icon: Settings, href: '/data-management/settings', path: '/data-management/settings' }
    ]
  },
  {
    label: "Loyalty Program",
    name: "Loyalty Program",
    items: [
      { label: 'Dashboard', icon: Award, href: '/loyalty-rewards', path: '/loyalty-rewards' },
      { label: 'Members', icon: Users, href: '/loyalty-rewards/members', path: '/loyalty-rewards/members' },
      { label: 'Rewards', icon: Gift, href: '/loyalty-rewards/rewards', path: '/loyalty-rewards/rewards' },
      { label: 'Analytics', icon: BarChart3, href: '/loyalty-rewards/analytics', path: '/loyalty-rewards/analytics' },
      { label: 'Settings', icon: Settings, href: '/loyalty-rewards/settings', path: '/loyalty-rewards/settings' }
    ]
  },
  {
    label: "Tech Hub",
    name: "Tech Hub",
    items: [
      { label: 'AI Personas', icon: BrainCircuit, href: '/tech-hub/personas', path: '/tech-hub/personas' },
      { label: 'API Management', icon: Server, href: '/tech-hub/api-management', path: '/tech-hub/api-management' },
      { label: 'Cloud Services', icon: Cloud, href: '/tech-hub/cloud-services', path: '/tech-hub/cloud-services' }
    ]
  },
  {
    label: "Admin",
    name: "Admin",
    items: [
      { label: 'User Management', icon: Users, href: '/admin/users', path: '/admin/users' },
      { label: 'Customer Management', icon: Building, href: '/admin/customers', path: '/admin/customers' },
      { label: 'Roles & Permissions', icon: UserCog, href: '/admin/roles', path: '/admin/roles' },
      { label: 'Security', icon: Shield, href: '/admin/security', path: '/admin/security' },
      { label: 'Reporting', icon: BarChart3, href: '/admin/reporting', path: '/admin/reporting' },
      { label: 'Localization', icon: Globe, href: '/admin/localization', path: '/admin/localization' },
      { label: 'Documentation', icon: BookOpen, href: '/admin/documentation', path: '/admin/documentation' },
      { label: 'Database Admin', icon: Database, href: '/admin/database', path: '/admin/database' },
      { label: 'System Settings', icon: Settings, href: '/admin/system-settings', path: '/admin/system-settings' },
      { label: 'RAG Dashboard', icon: AlertTriangle, href: '/dashboard/rag', path: '/dashboard/rag' }
    ]
  }
];

// Settings item (for footer)
export const settingsItem: NavItem = { label: 'Settings', icon: Settings, href: '/settings', path: '/settings' };

// Home item for master dashboard (to be placed at the bottom of specialized layouts)
export const masterDashItem: NavItem = { label: 'Master Dashboard', icon: Home, href: '/', path: '/' };
