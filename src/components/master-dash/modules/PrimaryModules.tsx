
import { useState, useEffect } from "react";
import DataManagement from "./DataManagement";
import LoyaltyProgram from "./LoyaltyProgram";
import TradingSystem from "./TradingSystem";
import SocialMediaMarketing from "./SocialMediaMarketing";
import TechHub from "./TechHub";
import DotX from "./DotX";
import BrandMarketing from "./BrandMarketing";
import ProjectManagement from "./ProjectManagement";
import { Card } from "@/components/ui/card";
import { ModuleCard } from "../ModuleCard";
import { Database, Users, LineChart, Code, Briefcase, Share2, Award, Layers } from "lucide-react";

interface PrimaryModulesProps {
  activeTab?: string;
  searchQuery?: string;
}

export default function PrimaryModules({ activeTab = "all", searchQuery = "" }: PrimaryModulesProps) {
  // Define all modules with their metadata
  const allModules = [
    { 
      component: <DataManagement key="data" />, 
      category: "data", 
      path: "/data-management", 
      name: "Data Management",
      icon: <Database className="h-12 w-12" />,
    },
    { 
      component: <LoyaltyProgram key="loyalty" />, 
      category: "marketing", 
      path: "/loyalty-rewards", 
      name: "Loyalty Program",
      icon: <Award className="h-12 w-12" />,
    },
    { 
      component: <TradingSystem key="trading" />, 
      category: "operations", 
      path: "/trading-system", 
      name: "Trading System",
      icon: <LineChart className="h-12 w-12" />,
    },
    { 
      component: <SocialMediaMarketing key="social" />, 
      category: "marketing", 
      path: "/social-media", 
      name: "Social Media",
      icon: <Share2 className="h-12 w-12" />,
    },
    { 
      component: <TechHub key="tech" />, 
      category: "tech", 
      path: "/tech-hub", 
      name: "Tech Hub",
      icon: <Code className="h-12 w-12" />,
    },
    { 
      component: <DotX key="dotx" />, 
      category: "tech", 
      path: "/dot-x", 
      name: "DOT-X Platform",
      icon: <Layers className="h-12 w-12" />,
    },
    { 
      component: <BrandMarketing key="brand" />, 
      category: "marketing", 
      path: "/brand-marketing", 
      name: "Brand Marketing",
      icon: <Briefcase className="h-12 w-12" />,
    },
    { 
      component: <ProjectManagement key="project" />, 
      category: "operations", 
      path: "/projects", 
      name: "Project Management",
      icon: <Users className="h-12 w-12" />,
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
      <Card className="p-8 text-center bg-[#f0f9ec] border-[#e5effc]">
        <p className="text-muted-foreground">No modules found matching your search criteria.</p>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {filteredModules.map((module) => (
        <ModuleCard 
          key={module.path}
          title={module.name}
          icon={module.icon}
          path={module.path}
          className="h-48"
        />
      ))}
    </div>
  );
}
