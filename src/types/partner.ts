import { Supplier as LocalSupplier } from './supplier';
import { Vendor } from './vendor';
import { Supplier as ApiSupplier } from '@/hooks/suppliers/types';

// Define a union type that can represent either a vendor or supplier
export type PartnerType = 'vendor' | 'supplier';

// Define a unified Partner interface that combines properties from both types
export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  address?: string;
  description?: string;
  credit_rating?: 'A' | 'B' | 'C' | 'D' | 'F';
  annual_spend?: string | number;
  payment_terms?: string | null;
  status?: string;
  company_name?: string; // For compatibility with vendor records
  created_at?: string;
  updated_at?: string;
}

// Helper functions to convert between types
export function vendorToPartner(vendor: Vendor): Partner {
  return {
    ...vendor,
    id: vendor.id || '',
    type: 'vendor',
    name: vendor.name || vendor.company_name || '',
    credit_rating: vendor.credit_rating || 'B',
    status: vendor.status || 'active'
  };
}

export function supplierToPartner(supplier: ApiSupplier | LocalSupplier): Partner {
  return {
    ...supplier,
    id: supplier.id || '',
    type: 'supplier',
    credit_rating: (supplier as any).credit_rating || 'B',
    status: supplier.status || 'active'
  };
} 