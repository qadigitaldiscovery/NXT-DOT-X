
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  
  const allModules = [
    { component: <DataManagement key="data" />, category: "data" },
    { component: <LoyaltyProgram key="loyalty" />, category: "marketing" },
    { component: <TradingSystem key="trading" />, category: "operations" },
    { component: <SocialMediaMarketing key="social" />, category: "marketing" },
    { component: <TechHub key="tech" />, category: "tech" },
    { component: <DotX key="dotx" />, category: "tech" },
    { component: <BrandMarketing key="brand" />, category: "marketing" },
    { component: <ProjectManagement key="project" />, category: "operations" }
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
      // This is a simplified search - in a real app you would have module metadata to search against
      // For now, we'll just return all modules when searching as this is just for demonstration
    }
    
    setFilteredModules(filtered.map(m => m.component));
  }, [activeTab, searchQuery]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredModules}
    </div>
  );
}
