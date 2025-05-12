
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ModuleCard } from './ModuleCard';
import PrimaryModules from './modules/PrimaryModules';
import Administration from './modules/Administration';
import SystemTechnicalConfig from './modules/SystemTechnicalConfig';

const DashboardModules = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories] = useState(['All', 'Data', 'Marketing', 'Operations']);
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="space-y-6">
      {/* Search and filtering */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-[#1e2231] text-slate-300 hover:bg-slate-700'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search modules..."
            className="pl-10 pr-4 py-2 bg-[#1e2231] border border-slate-700 rounded-md text-white w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* System Technical Configuration */}
      <div className="mb-8">
        <SystemTechnicalConfig />
      </div>

      {/* Primary Modules */}
      <PrimaryModules />
    </div>
  );
};

export default DashboardModules;
