import React, { useEffect, useState } from 'react';
import PrimaryModules from './modules/PrimaryModules';
import BrandMarketing from './modules/BrandMarketing';
import AiArmy from './modules/AiArmy';
import Administration from './modules/Administration';
import TechHub from './modules/TechHub';
import CustomerManagement from './modules/CustomerManagement';
import SupplierManagement from './modules/SupplierManagement';
import ProjectManagement from './modules/ProjectManagement';
import DataManagement from './modules/DataManagement';
import SystemTechnicalConfig from './modules/SystemTechnicalConfig';
import LoyaltyProgram from './modules/LoyaltyProgram';
import TradingSystem from './modules/TradingSystem';
import SocialMediaMarketing from './modules/SocialMediaMarketing';
import DotX from './modules/DotX';
import SearchAndFilter from './SearchAndFilter';
import { DeveloperAccess } from './modules/DeveloperAccess';

const DashboardModules: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredModules, setFilteredModules] = useState({
    primary: true,
    data: true,
    marketing: true,
    tech: true,
    operations: true,
  });
  
  // Add a state to show/hide the developer access
  const [showDevAccess] = useState(true);

  useEffect(() => {
    // Filter modules based on active category and search term
    let primary = true;
    let data = true;
    let marketing = true;
    let tech = true;
    let operations = true;

    if (activeCategory !== 'all') {
      primary = activeCategory === 'primary';
      data = activeCategory === 'data';
      marketing = activeCategory === 'marketing';
      tech = activeCategory === 'tech';
      operations = activeCategory === 'operations';
    }

    setFilteredModules({
      primary: primary && (searchTerm === '' || 'primary'.includes(searchTerm.toLowerCase())),
      data: data && (searchTerm === '' || 'data'.includes(searchTerm.toLowerCase())),
      marketing: marketing && (searchTerm === '' || 'marketing'.includes(searchTerm.toLowerCase())),
      tech: tech && (searchTerm === '' || 'tech'.includes(searchTerm.toLowerCase())),
      operations: operations && (searchTerm === '' || 'operations'.includes(searchTerm.toLowerCase())),
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
        {/* Developer Access Hub - positioned at the start for easy access */}
        {showDevAccess && (
          <DeveloperAccess />
        )}
        
        {/* Primary modules */}
        {(activeCategory === 'all' || activeCategory === 'primary') && 
          filteredModules.primary && (
            <PrimaryModules />
          )
        }
        
        {/* Data modules */}
        {(activeCategory === 'all' || activeCategory === 'data') && 
          filteredModules.data && (
            <>
              <DataManagement />
              <SupplierManagement />
              <CustomerManagement />
            </>
          )
        }
        
        {/* Marketing modules */}
        {(activeCategory === 'all' || activeCategory === 'marketing') && 
          filteredModules.marketing && (
            <>
              <BrandMarketing />
              <SocialMediaMarketing />
              <LoyaltyProgram />
            </>
          )
        }
        
        {/* Tech modules */}
        {(activeCategory === 'all' || activeCategory === 'tech') && 
          filteredModules.tech && (
            <>
              <TechHub />
              <DotX />
              <AiArmy />
              <SystemTechnicalConfig />
            </>
          )
        }
        
        {/* Operations modules */}
        {(activeCategory === 'all' || activeCategory === 'operations') && 
          filteredModules.operations && (
            <>
              <ProjectManagement />
              <TradingSystem />
              <Administration />
            </>
          )
        }
      </div>
    </div>
  );
};

export default DashboardModules;
