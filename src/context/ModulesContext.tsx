
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

export type Module = {
  id: string;
  name: string;
  isEnabled: boolean;
  isVisible: boolean;
  description?: string;
  version?: string;
  category?: string;
  features?: Record<string, boolean>;
  enabled?: boolean; // For backward compatibility
  isBeta?: boolean;
};

export type ModulesContextType = {
  modules: Module[];
  loading: boolean;
  error: string | null;
  enableModule: (id: string) => void;
  disableModule: (id: string) => void;
  toggleModuleVisibility: (id: string) => void;
  toggleModule: (id: string) => void;
  refreshModules?: () => void;
  isFeatureEnabled?: (featureId: string) => boolean;
};

const ModulesContext = createContext<ModulesContextType | undefined>(undefined);

export function useModules() {
  const context = useContext(ModulesContext);
  if (context === undefined) {
    throw new Error("useModules must be used within a ModulesProvider");
  }
  return context;
}

export function ModulesProvider({ children }: { children: ReactNode }) {
  const [modules, setModules] = useState<Module[]>([
    {
      id: "data-management",
      name: "Data Management",
      isEnabled: true,
      isVisible: true,
      description: "Manage and analyze data",
      category: "core",
      features: {},
    },
    {
      id: "admin",
      name: "Administration",
      isEnabled: true,
      isVisible: true,
      description: "System administration",
      category: "core",
      features: {},
    },
  ]);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const enableModule = (id: string) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === id ? { ...module, isEnabled: true, enabled: true } : module
      )
    );
  };

  const disableModule = (id: string) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === id ? { ...module, isEnabled: false, enabled: false } : module
      )
    );
  };

  const toggleModule = (id: string) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === id ? { 
          ...module, 
          isEnabled: !module.isEnabled, 
          enabled: !module.isEnabled 
        } : module
      )
    );
  };

  const toggleModuleVisibility = (id: string) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === id ? { ...module, isVisible: !module.isVisible } : module
      )
    );
  };

  const refreshModules = () => {
    // In a real implementation, this would fetch modules from an API
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const isFeatureEnabled = (featureId: string): boolean => {
    // Simple implementation to check if any module has this feature enabled
    return modules.some(module => 
      module.isEnabled && module.features && module.features[featureId] === true
    );
  };

  return (
    <ModulesContext.Provider
      value={{ 
        modules, 
        loading, 
        error, 
        enableModule, 
        disableModule, 
        toggleModuleVisibility,
        toggleModule,
        refreshModules,
        isFeatureEnabled
      }}
    >
      {children}
    </ModulesContext.Provider>
  );
}
