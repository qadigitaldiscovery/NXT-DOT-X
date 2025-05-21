import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
export const useKpiIndicators = () => {
    const [kpis, setKpis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchKpis = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('kpi_indicators')
                .select('*')
                .order('module_name', { ascending: true });
            if (error)
                throw error;
            // Explicitly cast the data to our KpiIndicator type to ensure type safety
            setKpis(data || []);
        }
        catch (err) {
            console.error('Error fetching KPI indicators:', err);
            setError(err instanceof Error ? err : new Error('Unknown error fetching KPIs'));
        }
        finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchKpis();
    }, [fetchKpis]);
    const createKpi = useCallback(async (kpiData) => {
        try {
            const { data, error } = await supabase
                .from('kpi_indicators')
                .insert([kpiData])
                .select('*')
                .single();
            if (error)
                throw error;
            setKpis(prevKpis => [...prevKpis, data]);
            toast.success('KPI indicator created successfully');
            return { success: true, data: data };
        }
        catch (err) {
            console.error('Error creating KPI indicator:', err);
            toast.error('Failed to create KPI indicator');
            return { success: false, error: err };
        }
    }, []);
    const updateKpi = useCallback(async ({ id, ...updateData }) => {
        try {
            const { data, error } = await supabase
                .from('kpi_indicators')
                .update(updateData)
                .eq('id', id)
                .select('*')
                .single();
            if (error)
                throw error;
            setKpis(prevKpis => prevKpis.map(kpi => kpi.id === id ? { ...kpi, ...data } : kpi));
            toast.success('KPI indicator updated successfully');
            return { success: true, data: data };
        }
        catch (err) {
            console.error('Error updating KPI indicator:', err);
            toast.error('Failed to update KPI indicator');
            return { success: false, error: err };
        }
    }, []);
    const deleteKpi = useCallback(async (id) => {
        try {
            const { error } = await supabase
                .from('kpi_indicators')
                .delete()
                .eq('id', id);
            if (error)
                throw error;
            setKpis(prevKpis => prevKpis.filter(kpi => kpi.id !== id));
            toast.success('KPI indicator deleted successfully');
            return { success: true };
        }
        catch (err) {
            console.error('Error deleting KPI indicator:', err);
            toast.error('Failed to delete KPI indicator');
            return { success: false, error: err };
        }
    }, []);
    const refreshKpis = useCallback(async () => {
        await fetchKpis();
        return { success: true };
    }, [fetchKpis]);
    return { kpis, loading, error, createKpi, updateKpi, deleteKpi, refreshKpis };
};
