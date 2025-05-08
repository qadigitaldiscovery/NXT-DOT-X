
import { Home, FileUp, BarChart3, LineChart, ArrowDownUp, FileDown, Settings, FileCode, Database, FileText, FileArchive } from 'lucide-react';
import { NavItem, NavCategory } from './types';

// Top level nav items (not in categories)
export const topLevelNavItems: NavItem[] = [
  { label: 'Dashboard', icon: Home, path: '/' }
];

// Organize remaining nav items into categories
export const navCategories: NavCategory[] = [
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
  }
];

// Settings item (for footer)
export const settingsItem: NavItem = { label: 'Settings', icon: Settings, path: '/settings' };
