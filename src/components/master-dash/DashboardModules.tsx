import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PrimaryModules from './modules/PrimaryModules';

export default function DashboardModules() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Modules Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300">Explore and manage your modules</p>
      </div>
      
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search modules..."
          className="w-full px-4 py-2 border rounded-md text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      
      {/* Tab Navigation */}
      <div className="mb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">All</TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Data</TabsTrigger>
            <TabsTrigger value="marketing" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Marketing</TabsTrigger>
            <TabsTrigger value="tech" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Tech</TabsTrigger>
            <TabsTrigger value="operations" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Operations</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Module Grid */}
      <PrimaryModules activeTab={activeTab} searchQuery={searchQuery} />
    </div>
  );
}
