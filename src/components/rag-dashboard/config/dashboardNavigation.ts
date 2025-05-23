
import { NavCategory } from '@/components/layout/sidebar/types';
import { Activity, AlertTriangle, BarChart3, LineChart, Settings } from 'lucide-react';

export const ragDashboardNavigation: NavCategory[] = [
  {
    name: "RAG Dashboard",
    label: "RAG Dashboard", 
    items: [
      { label: "Overview", path: "/dashboard/rag", icon: BarChart3 },
      { label: "Analytics", path: "/dashboard/rag/analytics", icon: LineChart },
      { label: "Alerts", path: "/dashboard/rag/alerts", icon: AlertTriangle },
      { label: "Settings", path: "/dashboard/rag/settings", icon: Settings, roles: ["admin"] }
    ]
  }
];
