import { useState, useEffect, useCallback } from 'react';
export function useThresholdRules(moduleId) {
    const [rules, setRules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchRules = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // For now, we're returning mock data since we haven't created the threshold_rules table yet
            const mockRules = moduleId ? [
                {
                    id: '1',
                    module_id: moduleId,
                    metric: 'CPU Usage',
                    operator: '>',
                    condition: '>', // Alias for operator
                    threshold: 90,
                    duration_seconds: 300,
                    resulting_status: 'orange',
                    created_at: new Date().toISOString()
                }
            ] : [];
            setRules(mockRules);
        }
        catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
        }
        finally {
            setLoading(false);
        }
    }, [moduleId]);
    useEffect(() => {
        fetchRules();
    }, [fetchRules]);
    const addRule = async (rule) => {
        // In a real implementation, this would insert into the database
        const newRule = {
            ...rule,
            operator: rule.condition,
            condition: rule.condition, // Keep condition as an alias for operator
            id: Math.random().toString(),
            created_at: new Date().toISOString()
        };
        setRules(prev => [...prev, newRule]);
        return { success: true, error: null };
    };
    const deleteRule = async (id) => {
        // In a real implementation, this would delete from the database
        setRules(prev => prev.filter(rule => rule.id !== id));
        return { success: true, error: null };
    };
    // Add the missing getRulesByModuleId function
    const getRulesByModuleId = useCallback((moduleId) => {
        return Promise.resolve(rules.filter(rule => rule.module_id === moduleId));
    }, [rules]);
    return { rules, loading, error, addRule, deleteRule, getRulesByModuleId };
}
