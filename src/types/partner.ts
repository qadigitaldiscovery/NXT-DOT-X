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
    id: vendor.id || '',
    type: 'vendor',
    name: (vendor as any).name || vendor.company_name || '',
    credit_rating: (vendor as any).credit_rating || 'B',
    status: (vendor as any).status || 'active',
    email: (vendor as any).email,
    phone: (vendor as any).phone,
    website: (vendor as any).website,
    address: (vendor as any).address || undefined,
    company_name: vendor.company_name,
  };
}

export function supplierToPartner(supplier: ApiSupplier | LocalSupplier): Partner {
  return {
    id: supplier.id || '',
    type: 'supplier',
    name: supplier.name || '',
    credit_rating: (supplier as any).credit_rating || 'B',
    status: supplier.status || 'active',
    email: supplier.email || undefined,
    phone: supplier.phone || undefined,
    website: (supplier as any).website || undefined,
    address: supplier.address || undefined,
  };
}