
import { Home, FileUp, BarChart3, LineChart, ArrowDownUp, FileDown, Settings } from 'lucide-react';
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
      { label: 'Supplier Costing', icon: FileUp, path: '/supplier-costing' },
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
      { label: 'Export Data', icon: FileDown, path: '/export-data' }
    ]
  }
];

// Settings item (for footer)
export const settingsItem: NavItem = { label: 'Settings', icon: Settings, path: '/settings' };
