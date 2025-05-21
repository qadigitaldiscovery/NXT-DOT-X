import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/toast';
const DashboardContext = createContext(undefined);
export function DashboardProvider({ children }) {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(new Error(errorMessage));
            toast.error({
                title: 'Error',
                description: errorMessage
            });
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDashboardData();
    }, []);
    const refreshData = async () => {
        await fetchDashboardData();
    };
    return (_jsx(DashboardContext.Provider, { value: { result, loading, error, refreshData }, children: children }));
}
export function useDashboard() {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
}
