
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PrimaryModules from './modules/PrimaryModules';
import { SetupTestUser } from '@/components/SetupTestUser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import SearchAndFilter from './SearchAndFilter';

export default function DashboardModules() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = ["All", "Data", "Marketing", "Tech", "Operations"];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-[#005fea]">Platform Modules</h1>
          <p className="text-muted-foreground">Access and manage your platform modules</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-end mt-4 md:mt-0">
          <SetupTestUser />
        </div>
      </div>
      
      {/* Search and Filter Section using the new color scheme */}
      <SearchAndFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={categories}
        activeCategory={activeTab}
        setActiveCategory={setActiveTab}
      />
      
      {/* Module Grid */}
      <PrimaryModules activeTab={activeTab.toLowerCase()} searchQuery={searchQuery} />
    </div>
  );
}
