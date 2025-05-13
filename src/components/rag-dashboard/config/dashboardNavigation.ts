
import { NavCategory } from '@/components/layout/sidebar/types';
import { BarChart3, LineChart, AlertTriangle, Settings } from 'lucide-react';

// Define navigation categories for the RAG Dashboard module
export const ragDashboardNavigation: NavCategory[] = [
  {
    name: "RAG Dashboard",
    items: [
      { label: "Overview", path: "/dashboard/rag", icon: BarChart3 },
      { label: "Analytics", path: "/dashboard/rag/analytics", icon: LineChart },
      { label: "Alerts", path: "/dashboard/rag/alerts", icon: AlertTriangle },
      { label: "Settings", path: "/dashboard/rag/settings", icon: Settings, roles: ["admin"] }
    ]
  }
];
