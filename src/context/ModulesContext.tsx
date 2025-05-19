import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast } from '../components/ui/toast';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Module {
  id: string;
  name: string;
  enabled: boolean;
  description?: string;
}

interface ModulesContextType {
  modules: Module[];
  loading: boolean;
  toggleModule: (moduleId: string, enabled: boolean) => Promise<void>;
  refreshModules: () => Promise<void>;
  hasAccess: (moduleId: string, subModuleId?: string) => boolean;
}

const ModulesContext = createContext<ModulesContextType | undefined>(undefined);

export function ModulesProvider({ children }: { children: React.ReactNode }) {
  const [modules, setModules] = useState<Module[]>([]);
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

  useEffect(() => {
    fetchModules();
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

  const hasAccess = (moduleId: string, subModuleId?: string): boolean => {
    const module = modules.find(m => m.id === moduleId);
    if (!module?.enabled) return false;
    
    // If a subModuleId is provided, you might want to add additional logic here
    // For now, if the main module is enabled, we'll allow access to submodules
    return true;
  };

  return (
    <ModulesContext.Provider value={{ 
      modules, 
      loading, 
      toggleModule, 
      refreshModules,
      hasAccess 
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
