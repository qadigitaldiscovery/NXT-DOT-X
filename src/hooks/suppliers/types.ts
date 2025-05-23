
export interface Supplier {
  id: string;
  name: string;
  code: string;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  status: string;
  contact_name?: string | null;
  payment_terms?: string | null;
  discount_structure?: any;
  created_at?: string | null;
  updated_at?: string | null;
}
