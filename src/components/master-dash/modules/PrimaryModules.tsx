
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
      icon: <Database className="h-12 w-12" />,
    },
    { 
      category: "marketing", 
      path: "/loyalty-rewards", 
      name: "Loyalty Program",
      icon: <Award className="h-12 w-12" />,
    },
    { 
      category: "operations", 
      path: "/trading-system", 
      name: "Trading System",
      icon: <LineChart className="h-12 w-12" />,
    },
    { 
      category: "marketing", 
      path: "/social-media", 
      name: "Social Media",
      icon: <Share2 className="h-12 w-12" />,
    },
    { 
      category: "tech", 
      path: "/tech-hub", 
      name: "Tech Hub",
      icon: <Code className="h-12 w-12" />,
    },
    { 
      category: "tech", 
      path: "/dot-x", 
      name: "DOT-X Platform",
      icon: <Layers className="h-12 w-12" />,
    },
    { 
      category: "marketing", 
      path: "/brand-marketing", 
      name: "Brand Marketing",
      icon: <Briefcase className="h-12 w-12" />,
    },
    { 
      category: "operations", 
      path: "/projects", 
      name: "Project Management",
      icon: <Users className="h-12 w-12" />,
    },
    { 
      category: "analytics", 
      path: "/dashboard/rag", 
      name: "System Monitor",
      icon: <Activity className="h-12 w-12" />,
    },
    {
      category: "operations",
      path: "/customer-management",
      name: "Customer Management",
      icon: <Building className="h-12 w-12" />,
    },
    {
      category: "analytics",
      path: "/data-management/cost-analysis",
      name: "Analytics",
      icon: <BarChart3 className="h-12 w-12" />,
    },
    {
      category: "admin",
      path: "/admin/security",
      name: "Security",
      icon: <Shield className="h-12 w-12" />,
    },
    {
      category: "admin",
      path: "/admin/system-settings",
      name: "System Settings",
      icon: <Settings className="h-12 w-12" />,
    },
    {
      category: "tech",
      path: "/tech-hub/integrations",
      name: "Integrations",
      icon: <Zap className="h-12 w-12" />,
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
      <Card className="p-8 text-center bg-gradient-to-br from-[#f7faff] to-[#e5effc] border-[#e5effc]">
        <p className="text-[#005fea]/70">No modules found matching your search criteria.</p>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {filteredModules.map((module, index) => (
        <ModuleCard 
          key={`${module.path}-${index}`}
          title={module.name}
          icon={module.icon}
          path={module.path}
          className="h-44 w-full"
        />
      ))}
    </div>
  );
}
