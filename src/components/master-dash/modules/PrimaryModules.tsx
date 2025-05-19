
import { useState, useEffect } from "react";
import { ModuleCard } from "../ModuleCard";
import { Card } from "@/components/ui/card";
import { 
  Database, Users, LineChart, Brain, Briefcase, Share2, Award, Layers, 
  BarChart3, Building, Shield, Settings, Activity, Cpu
} from "lucide-react";

interface PrimaryModulesProps {
  activeTab?: string;
  searchQuery?: string;
}

export default function PrimaryModules({ activeTab = "all", searchQuery = "" }: PrimaryModulesProps) {
  // Define primary system modules
  const primaryModules = [
    { 
      category: "primary", 
      path: "/data-management", 
      name: "Data Management",
      icon: <Database className="h-8 w-8" />,
      variant: "default" as const,
    },
    { 
      category: "primary", 
      path: "/loyalty-rewards", 
      name: "Loyalty Program",
      icon: <Award className="h-8 w-8" />,
      variant: "default" as const,
    },
    { 
      category: "primary", 
      path: "/social-media", 
      name: "Social Media Marketing",
      icon: <Share2 className="h-8 w-8" />,
      variant: "default" as const,
    },
    { 
      category: "primary", 
      path: "/brand-marketing", 
      name: "Brand Marketing",
      icon: <Briefcase className="h-8 w-8" />,
      variant: "default" as const,
    },
    { 
      category: "primary", 
      path: "/trading-system", 
      name: "Trading System",
      icon: <LineChart className="h-8 w-8" />,
      variant: "default" as const,
    },
    { 
      category: "primary", 
      path: "/projects", 
      name: "Project Management",
      icon: <Users className="h-8 w-8" />,
      variant: "default" as const,
    },
    { 
      category: "primary", 
      path: "/dot-x", 
      name: "Intelligence Management (DOT-X)",
      icon: <Brain className="h-8 w-8" />,
      variant: "default" as const,
    },
    { 
      category: "primary", 
      path: "/tech-hub", 
      name: "Tech Hub",
      icon: <Cpu className="h-8 w-8" />,
      variant: "default" as const,
    }
  ];
  
  const [filteredModules, setFilteredModules] = useState(primaryModules);
  
  // Filter modules based on activeTab and searchQuery
  useEffect(() => {
    let filtered = primaryModules;
    
    // Filter by category if not "all"
    if (activeTab && activeTab.toLowerCase() !== "all" && activeTab.toLowerCase() !== "primary") {
      filtered = [];
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
      <Card className="p-8 text-center bg-white border border-gray-200 shadow-sm rounded-lg col-span-full">
        <p className="text-gray-600 font-medium">No primary modules found matching your search criteria.</p>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 col-span-full gap-6">
      {filteredModules.map((module, index) => (
        <div key={`${module.path}-${index}`} className="col-span-1">
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
