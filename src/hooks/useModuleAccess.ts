
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface ModuleAccess {
  id: string;
  module_slug: string;
  submenu_slug?: string;
  category?: string;
  is_enabled: boolean;
}

export interface UserRoleInfo {
  roles: string[];
  modules: ModuleAccess[];
  isAdmin: boolean;
  hasAccess: (moduleSlug: string, submenuSlug?: string) => boolean;
}

export function useModuleAccess(): {
  moduleAccess: UserRoleInfo | null;
  loading: boolean;
  error: Error | null;
  refreshAccess: () => Promise<void>;
  toggleModuleAccess: (id: string, isEnabled: boolean) => Promise<void>;
} {
  const { user } = useAuth();
  const [moduleAccess, setModuleAccess] = useState<UserRoleInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadUserAccess = async () => {
    try {
      setLoading(true);
      if (!user) {
        setModuleAccess(null);
        return;
      }

      // Fetch user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      if (rolesError) throw rolesError;

      const roles = rolesData.map(r => r.role);
      const isAdmin = roles.includes('admin');

      // Fetch user module access
      const { data: modulesData, error: modulesError } = await supabase
        .from('user_module_access')
        .select('*')
        .eq('user_id', user.id);

      if (modulesError) throw modulesError;

      const userAccess: UserRoleInfo = {
        roles,
        modules: modulesData || [],
        isAdmin,
        hasAccess: (moduleSlug, submenuSlug) => {
          if (isAdmin) return true; // Admins have access to everything
          
          // Check if the module is enabled for this user
          const module = modulesData?.find(m => 
            m.module_slug === moduleSlug && 
            (submenuSlug ? m.submenu_slug === submenuSlug : true)
          );
          
          return module ? module.is_enabled : false;
        }
      };

      setModuleAccess(userAccess);
    } catch (err) {
      console.error('Error loading module access:', err);
      setError(err instanceof Error ? err : new Error('Unknown error loading module access'));
    } finally {
      setLoading(false);
    }
  };

  const refreshAccess = async () => {
    await loadUserAccess();
  };

  const toggleModuleAccess = async (id: string, isEnabled: boolean) => {
    try {
      const { error: updateError } = await supabase
        .from('user_module_access')
        .update({ is_enabled: isEnabled })
        .eq('id', id);

      if (updateError) throw updateError;

      // Update local state
      setModuleAccess(prev => {
        if (!prev) return prev;
        
        return {
          ...prev,
          modules: prev.modules.map(m =>
            m.id === id ? { ...m, is_enabled: isEnabled } : m
          )
        };
      });
    } catch (err) {
      console.error('Error toggling module access:', err);
      throw err;
    }
  };

  useEffect(() => {
    if (user) {
      loadUserAccess();
    } else {
      setModuleAccess(null);
      setLoading(false);
    }
  }, [user]);

  return { moduleAccess, loading, error, refreshAccess, toggleModuleAccess };
}
