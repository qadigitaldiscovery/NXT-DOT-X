
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type SupplierCost = {
  id: string;
  supplier_id: string;
  product_id: string;
  supplier_sku: string | null;
  cost: number;
  currency_code: string;
  cost_in_base_currency: number | null;
  effective_date: string;
  expiry_date: string | null;
  status: string;
  is_promotional: boolean;
  is_contract: boolean;
  min_qty: number;
  max_qty: number | null;
  notes: string | null;
  // Joined fields
  product_name?: string;
  product_sku?: string;
  supplier_name?: string;
};

export type CostFilterOptions = {
  supplierId?: string;
  productId?: string;
  status?: string;
  isPromo?: boolean;
  isContract?: boolean;
  effectiveDateStart?: string;
  effectiveDateEnd?: string;
};

export function useSupplierCosts(filters: CostFilterOptions = {}) {
  return useQuery({
    queryKey: ['supplier-costs', filters],
    queryFn: async () => {
      let query = supabase
        .from('supplier_product_costs')
        .select(`
          *,
          products:product_id (name, sku),
          suppliers:supplier_id (name)
        `);

      if (filters.supplierId) {
        query = query.eq('supplier_id', filters.supplierId);
      }
      
      if (filters.productId) {
        query = query.eq('product_id', filters.productId);
      }
      
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters.isPromo !== undefined) {
        query = query.eq('is_promotional', filters.isPromo);
      }
      
      if (filters.isContract !== undefined) {
        query = query.eq('is_contract', filters.isContract);
      }
      
      if (filters.effectiveDateStart) {
        query = query.gte('effective_date', filters.effectiveDateStart);
      }
      
      if (filters.effectiveDateEnd) {
        query = query.lte('effective_date', filters.effectiveDateEnd);
      }
      
      const { data, error } = await query.order('effective_date', { ascending: false });
      
      if (error) {
        console.error('Error fetching supplier costs:', error);
        toast.error('Failed to load supplier costs');
        throw error;
      }
      
      // Transform the nested objects into flattened structure
      const transformedData = data.map(item => ({
        ...item,
        product_name: item.products?.name || 'Unknown Product',
        product_sku: item.products?.sku || 'Unknown SKU',
        supplier_name: item.suppliers?.name || 'Unknown Supplier',
        products: undefined,
        suppliers: undefined
      }));
      
      return transformedData as SupplierCost[];
    }
  });
}

export function useSupplierCostHistory(costId: string | undefined) {
  return useQuery({
    queryKey: ['supplier-cost-history', costId],
    queryFn: async () => {
      if (!costId) return [];
      
      const { data, error } = await supabase
        .from('supplier_cost_history')
        .select(`
          *,
          products:product_id (name, sku),
          suppliers:supplier_id (name)
        `)
        .eq('cost_id', costId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error(`Error fetching cost history for ${costId}:`, error);
        toast.error('Failed to load cost history');
        throw error;
      }
      
      return data;
    },
    enabled: !!costId
  });
}

export function useCreateSupplierCost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (cost: Omit<SupplierCost, 'id' | 'product_name' | 'product_sku' | 'supplier_name'>) => {
      const { data, error } = await supabase
        .from('supplier_product_costs')
        .insert(cost)
        .select()
        .single();
      
      if (error) {
        console.error('Error creating supplier cost:', error);
        toast.error('Failed to create supplier cost');
        throw error;
      }
      
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['supplier-costs'] });
      toast.success('Supplier cost created successfully');
    }
  });
}

export function useUpdateSupplierCost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, product_name, product_sku, supplier_name, ...cost }: SupplierCost) => {
      // First retrieve the current cost to create history record
      const { data: currentCost, error: fetchError } = await supabase
        .from('supplier_product_costs')
        .select('*')
        .eq('id', id)
        .single();
      
      if (fetchError) {
        console.error(`Error fetching current cost for ${id}:`, fetchError);
        toast.error('Failed to update supplier cost');
        throw fetchError;
      }
      
      // Create a history record if cost changed
      if (currentCost && currentCost.cost !== cost.cost) {
        const changePercentage = ((cost.cost - currentCost.cost) / currentCost.cost) * 100;
        
        await supabase.from('supplier_cost_history').insert({
          cost_id: id,
          supplier_id: cost.supplier_id,
          product_id: cost.product_id,
          previous_cost: currentCost.cost,
          new_cost: cost.cost,
          change_percentage: changePercentage,
          currency_code: cost.currency_code,
          change_reason: cost.notes || 'Manual update'
        });
      }
      
      // Update the cost record
      const { data, error } = await supabase
        .from('supplier_product_costs')
        .update(cost)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error(`Error updating supplier cost ${id}:`, error);
        toast.error('Failed to update supplier cost');
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier-costs'] });
      toast.success('Supplier cost updated successfully');
    }
  });
}

export function useDeleteSupplierCost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('supplier_product_costs')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error(`Error deleting supplier cost ${id}:`, error);
        toast.error('Failed to delete supplier cost');
        throw error;
      }
      
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supplier-costs'] });
      toast.success('Supplier cost deleted successfully');
    }
  });
}
