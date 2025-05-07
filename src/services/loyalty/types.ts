
// Types for loyalty program
export type LoyaltyAccount = {
  loyalty_id: number;
  user_id: string;
  points_balance: number;
  tier_level: string;
  join_date: string;
  last_activity_date: string | null;
  tier_assigned_date: string | null;
  next_tier_evaluation_date: string | null;
};

export type LoyaltyTier = {
  tier_id: number;
  tier_name: string;
  min_points_required: number;
  description_v1: string | null;
  benefits_summary_v1: string | null;
};

export type LoyaltyTransaction = {
  transaction_id: number;
  loyalty_id: number;
  transaction_type: string;
  points_amount: number;
  description: string | null;
  transaction_date: string;
  reference_id: string | null;
  related_order_value: number | null;
  points_expiry_date: string | null;
};

export type LoyaltyReward = {
  reward_id: number;
  reward_name: string;
  reward_type: string;
  points_cost: number;
  value_monetary: number | null;
  description_v1: string | null;
  is_active: boolean;
  redemption_instructions_v1: string | null;
};

// Types for service parameters
export type TransactionParams = {
  loyalty_id: number;
  transaction_type: string;
  points_amount: number;
  description?: string | null;
  reference_id?: string | null;
  related_order_value?: number | null;
  points_expiry_date?: string | null;
};
