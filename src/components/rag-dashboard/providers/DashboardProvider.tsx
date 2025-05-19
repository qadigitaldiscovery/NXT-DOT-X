import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/toast';

interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  totalDocuments: number;
  processedQueries: number;
}

interface DashboardQuery {
  id: string;
  query: string;
  timestamp: string;
  status: 'completed' | 'failed' | 'processing';
}

interface DashboardData {
  metrics: DashboardMetrics;
  recentQueries: DashboardQuery[];
}

interface DashboardContextType {
  result: DashboardData | null;
  loading: boolean;
  error: Error | null;
  refreshData: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: React.ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [result, setResult] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(new Error(errorMessage));
      toast.error({
        title: 'Error',
        description: errorMessage
      });
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

  return (
    <DashboardContext.Provider value={{ result, loading, error, refreshData }}>
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

export type { DashboardData, DashboardMetrics, DashboardQuery };
