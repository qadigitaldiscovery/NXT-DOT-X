import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase-client';

export interface SupplierDetail {
  id: string;
  businessName: string;
  creditRating: {
    grade: string;
    description: string;
    lastUpdated: string;
  };
  creditLimit: number;
  localScore: number;
  historicalPerformance: {
    date: string;
    score: number;
  }[];
  marketData: {
    industryRank: number;
    marketShare: number;
    growthTrend: 'up' | 'down' | 'stable';
  };
  contracts: {
    id: string;
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    value: number;
  }[];
  events: {
    id: string;
    type: string;
    date: string;
    description: string;
    status: string;
  }[];
  messages: {
    id: string;
    date: string;
    subject: string;
    status: 'read' | 'unread';
  }[];
  files: {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    size: number;
  }[];
  forms: {
    id: string;
    name: string;
    status: string;
    dueDate: string;
  }[];
  users: {
    id: string;
    name: string;
    role: string;
    status: string;
  }[];
  tracking: {
    metrics: {
      onTimeDelivery: number;
      qualityScore: number;
      responseTime: number;
    };
    history: {
      date: string;
      event: string;
      status: string;
    }[];
  };
  risk: {
    level: 'Low' | 'Medium' | 'High';
    factors: string[];
    assessment: {
      date: string;
      score: number;
      details: string;
    };
  };
  spend: {
    current: number;
    historical: {
      date: string;
      amount: number;
    }[];
    analysis: {
      trend: string;
      forecast: number;
    };
  };
}

export function useSupplierDetail(supplierId: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [supplier, setSupplier] = useState<SupplierDetail | null>(null);

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

      if (supplierError) throw supplierError;

      // Fetch related data
      const [
        { data: contracts },
        { data: events },
        { data: messages },
        { data: files },
        { data: users },
        { data: tracking },
        { data: risk },
        { data: spend }
      ] = await Promise.all([
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

    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch supplier detail'));
    } finally {
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
