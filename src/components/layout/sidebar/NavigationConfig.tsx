import { 
  LayoutDashboard, 
  Building, 
  Users, 
  Calculator,
  BarChart3,
  ArrowDownUp,
  LineChart,
  FileArchive,
  BrainCircuit,
  FileDown,
  Settings,
  Database,
  BookOpen,
  FileCog,
  ServerCog
} from 'lucide-react';
import { NavItem, NavCategory } from './types';

// Top level nav items (not in categories)
export const topLevelNavItems: NavItem[] = [
  { 
    label: 'DATA MANAGEMENT DASHBOARD', 
    icon: LayoutDashboard, 
    href: '/data-management', 
    path: '/data-management' 
  }
];

// Organize navigation items into categories
export const navCategories: NavCategory[] = [
  {
    label: "DIRECTORIES",
    name: "Directories",
    items: [
      { 
        label: 'SUPPLIER DIRECTORY', 
        icon: Building, 
        href: '/data-management/suppliers', 
        path: '/data-management/suppliers' 
      },
      { 
        label: 'CUSTOMER DIRECTORY', 
        icon: Users, 
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
        icon: Calculator, 
        href: '/data-management/supplier-costing', 
        path: '/data-management/supplier-costing' 
      },
      { 
        label: 'Cost Analysis', 
        icon: BarChart3, 
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
        label: 'Competitor Pricing', 
        icon: LineChart, 
        href: '/data-management/pricing/competitor-pricing', 
        path: '/data-management/pricing/competitor-pricing' 
      },
      { 
        label: 'Price Management', 
        icon: ArrowDownUp, 
        href: '/data-management/pricing/price-management', 
        path: '/data-management/pricing/price-management' 
      }
    ]
  },
  {
    label: "DATA ANALYTICS",
    name: "Data Analytics",
    items: [
      { 
        label: 'Data Insights', 
        icon: BrainCircuit, 
        href: '/data-management/insights', 
        path: '/data-management/insights' 
      },
      { 
        label: 'Export Data', 
        icon: FileDown, 
        href: '/data-management/export-data', 
        path: '/data-management/export-data' 
      },
      { 
        label: 'Document Repository', 
        icon: FileArchive, 
        href: '/data-management/documents', 
        path: '/data-management/documents' 
      }
    ]
  },
  {
    label: "BUSINESS RULES AND KEY NOTES",
    name: "Business Rules",
    items: [
      { 
        label: 'Key Business Rules & Operations', 
        icon: BookOpen, 
        href: '/data-management/business-rules', 
        path: '/data-management/business-rules' 
      },
      { 
        label: 'Strategy & Decisions', 
        icon: FileCog, 
        href: '/data-management/strategy', 
        path: '/data-management/strategy' 
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
      },
      { 
        label: 'System Admin Console', 
        icon: ServerCog, 
        href: '/data-management/admin-console', 
        path: '/data-management/admin-console' 
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
  icon: LayoutDashboard, 
  href: '/', 
  path: '/' 
};
