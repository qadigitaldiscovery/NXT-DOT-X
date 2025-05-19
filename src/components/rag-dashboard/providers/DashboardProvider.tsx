import { createContext, useContext, useState, useEffect } from 'react';
import { useModules } from '@/hooks/useModules';

interface DashboardContextType {
  result: any; // TODO: Define proper type
  loading: boolean;
  error: Error | null;
  refreshData: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: React.ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { modules } = useModules();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch dashboard data here
      const response = await fetch('/api/dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const refreshData = async () => {
    await fetchDashboardData();
  };

  const value = {
    result,
    loading,
    error,
    refreshData
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
