
import { useState, useEffect } from "react";
import { ModuleCard } from "../ModuleCard";
import { Card } from "@/components/ui/card";
import { 
  Database, Users, LineChart, Code, Briefcase, Share2, Award, Layers, 
  BarChart3, Building, Shield, Settings, Activity, Zap
} from "lucide-react";

interface PrimaryModulesProps {
  activeTab?: string;
  searchQuery?: string;
}

export default function PrimaryModules({ activeTab = "all", searchQuery = "" }: PrimaryModulesProps) {
  // Define all modules with their metadata
  const allModules = [
    { 
      category: "data", 
      path: "/data-management", 
      name: "Data Management",
      icon: <Database className="h-8 w-8" />,
      variant: "default" as const,
    },
    { 
      category: "marketing", 
      path: "/loyalty-rewards", 
      name: "Loyalty Program",
      icon: <Award className="h-8 w-8" />,
      variant: "default" as const,
    },
    { 
      category: "operations", 
      path: "/trading-system", 
      name: "Trading System",
      icon: <LineChart className="h-8 w-8" />,
      variant: "default" as const,
    },
    { 
      category: "marketing", 
      path: "/social-media", 
      name: "Social Media",
      icon: <Share2 className="h-8 w-8" />,
      variant: "default" as const,
    },
    { 
      category: "tech", 
      path: "/tech-hub", 
      name: "Tech Hub",
      icon: <Code className="h-8 w-8" />,
      variant: "default" as const,
    },
    { 
      category: "tech", 
      path: "/dot-x", 
      name: "DOT-X Platform",
      icon: <Layers className="h-8 w-8" />,
      variant: "default" as const,
    },
    { 
      category: "marketing", 
      path: "/brand-marketing", 
      name: "Brand Marketing",
      icon: <Briefcase className="h-8 w-8" />,
      variant: "default" as const,
    },
    { 
      category: "operations", 
      path: "/projects", 
      name: "Project Management",
      icon: <Users className="h-8 w-8" />,
      variant: "default" as const,
    },
    { 
      category: "analytics", 
      path: "/dashboard/rag", 
      name: "System Monitor",
      icon: <Activity className="h-8 w-8" />,
      variant: "default" as const,
    },
    {
      category: "operations",
      path: "/customer-management",
      name: "Customer Management",
      icon: <Building className="h-8 w-8" />,
      variant: "default" as const,
    },
    {
      category: "analytics",
      path: "/data-management/cost-analysis",
      name: "Analytics",
      icon: <BarChart3 className="h-8 w-8" />,
      variant: "default" as const,
    },
    {
      category: "admin",
      path: "/admin/security",
      name: "Security",
      icon: <Shield className="h-8 w-8" />,
      variant: "default" as const,
    },
    {
      category: "admin",
      path: "/admin/system-settings",
      name: "System Settings",
      icon: <Settings className="h-8 w-8" />,
      variant: "default" as const,
    },
    {
      category: "tech",
      path: "/tech-hub/integrations",
      name: "Integrations",
      icon: <Zap className="h-8 w-8" />,
      variant: "default" as const,
    }
  ];
  
  const [filteredModules, setFilteredModules] = useState(allModules);
  
  // Filter modules based on activeTab and searchQuery
  useEffect(() => {
    let filtered = allModules;
    
    // Filter by category
    if (activeTab && activeTab.toLowerCase() !== "all") {
      filtered = filtered.filter(module => module.category.toLowerCase() === activeTab.toLowerCase());
    }
    
    // Filter by search query if provided
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(module => 
        module.name.toLowerCase().includes(query) || 
        module.category.toLowerCase().includes(query) || 
        module.path.toLowerCase().includes(query)
      );
    }
    
    setFilteredModules(filtered);
  }, [activeTab, searchQuery]);

  if (filteredModules.length === 0) {
    return (
      <Card className="p-8 text-center bg-white border border-gray-200 shadow-sm rounded-lg">
        <p className="text-gray-600 font-medium">No modules found matching your search criteria.</p>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {filteredModules.map((module, index) => (
        <div key={`${module.path}-${index}`}>
          <ModuleCard 
            title={module.name}
            icon={module.icon}
            path={module.path}
            variant={module.variant}
            className="h-full"
          />
        </div>
      ))}
    </div>
  );
}
