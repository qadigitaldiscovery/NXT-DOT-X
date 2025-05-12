
import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  Home, 
  Award, 
  BarChart3, 
  BadgePercent, 
  TrendingUp, 
  Search, 
  Settings,
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import SharedDashboardLayout from "./SharedDashboardLayout";
import { NavCategory } from "./sidebar/types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const BrandMarketingLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  // Custom footer with navigation controls
  const navigationFooter = (
    <div className="flex items-center justify-between p-2 bg-indigo-950">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(-1)}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate('/')}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg"
      >
        <Home className="h-5 w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(1)}
        className="text-blue-200 hover:text-white hover:bg-indigo-900 rounded-lg"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );

  return (
    <SharedDashboardLayout
      moduleTitle="Brand Marketing"
      navCategories={navCategories}
      customFooterContent={navigationFooter}
      sidebarClassName="bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950"
      removeBottomToggle={false}
      showTopLeftToggle={true}
    >
      <Outlet />
    </SharedDashboardLayout>
  );
};

export default BrandMarketingLayout;
