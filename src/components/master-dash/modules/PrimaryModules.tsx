
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

interface PrimaryModulesProps {
  activeTab?: string;
  searchQuery?: string;
}

export default function PrimaryModules({ activeTab = "all", searchQuery = "" }: PrimaryModulesProps) {
  const allModules = [
    { component: <DataManagement key="data" />, category: "data", path: "/data-management", name: "Data Management" },
    { component: <LoyaltyProgram key="loyalty" />, category: "marketing", path: "/loyalty-rewards", name: "Loyalty Program" },
    { component: <TradingSystem key="trading" />, category: "operations", path: "/trading-system", name: "Trading System" },
    { component: <SocialMediaMarketing key="social" />, category: "marketing", path: "/social-media", name: "Social Media" },
    { component: <TechHub key="tech" />, category: "tech", path: "/tech-hub", name: "Tech Hub" },
    { component: <DotX key="dotx" />, category: "tech", path: "/dot-x", name: "DOT-X Platform" },
    { component: <BrandMarketing key="brand" />, category: "marketing", path: "/brand-marketing", name: "Brand Marketing" },
    { component: <ProjectManagement key="project" />, category: "operations", path: "/projects", name: "Project Management" }
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
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No modules found matching your search criteria.</p>
      </Card>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredModules.map(m => m.component)}
    </div>
  );
}
