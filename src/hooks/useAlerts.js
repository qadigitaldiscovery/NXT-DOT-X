import { useState, useEffect, useCallback } from 'react';
export function useAlerts() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchAlerts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // For now, we're returning mock data since we haven't created the alerts table yet
            const mockAlerts = [
                {
                    id: '1',
                    module_id: '1',
                    title: 'High CPU Usage',
                    description: 'CPU usage exceeded 90% for more than 5 minutes',
                    severity: 'high',
                    created_at: new Date(Date.now() - 3600000).toISOString(),
                    resolved: false,
                    resolved_at: null,
                    triggered_at: new Date(Date.now() - 3600000).toISOString()
                },
                {
                    id: '2',
                    module_id: '3',
                    title: 'Service Unavailable',
                    description: 'Service has been unreachable for 10 minutes',
                    severity: 'critical',
                    created_at: new Date(Date.now() - 7200000).toISOString(),
                    resolved: false,
                    resolved_at: null,
                    triggered_at: new Date(Date.now() - 7200000).toISOString()
                },
                {
                    id: '3',
                    module_id: '2',
                    title: 'Memory Leak Detected',
                    description: 'Gradual increase in memory usage detected',
                    severity: 'medium',
                    created_at: new Date(Date.now() - 86400000).toISOString(),
                    resolved: true,
                    resolved_at: new Date(Date.now() - 43200000).toISOString(),
                    triggered_at: new Date(Date.now() - 86400000).toISOString()
                }
            ];
            setAlerts(mockAlerts);
        }
        catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchAlerts();
    }, [fetchAlerts]);
    const resolveAlert = async (id) => {
        // In a real implementation, this would update the database
        setAlerts(prev => prev.map(alert => alert.id === id
            ? { ...alert, resolved: true, resolved_at: new Date().toISOString() }
            : alert));
        return { success: true, error: null };
    };
    // Add the missing getAlertsByModuleId function
    const getAlertsByModuleId = useCallback((moduleId) => {
        return Promise.resolve(alerts.filter(alert => alert.module_id === moduleId));
    }, [alerts]);
    return { alerts, loading, error, resolveAlert, getAlertsByModuleId };
}
