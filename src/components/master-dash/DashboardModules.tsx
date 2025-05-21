import React, { useEffect, useState } from 'react';
import BrandMarketing from './modules/BrandMarketing';
import TradingSystem from './modules/TradingSystem';
import TechHub from './modules/TechHub';
import CustomerManagement from './modules/CustomerManagement';
import SupplierManagement from './modules/SupplierManagement';
import ProjectManagement from './modules/ProjectManagement';
import DataManagement from './modules/DataManagement';
import SystemTechnicalConfig from './modules/SystemTechnicalConfig';
import LoyaltyProgram from './modules/LoyaltyProgram';
import SocialMediaMarketing from './modules/SocialMediaMarketing';
import DotX from './modules/DotX';
import SearchAndFilter from './SearchAndFilter';
import { DeveloperAccess } from './modules/DeveloperAccess';
import Administration from './modules/Administration';
import AiArmy from './modules/AiArmy';
import Communications from './modules/Communications';
import AutomationWorkflow from './modules/AutomationWorkflow';
import Operations from './modules/Operations';
import WebServices from './modules/WebServices';

const DashboardModules: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredModules, setFilteredModules] = useState({
    primary: true,
    secondary: true,
    subcategory: true,
  });
  
  // Add a state to show/hide the developer access
  const [showDevAccess] = useState(true);

  useEffect(() => {
    // Filter modules based on active category and search term
    let primary = true;
    let secondary = true;
    let subcategory = true;

    if (activeCategory !== 'all') {
      primary = activeCategory === 'primary';
      secondary = activeCategory === 'secondary';
      subcategory = activeCategory === 'subcategory';
    }

    setFilteredModules({
      primary: primary && (searchTerm === '' || 'primary'.includes(searchTerm.toLowerCase())),
      secondary: secondary && (searchTerm === '' || 'secondary'.includes(searchTerm.toLowerCase())),
      subcategory: subcategory && (searchTerm === '' || 'subcategory'.includes(searchTerm.toLowerCase())),
    });
  }, [activeCategory, searchTerm]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  return (
    <div className="space-y-6">
      <SearchAndFilter 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {/* Primary System Modules - Main Dashboard Area */}
        {(activeCategory === 'all' || activeCategory === 'primary') && 
          filteredModules.primary && (
            <>
              {/* Primary System Modules */}
              <DataManagement />
              <SocialMediaMarketing />
              <BrandMarketing />
              <TradingSystem />
              <ProjectManagement />
              <DotX />
              <TechHub />
              <Communications />
              <AutomationWorkflow />
              <Operations />
              <WebServices />
            </>
          )
        }
        
        {/* Secondary System Modules - for sidebars */}
        {(activeCategory === 'all' || activeCategory === 'secondary') && 
          filteredModules.secondary && (
            <>
              <CustomerManagement />
              <SupplierManagement />
              <SystemTechnicalConfig />
              <Administration />
            </>
          )
        }
        
        {/* Sub Category Menu Modules - for sidebars */}
        {(activeCategory === 'all' || activeCategory === 'subcategory') && 
          filteredModules.subcategory && (
            <>
              <AiArmy />
              <LoyaltyProgram />
              {/* Additional sub category modules would go here */}
            </>
          )
        }

        {/* Developer Access Hub - moved to the bottom */}
        {showDevAccess && (
          <DeveloperAccess />
        )}
      </div>
    </div>
  );
};

export default DashboardModules;
