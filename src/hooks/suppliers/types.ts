
export interface Supplier {
  id: string;
  name: string;
  code?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  notes?: string | null;
  rating?: number | null;
  status?: string | null;
  contact_name?: string | null;
  payment_terms?: string | null;
  discount_structure?: any;
  user_id?: string;
  created_at?: string | null;
  updated_at?: string | null;
}
