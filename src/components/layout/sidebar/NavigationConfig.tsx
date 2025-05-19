
import { Home, Settings, Database, Store, UserSquare2, DollarSign, PieChart, ArrowDownUp } from 'lucide-react';
import { NavItem, NavCategory } from './types';

// Top level nav items (not in categories)
export const topLevelNavItems: NavItem[] = [
  { 
    label: 'DATA MANAGEMENT DASHBOARD', 
    icon: Home, 
    href: '/data-management', 
    path: '/data-management' 
  }
];

// Organize remaining nav items into categories
export const navCategories: NavCategory[] = [
  {
    label: "DIRECTORIES",
    name: "Directories",
    items: [
      { 
        label: 'SUPPLIER DIRECTORY', 
        icon: Store, 
        href: '/data-management/suppliers', 
        path: '/data-management/suppliers' 
      },
      { 
        label: 'CUSTOMER DIRECTORY', 
        icon: UserSquare2, 
        href: '/data-management/customers', 
        path: '/data-management/customers' 
      }
    ]
  },
  {
    label: "COST MANAGEMENT",
    name: "Cost Management",
    items: [
      { 
        label: 'Suppliers Costing', 
        icon: DollarSign, 
        href: '/data-management/supplier-costing', 
        path: '/data-management/supplier-costing' 
      },
      { 
        label: 'Cost Analysis', 
        icon: PieChart, 
        href: '/data-management/cost-analysis', 
        path: '/data-management/cost-analysis' 
      }
    ]
  },
  {
    label: "PRICING",
    name: "Pricing",
    items: [
      { 
        label: 'Price Management', 
        icon: ArrowDownUp, 
        href: '/data-management/pricing/price-management', 
        path: '/data-management/pricing/price-management' 
      }
    ]
  },
  {
    label: "CORE ADMIN",
    name: "Core Admin",
    items: [
      { 
        label: 'Data Connections', 
        icon: Database, 
        href: '/data-management/connections', 
        path: '/data-management/connections' 
      },
      { 
        label: 'Data Management Settings', 
        icon: Settings, 
        href: '/data-management/settings', 
        path: '/data-management/settings' 
      }
    ]
  }
];

// Settings item (for footer)
export const settingsItem: NavItem = { 
  label: 'Settings', 
  icon: Settings, 
  href: '/settings', 
  path: '/settings' 
};

// Home item for master dashboard
export const masterDashItem: NavItem = { 
  label: 'Master Dashboard', 
  icon: Home, 
  href: '/', 
  path: '/' 
};
