
import { useState, useEffect } from "react";
import { ModuleCard } from "../ModuleCard";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
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

  // For the staggered animation effect
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  if (filteredModules.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 text-center bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/60 backdrop-blur-md border-white/20 dark:border-slate-700/30">
          <p className="text-blue-500/70 dark:text-blue-400/70">No modules found matching your search criteria.</p>
        </Card>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {filteredModules.map((module, index) => (
        <motion.div
          key={`${module.path}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            delay: index * 0.05 
          }}
        >
          <ModuleCard 
            title={module.name}
            icon={module.icon}
            path={module.path}
            className="h-44 w-full"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
