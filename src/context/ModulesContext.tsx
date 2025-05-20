
import React, { createContext, useContext, useState, useEffect } from "react";

type Module = {
  id: string;
  name: string;
  isEnabled: boolean;
  isVisible: boolean;
  description?: string;
  version?: string;
  category?: string;
};

type ModulesContextType = {
  modules: Module[];
  enableModule: (id: string) => void;
  disableModule: (id: string) => void;
  toggleModuleVisibility: (id: string) => void;
};

const ModulesContext = createContext<ModulesContextType | undefined>(undefined);

export function useModules() {
  const context = useContext(ModulesContext);
  if (context === undefined) {
    throw new Error("useModules must be used within a ModulesProvider");
  }
  return context;
}

export function ModulesProvider({ children }: { children: React.ReactNode }) {
  const [modules, setModules] = useState<Module[]>([
    {
      id: "data-management",
      name: "Data Management",
      isEnabled: true,
      isVisible: true,
      description: "Manage and analyze data",
      category: "core",
    },
    {
      id: "admin",
      name: "Administration",
      isEnabled: true,
      isVisible: true,
      description: "System administration",
      category: "core",
    },
  ]);

  const enableModule = (id: string) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === id ? { ...module, isEnabled: true } : module
      )
    );
  };

  const disableModule = (id: string) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === id ? { ...module, isEnabled: false } : module
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

  return (
    <ModulesContext.Provider
      value={{ modules, enableModule, disableModule, toggleModuleVisibility }}
    >
      {children}
    </ModulesContext.Provider>
  );
}
