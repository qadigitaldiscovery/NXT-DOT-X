import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
export const useVendorSupplierIntegration = () => {
    const [vendors, setVendors] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: vendorData, error: vendorError } = await supabase
                    .from('vendors')
                    .select('*')
                    .eq('type', 'vendor');
                if (vendorError)
                    throw vendorError;
                const { data: supplierData, error: supplierError } = await supabase
                    .from('vendors')
                    .select('*')
                    .eq('type', 'supplier');
                if (supplierError)
                    throw supplierError;
                setVendors(vendorData || []);
                setSuppliers(supplierData || []);
            }
            catch (err) {
                setError(err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return { vendors, suppliers, loading, error };
};
