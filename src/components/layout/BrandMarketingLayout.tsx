
import React from "react";
import { Outlet } from "react-router-dom";
import { 
  Home, 
  Award, 
  BarChart3, 
  BadgePercent, 
  TrendingUp, 
  Search, 
  Settings,
  MessageCircle,
  Globe
} from "lucide-react";
import SharedDashboardLayout from "./SharedDashboardLayout";
import { NavCategory } from "./sidebar/types";

const BrandMarketingLayout = () => {
  // Define navigation categories for the Brand Marketing module
  const navCategories: NavCategory[] = [
    {
      name: "Brand Management",
      items: [
        { label: "Brand Dashboard", path: "/brand-marketing", icon: Award },
        { label: "Brand Analytics", path: "/brand-marketing/analytics", icon: BarChart3 },
        { label: "Trust Analysis", path: "/brand-marketing/trust-analysis", icon: BadgePercent },
        { label: "Market Perception", path: "/brand-marketing/market-perception", icon: TrendingUp },
        { label: "SEO & Keywords", path: "/brand-marketing/seo", icon: Search },
        { label: "Requesty AI", path: "/brand-marketing/requesty", icon: MessageCircle }
      ]
    },
    {
      name: "Configuration",
      items: [
        { label: "Brand Settings", path: "/brand-marketing/settings", icon: Settings }
      ]
    }
  ];

  return (
    <SharedDashboardLayout
      moduleTitle="Brand Marketing"
      navCategories={navCategories}
      homeItem={{ label: "Master Dashboard", path: "/", icon: Home }}
    >
      <Outlet />
    </SharedDashboardLayout>
  );
};

export default BrandMarketingLayout;
