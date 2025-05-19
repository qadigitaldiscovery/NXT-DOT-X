import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { BetaFeature, BetaAccessStatus } from '../types/beta';

// Use import.meta.env instead of process.env for Vite projects
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || 'https://ehzhosyzybzxhvhisojh.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoemhvc3l6eWJ6eGh2aGlzb2poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MjIwOTQsImV4cCI6MjA2MjA5ODA5NH0.VtWHAoglSqwBEwr_Edujt5nSsLMJMCqEr1ALqbKVEVQ'
);

interface Module {
  id: string;
  name: string;
  enabled: boolean;
  description?: string;
  isBeta?: boolean;
  betaConfig?: {
    requiresApproval: boolean;
    expiresAt?: string;
  };
}

interface BetaAccess {
  moduleId: string;
  userId: string;
  status: BetaAccessStatus;
  grantedAt?: string;
  expiresAt?: string;
}

interface ModulesContextType {
  modules: Module[];
  loading: boolean;
  toggleModule: (moduleId: string, enabled: boolean) => Promise<void>;
  refreshModules: () => Promise<void>;
  hasAccess: (moduleId: string, subModuleId?: string) => boolean;
  requestBetaAccess: (moduleId: string) => Promise<void>;
  getBetaStatus: (moduleId: string) => BetaAccessStatus | null;
  isBetaFeature: (moduleId: string) => boolean;
}

const ModulesContext = createContext<ModulesContextType | undefined>(undefined);

export function ModulesProvider({ children }: { children: React.ReactNode }) {
  const [modules, setModules] = useState<Module[]>([]);
  const [betaAccess, setBetaAccess] = useState<BetaAccess[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchModules = async () => {
    try {
      const { data, error } = await supabase
        .from('modules')
        .select('*');

      if (error) throw error;
      setModules(data || []);
    } catch (error: any) {
      toast.error(error.message || 'Error fetching modules');
    } finally {
      setLoading(false);
    }
  };

  const fetchBetaAccess = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_beta_access')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      setBetaAccess(data || []);
    } catch (error: any) {
      console.error('Error fetching beta access:', error);
    }
  };

  useEffect(() => {
    fetchModules();
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        fetchBetaAccess(session.user.id);
      }
    };
    initAuth();
  }, []);

  const toggleModule = async (moduleId: string, enabled: boolean) => {
    try {
      const { error } = await supabase
        .from('modules')
        .update({ enabled })
        .eq('id', moduleId);

      if (error) throw error;

      setModules(modules.map(module => 
        module.id === moduleId ? { ...module, enabled } : module
      ));

      toast.success(`Module ${enabled ? 'enabled' : 'disabled'} successfully`);
    } catch (error: any) {
      toast.error(error.message || 'Error updating module');
    }
  };

  const refreshModules = async () => {
    setLoading(true);
    await fetchModules();
  };

  const isBetaFeature = (moduleId: string): boolean => {
    const module = modules.find(m => m.id === moduleId);
    return !!module?.isBeta;
  };

  const getBetaStatus = (moduleId: string): BetaAccessStatus | null => {
    const access = betaAccess.find(a => a.moduleId === moduleId);
    return access?.status || null;
  };

  const hasAccess = (moduleId: string, subModuleId?: string): boolean => {
    const module = modules.find(m => m.id === moduleId);
    if (!module?.enabled) return false;

    // If it's not a beta feature, just check if it's enabled
    if (!module.isBeta) return true;

    // For beta features, check beta access status
    const status = getBetaStatus(moduleId);
    return status === 'granted' && (!module.betaConfig?.expiresAt || new Date(module.betaConfig.expiresAt) > new Date());
  };

  const requestBetaAccess = async (moduleId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('user_beta_access')
        .insert({
          module_id: moduleId,
          user_id: session.user.id,
          status: 'pending'
        });

      if (error) throw error;
      await fetchBetaAccess(session.user.id);
      toast.success('Beta access requested successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error requesting beta access');
    }
  };

  return (
    <ModulesContext.Provider value={{ 
      modules, 
      loading, 
      toggleModule, 
      refreshModules,
      hasAccess,
      requestBetaAccess,
      getBetaStatus,
      isBetaFeature
    }}>
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
