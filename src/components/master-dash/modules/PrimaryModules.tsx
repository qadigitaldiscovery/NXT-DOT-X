
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
import ModuleStatusIndicator from "../ModuleStatusIndicator";
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
      description: "Centralized data platform for analytics and insights",
      icon: <Database className="h-6 w-6" />,
      status: "active"
    },
    { 
      component: <LoyaltyProgram key="loyalty" />, 
      category: "marketing", 
      path: "/loyalty-rewards", 
      name: "Loyalty Program",
      description: "Customer rewards and retention system",
      icon: <Award className="h-6 w-6" />,
      status: "beta"
    },
    { 
      component: <TradingSystem key="trading" />, 
      category: "operations", 
      path: "/trading-system", 
      name: "Trading System",
      description: "Asset trading and portfolio management",
      icon: <LineChart className="h-6 w-6" />,
      status: "active"
    },
    { 
      component: <SocialMediaMarketing key="social" />, 
      category: "marketing", 
      path: "/social-media", 
      name: "Social Media",
      description: "Campaign management and analytics",
      icon: <Share2 className="h-6 w-6" />,
      status: "beta"
    },
    { 
      component: <TechHub key="tech" />, 
      category: "tech", 
      path: "/tech-hub", 
      name: "Tech Hub",
      description: "Developer tools and API management",
      icon: <Code className="h-6 w-6" />,
      status: "active"
    },
    { 
      component: <DotX key="dotx" />, 
      category: "tech", 
      path: "/dot-x", 
      name: "DOT-X Platform",
      description: "Next-generation integration platform",
      icon: <Layers className="h-6 w-6" />,
      status: "beta"
    },
    { 
      component: <BrandMarketing key="brand" />, 
      category: "marketing", 
      path: "/brand-marketing", 
      name: "Brand Marketing",
      description: "Brand identity and marketing tools",
      icon: <Briefcase className="h-6 w-6" />,
      status: "active"
    },
    { 
      component: <ProjectManagement key="project" />, 
      category: "operations", 
      path: "/projects", 
      name: "Project Management",
      description: "Task tracking and team collaboration",
      icon: <Users className="h-6 w-6" />,
      status: "active"
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
        module.description.toLowerCase().includes(query) || 
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredModules.map((module) => (
        <ModuleCard 
          key={module.path}
          title={module.name}
          description={
            <div className="flex flex-col gap-2">
              <p>{module.description}</p>
              <ModuleStatusIndicator status={module.status} size="sm" />
            </div>
          }
          icon={module.icon}
          className={`hover:border-[#005fea] hover:shadow-md transition-all duration-300`}
          onClick={() => console.log(`Navigate to ${module.path}`)}
        />
      ))}
    </div>
  );
}
