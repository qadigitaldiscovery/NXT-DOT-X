import React, { createContext, useContext, useState } from 'react';

interface Module {
  id: string;
  name: string;
  enabled: boolean;
  features: {
    [key: string]: boolean;
  };
}

interface ModulesContextType {
  modules: Module[];
  isModuleEnabled: (moduleId: string) => boolean;
  isFeatureEnabled: (moduleId: string, featureId: string) => boolean;
  toggleModule: (moduleId: string) => void;
  toggleFeature: (moduleId: string, featureId: string) => void;
}

const ModulesContext = createContext<ModulesContextType | undefined>(undefined);

export function ModulesProvider({ children }: { children: React.ReactNode }) {
  const [modules] = useState<Module[]>([
    {
      id: 'suppliers',
      name: 'Suppliers',
      enabled: true,
      features: {
        'credit-rating': true,
        'performance-tracking': true,
        'reports': true
      }
    },
    // Add more modules as needed
  ]);

  const isModuleEnabled = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    return module?.enabled ?? false;
  };

  const isFeatureEnabled = (moduleId: string, featureId: string) => {
    const module = modules.find(m => m.id === moduleId);
    return module?.features[featureId] ?? false;
  };

  const toggleModule = (moduleId: string) => {
    // Implementation for toggling module state
    console.log('Toggle module:', moduleId);
  };

  const toggleFeature = (moduleId: string, featureId: string) => {
    // Implementation for toggling feature state
    console.log('Toggle feature:', moduleId, featureId);
  };

  return (
    <ModulesContext.Provider 
      value={{ 
        modules, 
        isModuleEnabled, 
        isFeatureEnabled, 
        toggleModule, 
        toggleFeature 
      }}
    >
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
