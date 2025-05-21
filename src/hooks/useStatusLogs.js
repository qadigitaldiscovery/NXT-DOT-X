import { useState, useCallback, useEffect } from 'react';
export const useStatusLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchLogs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Mock data for now - in a real app, this would fetch from an API
            const mockLogs = [
                {
                    id: '1',
                    module_id: 'module-1',
                    timestamp: new Date(Date.now() - 3600000).toISOString(),
                    recorded_at: new Date(Date.now() - 3600000).toISOString(), // Added recorded_at
                    status: 'green',
                    message: 'System operating normally',
                    note: 'System operating normally' // Added note
                },
                {
                    id: '2',
                    module_id: 'module-1',
                    timestamp: new Date(Date.now() - 7200000).toISOString(),
                    recorded_at: new Date(Date.now() - 7200000).toISOString(), // Added recorded_at
                    status: 'orange',
                    message: 'Latency increased above threshold',
                    note: 'Latency increased above threshold' // Added note
                },
                {
                    id: '3',
                    module_id: 'module-2',
                    timestamp: new Date(Date.now() - 86400000).toISOString(),
                    recorded_at: new Date(Date.now() - 86400000).toISOString(), // Added recorded_at
                    status: 'red',
                    message: 'Service unavailable',
                    note: 'Service unavailable' // Added note
                }
            ];
            setLogs(mockLogs);
        }
        catch (err) {
            setError(err);
            console.error('Error fetching status logs:', err);
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);
    const getLogsByModuleId = useCallback((moduleId) => {
        // In a real app, this would be an API call
        // For now, we'll filter the mock data
        return Promise.resolve(logs.filter(log => log.module_id === moduleId));
    }, [logs]);
    return {
        logs,
        loading,
        error,
        fetchLogs,
        getLogsByModuleId
    };
};
