
import React, { useState } from 'react';
import PrimaryModules from './modules/PrimaryModules';
import ModuleStatusIndicator from './ModuleStatusIndicator';
import SearchAndFilter from './SearchAndFilter';

const DashboardModules = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories] = useState(['All', 'Data', 'Marketing', 'Tech', 'Operations']);
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="space-y-6">
      {/* Search and filtering section */}
      <SearchAndFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Module Status Indicators (RAG) */}
      <div className="mb-8">
        <ModuleStatusIndicator />
      </div>

      {/* Primary Modules */}
      <PrimaryModules activeTab={activeCategory} searchQuery={searchQuery} />
    </div>
  );
};

export default DashboardModules;
