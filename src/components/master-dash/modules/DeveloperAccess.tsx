
import React from 'react';
import { ModuleCard } from '../ModuleCard';
import { FolderOpen } from 'lucide-react';

// This component provides a single access point to all 
// pages that are not currently linked in the main navigation
export const DeveloperAccess: React.FC = () => {
  // Group all the features by category
  const allFeatures = [
    // Beta Modules
    { 
      name: "Beta1 Dashboard", 
      path: "/beta1/dashboard", 
      category: "Beta" 
    },
    { 
      name: "Beta2 Dashboard", 
      path: "/beta2/dashboard", 
      category: "Beta" 
    },
    { 
      name: "Dashboard V2", 
      path: "/dashboard/v2", 
      category: "Beta" 
    },
    
    // Auto Generated Pages
    { 
      name: "AI Extract", 
      path: "/ai-extract", 
      category: "Auto" 
    },
    { 
      name: "Categories", 
      path: "/categories", 
      category: "Auto" 
    },
    { 
      name: "Contracts", 
      path: "/contracts", 
      category: "Auto" 
    },
    { 
      name: "Entities", 
      path: "/entities", 
      category: "Auto" 
    },
    { 
      name: "Events", 
      path: "/events", 
      category: "Auto" 
    },
    { 
      name: "Files", 
      path: "/files", 
      category: "Auto" 
    },
    { 
      name: "Requests", 
      path: "/requests", 
      category: "Auto" 
    },
    { 
      name: "Risk Register", 
      path: "/risk-register", 
      category: "Auto" 
    },
    { 
      name: "Scorecards", 
      path: "/scorecards", 
      category: "Auto" 
    },
    { 
      name: "Workflows", 
      path: "/workflows", 
      category: "Auto" 
    },
    
    // Data Management
    { 
      name: "Data Connections", 
      path: "/data-management/connections", 
      category: "Data" 
    },
    { 
      name: "Business Rules", 
      path: "/data-management/business-rules", 
      category: "Data" 
    },
    { 
      name: "Strategy", 
      path: "/data-management/strategy", 
      category: "Data" 
    },
    { 
      name: "Export Data", 
      path: "/data-management/export-data", 
      category: "Data" 
    },
    { 
      name: "Data Insights", 
      path: "/data-management/insights", 
      category: "Data" 
    },
    
    // Vendor System
    { 
      name: "Vendors", 
      path: "/vendors", 
      category: "Vendor" 
    },
    { 
      name: "Vendor Detail", 
      path: "/vendors/1", 
      category: "Vendor" 
    },
    
    // Admin
    { 
      name: "Database Admin", 
      path: "/admin/database", 
      category: "Admin" 
    },
    { 
      name: "Documentation", 
      path: "/admin/documentation", 
      category: "Admin" 
    },
    { 
      name: "Module Access", 
      path: "/admin/module-access", 
      category: "Admin" 
    },
    
    // Tech Hub
    { 
      name: "Personas Hub", 
      path: "/tech-hub/personas", 
      category: "Tech" 
    },
    { 
      name: "Odoo Integration", 
      path: "/tech-hub/integrations/odoo", 
      category: "Tech" 
    },
    { 
      name: "WooCommerce", 
      path: "/tech-hub/integrations/woocommerce", 
      category: "Tech" 
    },
    { 
      name: "BlackBox AI", 
      path: "/tech-hub/cloud-services/blackbox-ai", 
      category: "Tech" 
    },
    
    // DOT-X
    { 
      name: "DOT-X Dashboard", 
      path: "/dot-x", 
      category: "DOT-X" 
    },
    { 
      name: "DOT-X-2", 
      path: "/dot-x/dot-x-2", 
      category: "DOT-X" 
    },
    { 
      name: "DOT-X API", 
      path: "/dot-x/api", 
      category: "DOT-X" 
    },
    { 
      name: "DOT-X Data Services", 
      path: "/dot-x/data-services", 
      category: "DOT-X" 
    },
    { 
      name: "DOT-X Plugins", 
      path: "/dot-x/plugins", 
      category: "DOT-X" 
    },
    { 
      name: "DOT-X Settings", 
      path: "/dot-x/settings", 
      category: "DOT-X" 
    },
    
    // Social Media
    { 
      name: "Social Media Dashboard", 
      path: "/social-media", 
      category: "Social" 
    },
    { 
      name: "Social Media Accounts", 
      path: "/social-media/accounts", 
      category: "Social" 
    },
    { 
      name: "Social Media Calendar", 
      path: "/social-media/calendar", 
      category: "Social" 
    },
    { 
      name: "Social Media Engagement", 
      path: "/social-media/engagement", 
      category: "Social" 
    },
    { 
      name: "Social Media Settings", 
      path: "/social-media/settings", 
      category: "Social" 
    },
    
    // Trading System
    { 
      name: "Trading System Dashboard", 
      path: "/trading-system", 
      category: "Trading" 
    },
    { 
      name: "Trading System Trades", 
      path: "/trading-system/trades", 
      category: "Trading" 
    },
    { 
      name: "Trading System Analytics", 
      path: "/trading-system/analytics", 
      category: "Trading" 
    },
    { 
      name: "Trading System History", 
      path: "/trading-system/history", 
      category: "Trading" 
    },
    { 
      name: "Trading System Settings", 
      path: "/trading-system/settings", 
      category: "Trading" 
    },
  ];

  return (
    <ModuleCard
      title="Developer Access Hub"
      icon={<FolderOpen className="h-8 w-8" />}
      variant="accent"
      features={allFeatures}
      allAccess={true}
      className="col-span-full md:col-span-1 h-full"
    />
  );
};
