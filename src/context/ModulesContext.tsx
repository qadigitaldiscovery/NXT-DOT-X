import React, {
  createContext,
  // No-op change
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

/* ──────────────── types ──────────────── */
interface FeatureMap {
  [key: string]: boolean;
}

export interface Module {
  id: string;
  name: string;
  enabled: boolean;
  features: FeatureMap;
}

interface ModulesContextType {
  modules: Module[];
  loading: boolean;
  isModuleEnabled: (moduleId: string) => boolean;
  isFeatureEnabled: (featureId: string) => boolean;
  toggleModule: (moduleId: string) => void;
  toggleFeature: (featureId: string) => void;
}

/* ──────────────── context ──────────────── */
const ModulesContext = createContext<ModulesContextType | undefined>(undefined);

export const useModules = () => {
  const ctx = useContext(ModulesContext);
  if (!ctx) throw new Error('useModules must be used inside ModulesProvider');
  return ctx;
};

/* ──────────────── provider ──────────────── */
export const ModulesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  /* seed with your demo data (or fetch from API) */
  useEffect(() => {
    const demo: Module[] = [
      {
        id: 'suppliers',
        name: 'Suppliers',
        enabled: true,
        features: {
          'credit-rating': true,
          'performance-tracking': true,
          reports: true,
        },
      },
      // add more modules here
    ];

    // simulate async load so `loading` is meaningful
    setTimeout(() => {
      setModules(demo);
      setLoading(false);
    }, 200);
  }, []);

  /* ── helpers ── */
  const isModuleEnabled = (id: string) =>
    modules.find(m => m.id === id)?.enabled ?? false;

  const isFeatureEnabled = (id: string) =>
    modules.some(m => m.features[id]);

  const toggleModule = (id: string) =>
    setModules(ms =>
      ms.map(m => (m.id === id ? { ...m, enabled: !m.enabled } : m)),
    );

  const toggleFeature = (id: string) =>
    setModules(ms =>
      ms.map(m => ({
        ...m,
        features: {
          ...m.features,
          [id]: !m.features[id],
        },
      })),
    );

  return (
    <ModulesContext.Provider
      value={{
        modules,
        loading,
        isModuleEnabled,
        isFeatureEnabled,
        toggleModule,
        toggleFeature,
      }}
    >
      {children}
    </ModulesContext.Provider>
  );
};
