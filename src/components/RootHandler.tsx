
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import MasterDash from '@/pages/MasterDash';
import { useModuleAccess } from '@/hooks/useModuleAccess'; 
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const RootHandler: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { moduleAccess, refreshAccess } = useModuleAccess();
  
  // If the user doesn't have any roles assigned, we'll initialize them as an admin
  // This is just for demonstration purposes - in a real app, you would have a proper onboarding flow
  useEffect(() => {
    const initializeUserAccess = async () => {
      if (user && moduleAccess && moduleAccess.roles.length === 0) {
        try {
          const { data, error } = await supabase.functions.invoke('init-admin-access', {
            body: { userId: user.id }
          });
          
          if (error) throw error;
          
          toast.success('Admin access granted');
          refreshAccess(); // Refresh the user's access after initialization
          
        } catch (err) {
          console.error('Error initializing user access:', err);
          toast.error('Failed to initialize user access');
        }
      }
    };
    
    initializeUserAccess();
  }, [user, moduleAccess]);

  if (isAuthenticated) {
    return <MasterDash />;
  } else {
    return <Navigate to="/landing" replace />;
  }
};

export default RootHandler;
