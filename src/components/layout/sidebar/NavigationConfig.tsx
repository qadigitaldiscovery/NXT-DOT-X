import { Home, FileUp, BarChart3, LineChart, ArrowDownUp, FileDown, Settings, Database, FileArchive, BookOpen, BrainCircuit, Cloud, Server, Users, Truck, UserCog, Shield, Globe, Building, AlertTriangle, Calculator, FileText, Award, FolderOpen, Store, UserSquare2, DollarSign, PieChart, FileBarChart, BookOpenCheck, Cog } from 'lucide-react';
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
        label: 'Competitor Pricing', 
        icon: FileBarChart, 
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
        icon: FolderOpen, 
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
        icon: BookOpenCheck, 
        href: '/data-management/business-rules', 
        path: '/data-management/business-rules' 
      },
      { 
        label: 'Strategy & Decisions', 
        icon: Award, 
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
        icon: Cog, 
        href: '/data-management/settings', 
        path: '/data-management/settings' 
      },
      { 
        label: 'System Admin Console', 
        icon: Shield, 
        href: '/admin/system', 
        path: '/admin/system' 
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
