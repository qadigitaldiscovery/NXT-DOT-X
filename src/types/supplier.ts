
export interface Supplier {
  id: string;
  name: string;
  code: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  description?: string;
  annual_spend?: string | number;
  payment_terms?: string;
  status?: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
  credit_rating?: 'A' | 'B' | 'C' | 'D' | 'F';
  contact_name?: string;
}
