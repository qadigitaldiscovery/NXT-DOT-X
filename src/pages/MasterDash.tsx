
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

// Import refactored components
import MasterDashHeader from '@/components/master-dash/MasterDashHeader';
import MasterDashFooter from '@/components/master-dash/MasterDashFooter';
import PrimaryModules from '@/components/master-dash/modules/PrimaryModules';
import AiArmy from '@/components/master-dash/modules/AiArmy';
import Administration from '@/components/master-dash/modules/Administration';

// Assuming this is the correct path based on previous searches
const backgroundImagePath = '/lovable-uploads/backk1.png';

const MasterDash = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      navigate('/landing');
      toast.error('Please sign in to access this page');
    }
  }, [navigate, user]);
  
  return (
    <div 
      className="min-h-screen flex flex-col relative p-4 sm:p-6 md:p-8" 
      style={{
        backgroundImage: `url(${backgroundImagePath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Improved overlay with better frosted glass effect */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-0"></div>
      
      {/* Content needs to be on a higher z-index to appear above the overlay */}
      <div className="relative z-10 flex flex-col flex-grow">
        {/* Header component */}
        <MasterDashHeader user={user} />
        
        {/* Main content with new layout */}
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Primary Modules in the center/left (3/4 width on large screens) */}
            <div className="lg:w-3/4">
              <PrimaryModules />
              
              {/* AI Army Section */}
              <AiArmy />
            </div>
            
            {/* Administration section on the right (1/4 width) */}
            <div className="lg:w-1/4">
              <Administration />
            </div>
          </div>
        </main>
        
        {/* Footer component */}
        <MasterDashFooter />
      </div>
    </div>
  );
};

export default MasterDash;
