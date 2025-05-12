
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ModuleCard } from './ModuleCard';

// Module data for the dashboard
const moduleData = [
  {
    id: 'data-management',
    title: 'Data Management',
    description: 'Track system integration and enterprise management to extract data.',
    status: 'connected',
    icon: 'chart-line',
    color: 'blue'
  },
  {
    id: 'marketing-1',
    title: 'Marketing',
    description: 'Data science, management and analytic report app realign payoffs.',
    status: 'connected',
    icon: 'chart-check',
    color: 'blue'
  },
  {
    id: 'marketing-2',
    title: 'Marketing',
    description: 'Business statement, aligned strategic over all media appointment.',
    status: 'connected',
    icon: 'chart-wave',
    color: 'blue'
  },
  {
    id: 'trading-system-1',
    title: 'Trading System',
    description: 'Trade system integration on business trend chosen expansion.',
    status: 'connected',
    icon: 'chart-rise',
    color: 'blue'
  },
  {
    id: 'trading-system-2',
    title: 'Trading System',
    description: 'Trade system integrity and business commerce dept 100 payoffs.',
    status: 'connected',
    icon: 'chart-data',
    color: 'blue'
  },
  {
    id: 'connected',
    title: 'Connected',
    description: 'Trade system management out business tech near meta expansion.',
    status: 'connected',
    icon: 'chart-map',
    color: 'blue'
  }
];

const DashboardModules = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories] = useState(['All', 'Data', 'Marketing', 'Operations']);
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter modules based on search and category
  const filteredModules = moduleData.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'All') return matchesSearch;
    return matchesSearch && module.title.toLowerCase().includes(activeCategory.toLowerCase());
  });

  // Group modules into rows of 3
  const moduleRows = [];
  for (let i = 0; i < filteredModules.length; i += 3) {
    moduleRows.push(filteredModules.slice(i, i + 3));
  }

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

      {/* Module grid */}
      <div className="space-y-6">
        {moduleRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {row.map(module => (
              <ModuleCard
                key={module.id}
                title={module.title}
                description={module.description}
                status={module.status}
                icon={module.icon}
                color={module.color}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Import the SystemTechnicalConfig component
import SystemTechnicalConfig from './modules/SystemTechnicalConfig';

export default DashboardModules;
