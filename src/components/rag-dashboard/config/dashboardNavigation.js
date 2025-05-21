import { AlertTriangle, BarChart3, Bell, Settings } from 'lucide-react';
export const ragDashboardNavigation = [
    {
        name: "RAG Dashboard",
        label: "RAG Dashboard",
        items: [
            { label: "Overview", path: "/dashboard/rag", icon: AlertTriangle },
            { label: "Alerts Center", path: "/dashboard/rag/alerts", icon: Bell },
            { label: "Analytics", path: "/dashboard/rag/analytics", icon: BarChart3 },
            { label: "Settings", path: "/dashboard/rag/settings", icon: Settings }
        ]
    }
];
