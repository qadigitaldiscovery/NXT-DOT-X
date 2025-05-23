
export interface SubScore {
  category: string;
  score: number;
  weight: number;
}

export interface VendorDetail {
  id: string;
  company_name: string;
  local_score: number;
  created_at: string;
  sub_scores?: SubScore[];
}
