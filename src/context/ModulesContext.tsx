import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

export interface Module {
  id: string;
  name: string;
  status: string;
  description: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ModuleAccess {
  id: string;
  user_id: string;
  module_slug: string;
  submenu_slug?: string | null;
  category?: string | null;
  is_enabled: boolean;
  updated_at?: string | null;
}

interface SupabaseModuleAccess extends Omit<ModuleAccess, 'user_id'> {
  user_id: string | null;
}

interface ModulesContextType {
  modules: Module[];
  moduleAccess: ModuleAccess[];
  loading: boolean;
  error: Error | null;
  refreshModules: () => Promise<void>;
  refreshAccess: () => Promise<void>;
  toggleAccess: (id: string, isEnabled: boolean) => Promise<void>;
  addModuleAccess: (data: Omit<ModuleAccess, 'id'>) => Promise<void>;
  hasAccess: (moduleSlug: string, submenuSlug?: string) => boolean;
  isAdmin: boolean;
}

const ModulesContext = createContext<ModulesContextType | undefined>(undefined);

export function ModulesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [moduleAccess, setModuleAccess] = useState<ModuleAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchModules = async () => {
    try {
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .order('name');

      if (error) throw error;
      setModules(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch modules'));
      toast.error('Failed to fetch modules');
    }
  };

  const fetchAccess = async () => {
    if (!user) {
      setModuleAccess([]);
      return;
    }

    try {
      // Check if user is admin
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      if (rolesError) throw rolesError;

      const roles = rolesData?.map(r => r.role) || [];
      const adminStatus = roles.includes('admin') || user.role === 'admin';
      setIsAdmin(adminStatus);

      // Fetch module access
      const { data, error } = await supabase
        .from('user_module_access')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setModuleAccess(data.map(item => ({
        ...item,
        user_id: item.user_id || user.id // Ensure user_id is never null
      })) as ModuleAccess[]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch module access'));
      toast.error('Failed to fetch module access');
    }
  };

  const refreshModules = async () => {
    setLoading(true);
    await fetchModules();
    setLoading(false);
  };

  const refreshAccess = async () => {
    setLoading(true);
    await fetchAccess();
    setLoading(false);
  };

  const toggleAccess = async (id: string, isEnabled: boolean) => {
    try {
      const { error } = await supabase
        .from('user_module_access')
        .update({ is_enabled: isEnabled })
        .eq('id', id);

      if (error) throw error;

      setModuleAccess(prev => 
        prev.map(access => 
          access.id === id ? { ...access, is_enabled: isEnabled } : access
        )
      );

      toast.success(`Module access ${isEnabled ? 'enabled' : 'disabled'}`);
    } catch (err) {
      toast.error('Failed to update module access');
      throw err;
    }
  };

  const addModuleAccess = async (data: Omit<ModuleAccess, 'id'>) => {
    try {
      const { data: newAccess, error } = await supabase
        .from('user_module_access')
        .insert([data])
        .select()
        .single();

      if (error) throw error;

      if (!user) {
        throw new Error('No user found');
      }

      setModuleAccess(prev => [...prev, {
        ...newAccess,
        user_id: newAccess.user_id || user.id
      } as ModuleAccess]);
      toast.success('Module access added successfully');
    } catch (err) {
      toast.error('Failed to add module access');
      throw err;
    }
  };

  const hasAccess = (moduleSlug: string, submenuSlug?: string): boolean => {
    if (isAdmin) return true;

    return moduleAccess.some(access => 
      access.module_slug === moduleSlug && 
      access.is_enabled &&
      (submenuSlug ? access.submenu_slug === submenuSlug : true)
    );
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await Promise.all([fetchModules(), fetchAccess()]);
      setLoading(false);
    };

    initialize();
  }, [user]);

  const value = {
    modules,
    moduleAccess,
    loading,
    error,
    refreshModules,
    refreshAccess,
    toggleAccess,
    addModuleAccess,
    hasAccess,
    isAdmin,
  };

  return (
    <ModulesContext.Provider value={value}>
      {children}
    </ModulesContext.Provider>
  );
}

export function useModules() {
  const context = useContext(ModulesContext);
  if (context === undefined) {
    throw new Error('useModules must be used within a ModulesProvider');
  }
  return context;
}
