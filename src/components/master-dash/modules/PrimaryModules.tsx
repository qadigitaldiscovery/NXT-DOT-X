
import { useState, useEffect } from "react";
import DataManagement from "./DataManagement";
import LoyaltyProgram from "./LoyaltyProgram";
import TradingSystem from "./TradingSystem";
import SocialMediaMarketing from "./SocialMediaMarketing";
import TechHub from "./TechHub";
import DotX from "./DotX";
import BrandMarketing from "./BrandMarketing";
import ProjectManagement from "./ProjectManagement";

interface PrimaryModulesProps {
  activeTab?: string;
  searchQuery?: string;
}

export default function PrimaryModules({ activeTab = "all", searchQuery = "" }: PrimaryModulesProps) {
  const allModules = [
    { component: <DataManagement key="data" />, category: "data", path: "/data-management" },
    { component: <LoyaltyProgram key="loyalty" />, category: "marketing", path: "/loyalty-rewards" },
    { component: <TradingSystem key="trading" />, category: "operations", path: "/trading-system" },
    { component: <SocialMediaMarketing key="social" />, category: "marketing", path: "/social-media" },
    { component: <TechHub key="tech" />, category: "tech", path: "/tech-hub" },
    { component: <DotX key="dotx" />, category: "tech", path: "/dot-x" },
    { component: <BrandMarketing key="brand" />, category: "marketing", path: "/brand-marketing" },
    { component: <ProjectManagement key="project" />, category: "operations", path: "/projects" }
  ];
  
  const [filteredModules, setFilteredModules] = useState(allModules.map(m => m.component));
  
  // Filter modules based on activeTab and searchQuery
  useEffect(() => {
    let filtered = allModules;
    
    // Filter by category
    if (activeTab.toLowerCase() !== "all") {
      filtered = filtered.filter(module => module.category.toLowerCase() === activeTab.toLowerCase());
    }
    
    // Filter by search query if provided
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(module => 
        module.category.toLowerCase().includes(query) || 
        module.path.toLowerCase().includes(query)
      );
    }
    
    setFilteredModules(filtered.map(m => m.component));
  }, [activeTab, searchQuery]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredModules}
    </div>
  );
}
