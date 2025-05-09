
import { Home, FileUp, BarChart3, LineChart, ArrowDownUp, FileDown, Settings, Database, FileArchive, BookOpen, BrainCircuit, Cloud, Bot, Users } from 'lucide-react';
import { NavItem, NavCategory } from './types';

// Top level nav items (not in categories)
export const topLevelNavItems: NavItem[] = [
  { label: 'Dashboard', icon: Home, path: '/' }
];

// Organize remaining nav items into categories
export const navCategories: NavCategory[] = [
  {
    name: "Supplier Management",
    items: [
      { label: 'Supplier Dashboard', icon: Database, path: '/supplier-management' },
      { label: 'Supplier Directory', icon: Users, path: '/supplier-management/directory' },
      { label: 'Supplier Settings', icon: Settings, path: '/supplier-management/settings' }
    ]
  },
  {
    name: "Cost Management",
    items: [
      { label: 'Supplier Costing', icon: Database, path: '/supplier-costing' },
      { label: 'Cost Analysis', icon: BarChart3, path: '/cost-analysis' }
    ]
  },
  {
    name: "Pricing",
    items: [
      { label: 'Competitor Pricing', icon: LineChart, path: '/competitor-pricing' },
      { label: 'Price Management', icon: ArrowDownUp, path: '/price-management' }
    ]
  },
  {
    name: "Data",
    items: [
      { label: 'File Uploads', icon: FileUp, path: '/data-management/uploads' },
      { label: 'Document Repository', icon: FileArchive, path: '/data-management/documents' },
      { label: 'Export Data', icon: FileDown, path: '/export-data' }
    ]
  },
  {
    name: "Tech Hub",
    items: [
      { label: 'AI Personas', icon: BrainCircuit, path: '/tech-hub/personas' },
      { label: 'API Management', icon: Bot, path: '/tech-hub/api-management' },
      { label: 'Cloud Services', icon: Cloud, path: '/tech-hub/cloud-services' }
    ]
  },
  {
    name: "Admin",
    items: [
      { label: 'Documentation', icon: BookOpen, path: '/admin/documentation' }
    ]
  }
];

// Settings item (for footer)
export const settingsItem: NavItem = { label: 'Settings', icon: Settings, path: '/settings' };

// Home item for master dashboard (to be placed at the bottom of specialized layouts)
export const masterDashItem: NavItem = { label: 'Master Dashboard', icon: Home, path: '/' };
