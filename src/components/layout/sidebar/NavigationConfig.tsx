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
    items: [
      { label: 'Dashboard', icon: Database, href: '/data-management', path: '/data-management' },
      { label: 'Supplier Directory', icon: Truck, href: '/data-management/suppliers', path: '/data-management/suppliers' },
      { label: 'Customer Directory', icon: Building, href: '/data-management/customers', path: '/data-management/customers' },
      { label: 'Supplier Costing', icon: Calculator, href: '/data-management/supplier-costing', path: '/data-management/supplier-costing' },
      { label: 'Cost Analysis', icon: BarChart3, href: '/data-management/cost-analysis', path: '/data-management/cost-analysis' },
      { label: 'Cost Management', icon: Database, href: '/data-management/cost-management', path: '/data-management/cost-management' },
      { label: 'Competitor Pricing', icon: LineChart, href: '/data-management/pricing/competitor-pricing', path: '/data-management/pricing/competitor-pricing' },
      { label: 'Price Management', icon: ArrowDownUp, href: '/data-management/pricing/price-management', path: '/data-management/pricing/price-management' },
      { label: 'File Uploads', icon: FileUp, href: '/data-management/uploads', path: '/data-management/uploads' },
      { label: 'Document Repository', icon: FileArchive, href: '/data-management/documents', path: '/data-management/documents' },
      { label: 'Export Data', icon: FileDown, href: '/data-management/export-data', path: '/data-management/export-data' },
      { 
        label: 'Data Platform Beta', 
        icon: BrainCircuit, 
        href: '/beta1', 
        path: '/beta1',
        children: [
          { label: 'Beta Dashboard', icon: Home, href: '/beta1', path: '/beta1' },
          { label: 'Beta Supplier Costing', icon: Calculator, href: '/beta1/supplier-costing', path: '/beta1/supplier-costing' },
          { label: 'Beta Cost Analysis', icon: BarChart3, href: '/beta1/cost-analysis', path: '/beta1/cost-analysis' },
          { label: 'Beta Uploads', icon: FileUp, href: '/beta1/uploads', path: '/beta1/uploads' },
          { label: 'Beta Suppliers', icon: Truck, href: '/beta1/suppliers', path: '/beta1/suppliers' },
          { label: 'Beta Documents', icon: FileText, href: '/beta1/documents', path: '/beta1/documents' },
          { label: 'Beta Data Management', icon: Database, href: '/beta1/data-management', path: '/beta1/data-management' },
          { label: 'Beta Settings', icon: Settings, href: '/beta1/settings', path: '/beta1/settings' }
        ]
      }
    ]
  },
  {
    label: "Loyalty Program",
    items: [
      { label: 'Dashboard', icon: Award, href: '/loyalty-rewards', path: '/loyalty-rewards' },
      { label: 'Members', icon: Users, href: '/loyalty-rewards/members', path: '/loyalty-rewards/members' },
      { label: 'Rewards', icon: Gift, href: '/loyalty-rewards/rewards', path: '/loyalty-rewards/rewards' },
      { label: 'Analytics', icon: BarChart3, href: '/loyalty-rewards/analytics', path: '/loyalty-rewards/analytics' },
      { label: 'Settings', icon: Settings, href: '/loyalty-rewards/settings', path: '/loyalty-rewards/settings' },
      { 
        label: 'Loyalty Platform Beta', 
        icon: BrainCircuit, 
        href: '/beta2', 
        path: '/beta2',
        children: [
          { label: 'Beta Dashboard', icon: Home, href: '/beta2', path: '/beta2' },
          { label: 'Beta Members', icon: Users, href: '/beta2/members', path: '/beta2/members' },
          { label: 'Beta Rewards', icon: Award, href: '/beta2/rewards', path: '/beta2/rewards' },
          { label: 'Beta Analytics', icon: BarChart3, href: '/beta2/analytics', path: '/beta2/analytics' },
          { label: 'Beta Settings', icon: Settings, href: '/beta2/settings', path: '/beta2/settings' }
        ]
      }
    ]
  },
  {
    label: "Tech Hub",
    items: [
      { label: 'AI Personas', icon: BrainCircuit, href: '/tech-hub/personas', path: '/tech-hub/personas' },
      { label: 'API Management', icon: Server, href: '/tech-hub/api-management', path: '/tech-hub/api-management' },
      { label: 'Cloud Services', icon: Cloud, href: '/tech-hub/cloud-services', path: '/tech-hub/cloud-services' }
    ]
  },
  {
    label: "Admin",
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
