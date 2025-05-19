
import { useState } from 'react';
import PrimaryModules from './modules/PrimaryModules';
import { SetupTestUser } from '@/components/SetupTestUser';
import SearchAndFilter from './SearchAndFilter';
import { motion } from 'framer-motion';

export default function DashboardModules() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = ["All", "Data", "Marketing", "Tech", "Operations", "Analytics", "Admin"];
  
  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div>
          <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#005fea] to-[#4cacfe]">
            Platform Modules
          </h1>
          <p className="text-muted-foreground">Access and manage your platform modules</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-end mt-4 md:mt-0">
          <SetupTestUser />
        </div>
      </motion.div>
      
      {/* Search and Filter Section */}
      <SearchAndFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={categories}
        activeCategory={activeTab}
        setActiveCategory={setActiveTab}
      />
      
      {/* Module Grid */}
      <PrimaryModules activeTab={activeTab.toLowerCase()} searchQuery={searchQuery} />
    </motion.div>
  );
}
