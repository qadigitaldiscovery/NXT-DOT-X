
import { useState, useEffect } from 'react';

interface VendorSupplierData {
  id: string;
  name: string;
  type: 'vendor' | 'supplier';
  status: string;
}

export const useVendorSupplierIntegration = () => {
  const [vendors, setVendors] = useState<VendorSupplierData[]>([]);
  const [suppliers, setSuppliers] = useState<VendorSupplierData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Mock data
        const mockVendors: VendorSupplierData[] = [
          { id: '1', name: 'Vendor A', type: 'vendor', status: 'active' },
          { id: '2', name: 'Vendor B', type: 'vendor', status: 'inactive' }
        ];
        
        const mockSuppliers: VendorSupplierData[] = [
          { id: '1', name: 'Supplier A', type: 'supplier', status: 'active' },
          { id: '2', name: 'Supplier B', type: 'supplier', status: 'active' }
        ];
        
        setVendors(mockVendors);
        setSuppliers(mockSuppliers);
        setError(null);
      } catch (err) {
        console.error('Error fetching vendor/supplier data:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    vendors,
    suppliers,
    loading,
    error
  };
};
