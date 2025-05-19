
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PrimaryModules from './modules/PrimaryModules';
import { SetupTestUser } from '@/components/SetupTestUser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function DashboardModules() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Platform Modules</h1>
          <p className="text-muted-foreground">Access and manage your platform modules</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-end mt-4 md:mt-0">
          <SetupTestUser />
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-start">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search modules..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="tech">Tech</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button variant="outline" className="ml-auto hidden md:flex">
          Customize Dashboard
        </Button>
      </div>
      
      {/* Module Grid */}
      <PrimaryModules activeTab={activeTab} searchQuery={searchQuery} />
    </div>
  );
}
