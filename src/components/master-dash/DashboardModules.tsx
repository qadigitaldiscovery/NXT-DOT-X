
import React, { useEffect, useState } from 'react';
import PrimaryModules from './modules/PrimaryModules';
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Primary System Modules - Main Dashboard Area */}
        {(activeCategory === 'all' || activeCategory === 'primary') && 
          filteredModules.primary && (
            <>
              {/* Developer Access Hub - positioned at the start for easy access */}
              {showDevAccess && (
                <DeveloperAccess />
              )}
              
              {/* Primary System Modules */}
              <DataManagement />
              <LoyaltyProgram />
              <SocialMediaMarketing />
              <BrandMarketing />
              <TradingSystem />
              <ProjectManagement />
              <DotX /> {/* Intelligence Management (DOT-X) */}
              <TechHub />
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
              {/* Additional sub category modules would go here */}
            </>
          )
        }
      </div>
    </div>
  );
};

export default DashboardModules;
