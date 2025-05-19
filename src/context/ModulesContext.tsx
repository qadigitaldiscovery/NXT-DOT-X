
import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

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
}

interface ModulesContextType {
  modules: Module[];
  loading: boolean;
  toggleModule: (moduleId: string, enabled: boolean) => Promise<void>;
  refreshModules: () => Promise<void>;
  hasAccess?: (moduleId: string) => boolean;
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

  // Add hasAccess function to check if a module is enabled
  const hasAccess = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    return module?.enabled || false;
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
