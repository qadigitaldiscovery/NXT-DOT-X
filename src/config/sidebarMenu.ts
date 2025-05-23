
import { 
  Home, Users, FileText, BarChart3, Settings, 
  Box, Truck, Building, ShoppingCart, Layers,
  Clock, Shield, AlertTriangle, FileCheck
} from 'lucide-react';
import type { SidebarItem } from '@/types/vendor';

export const sidebarMenu: SidebarItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: Home,
    path: "/vendors/dashboard",
  },
  {
    id: "suppliers",
    title: "Suppliers",
    icon: Truck,
    path: "/vendors/suppliers",
  },
  {
    id: "customers",
    title: "Customers",
    icon: Users,
    path: "/vendors/customers",
  },
  {
    id: "contracts",
    title: "Contracts",
    icon: FileText,
    path: "/vendors/contracts",
  },
  {
    id: "spend",
    title: "Spend Analysis",
    icon: BarChart3,
    path: "/vendors/spend",
  },
  {
    id: "products",
    title: "Products",
    icon: Box,
    path: "/vendors/products",
  },
  {
    id: "inventory",
    title: "Inventory",
    icon: Layers,
    path: "/vendors/inventory",
  },
  {
    id: "orders",
    title: "Orders",
    icon: ShoppingCart,
    path: "/vendors/orders",
  },
  {
    id: "organizations",
    title: "Organizations",
    icon: Building,
    path: "/vendors/organizations",
  },
  {
    id: "history",
    title: "History",
    icon: Clock,
    path: "/vendors/history",
  },
  {
    id: "risk",
    title: "Risk Management",
    icon: AlertTriangle,
    path: "/vendors/risk",
  },
  {
    id: "compliance",
    title: "Compliance",
    icon: Shield,
    path: "/vendors/compliance",
  },
  {
    id: "reports",
    title: "Reports",
    icon: FileCheck,
    path: "/vendors/reports",
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    path: "/vendors/settings",
  }
];
