import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase-client';
import { Partner, Vendor, Supplier } from '../types/partners';

export function usePartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchPartners();
  }, []);

  async function fetchPartners() {
    try {
      setLoading(true);
      
      // Fetch both vendors and suppliers
      const [vendorsResponse, suppliersResponse] = await Promise.all([
        supabase
          .from('partners')
          .select('*')
          .eq('type', 'vendor'),
        supabase
          .from('partners')
          .select('*')
          .eq('type', 'supplier')
      ]);

      if (vendorsResponse.error) throw vendorsResponse.error;
      if (suppliersResponse.error) throw suppliersResponse.error;

      const vendors = vendorsResponse.data as Vendor[];
      const suppliers = suppliersResponse.data as Supplier[];
      
      setPartners([...vendors, ...suppliers]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch partners'));
    } finally {
      setLoading(false);
    }
  }

  async function addPartner(partner: Omit<Partner, 'id'>) {
    try {
      const { data, error } = await supabase
        .from('partners')
        .insert([partner])
        .select()
        .single();

      if (error) throw error;

      setPartners(prev => [...prev, data as Partner]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add partner'));
      throw err;
    }
  }

  async function updatePartner(id: string, updates: Partial<Partner>) {
    try {
      const { data, error } = await supabase
        .from('partners')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setPartners(prev => 
        prev.map(partner => 
          partner.id === id ? { ...partner, ...data } as Partner : partner
        )
      );
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update partner'));
      throw err;
    }
  }

  async function deletePartner(id: string) {
    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPartners(prev => prev.filter(partner => partner.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete partner'));
      throw err;
    }
  }

  return {
    partners,
    vendors: partners.filter((p): p is Vendor => p.type === 'vendor'),
    suppliers: partners.filter((p): p is Supplier => p.type === 'supplier'),
    loading,
    error,
    addPartner,
    updatePartner,
    deletePartner,
    refreshPartners: fetchPartners
  };
}
