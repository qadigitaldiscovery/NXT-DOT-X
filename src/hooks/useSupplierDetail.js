import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase-client';
export function useSupplierDetail(supplierId) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [supplier, setSupplier] = useState(null);
    useEffect(() => {
        fetchSupplierDetail();
    }, [supplierId]);
    async function fetchSupplierDetail() {
        try {
            setLoading(true);
            // Fetch main supplier data
            const { data: supplierData, error: supplierError } = await supabase
                .from('suppliers')
                .select('*')
                .eq('id', supplierId)
                .single();
            if (supplierError)
                throw supplierError;
            // Fetch related data
            const [{ data: contracts }, { data: events }, { data: messages }, { data: files }, { data: users }, { data: tracking }, { data: risk }, { data: spend }] = await Promise.all([
                supabase.from('supplier_contracts').select('*').eq('supplier_id', supplierId),
                supabase.from('supplier_events').select('*').eq('supplier_id', supplierId),
                supabase.from('supplier_messages').select('*').eq('supplier_id', supplierId),
                supabase.from('supplier_files').select('*').eq('supplier_id', supplierId),
                supabase.from('supplier_users').select('*').eq('supplier_id', supplierId),
                supabase.from('supplier_tracking').select('*').eq('supplier_id', supplierId),
                supabase.from('supplier_risk').select('*').eq('supplier_id', supplierId),
                supabase.from('supplier_spend').select('*').eq('supplier_id', supplierId)
            ]);
            setSupplier({
                ...supplierData,
                contracts: contracts || [],
                events: events || [],
                messages: messages || [],
                files: files || [],
                users: users || [],
                tracking: tracking?.[0] || { metrics: {}, history: [] },
                risk: risk?.[0] || { level: 'Low', factors: [], assessment: {} },
                spend: spend?.[0] || { current: 0, historical: [], analysis: {} }
            });
        }
        catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch supplier detail'));
        }
        finally {
            setLoading(false);
        }
    }
    return {
        supplier,
        loading,
        error,
        refreshSupplier: fetchSupplierDetail
    };
}
