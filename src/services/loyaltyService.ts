
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Types
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

// Service methods
export const loyaltyService = {
  // Get or create a loyalty account for the current user
  async getOrCreateAccount(userId: string): Promise<LoyaltyAccount | null> {
    try {
      // First try to get existing account
      const { data: existingAccount, error: fetchError } = await supabase
        .from('loyalty_accounts')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (existingAccount) {
        return existingAccount;
      }
      
      // If no account exists, create one with welcome bonus
      if (fetchError) {
        // Create new account
        const { data: newAccount, error: createError } = await supabase
          .from('loyalty_accounts')
          .insert([{ user_id: userId }])
          .select()
          .single();
          
        if (createError) throw createError;
        
        if (newAccount) {
          // Add welcome bonus transaction (100 points)
          await this.addTransaction({
            loyalty_id: newAccount.loyalty_id,
            transaction_type: 'ACCOUNT_CREATION_BONUS',
            points_amount: 100,
            description: 'Welcome bonus for joining the loyalty program',
          });
          
          // Update points balance
          const { error: updateError } = await supabase
            .from('loyalty_accounts')
            .update({ points_balance: 100 })
            .eq('loyalty_id', newAccount.loyalty_id);
          
          if (updateError) throw updateError;
          
          // Fetch updated account
          const { data: updatedAccount, error: refreshError } = await supabase
            .from('loyalty_accounts')
            .select('*')
            .eq('user_id', userId)
            .single();
          
          if (refreshError) throw refreshError;
          return updatedAccount;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error in getOrCreateAccount:', error);
      toast.error('Failed to retrieve loyalty account');
      return null;
    }
  },
  
  // Get account by user ID
  async getAccountByUserId(userId: string): Promise<LoyaltyAccount | null> {
    try {
      const { data, error } = await supabase
        .from('loyalty_accounts')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error in getAccountByUserId:', error);
      return null;
    }
  },
  
  // Get all loyalty tiers
  async getAllTiers(): Promise<LoyaltyTier[]> {
    try {
      const { data, error } = await supabase
        .from('loyalty_tiers')
        .select('*')
        .order('min_points_required', { ascending: true });
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error in getAllTiers:', error);
      toast.error('Failed to retrieve loyalty tiers');
      return [];
    }
  },
  
  // Get all active rewards
  async getActiveRewards(): Promise<LoyaltyReward[]> {
    try {
      const { data, error } = await supabase
        .from('loyalty_rewards_v1')
        .select('*')
        .eq('is_active', true)
        .order('points_cost', { ascending: true });
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error in getActiveRewards:', error);
      toast.error('Failed to retrieve rewards');
      return [];
    }
  },
  
  // Get transactions for a loyalty account
  async getTransactions(loyaltyId: number): Promise<LoyaltyTransaction[]> {
    try {
      const { data, error } = await supabase
        .from('loyalty_transactions')
        .select('*')
        .eq('loyalty_id', loyaltyId)
        .order('transaction_date', { ascending: false });
        
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error in getTransactions:', error);
      toast.error('Failed to retrieve transactions');
      return [];
    }
  },
  
  // Add a transaction
  async addTransaction(transaction: {
    loyalty_id: number;
    transaction_type: string;
    points_amount: number;
    description?: string | null;
    reference_id?: string | null;
    related_order_value?: number | null;
    points_expiry_date?: string | null;
  }): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('loyalty_transactions')
        .insert(transaction);
        
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error in addTransaction:', error);
      toast.error('Failed to record transaction');
      return false;
    }
  },
  
  // Redeem a reward
  async redeemReward(loyaltyId: number, rewardId: number): Promise<{success: boolean, message: string}> {
    try {
      // 1. Get the account
      const { data: account, error: accountError } = await supabase
        .from('loyalty_accounts')
        .select('*')
        .eq('loyalty_id', loyaltyId)
        .single();
      
      if (accountError || !account) {
        throw new Error('Failed to find loyalty account');
      }
      
      // 2. Get the reward
      const { data: reward, error: rewardError } = await supabase
        .from('loyalty_rewards_v1')
        .select('*')
        .eq('reward_id', rewardId)
        .single();
      
      if (rewardError || !reward) {
        throw new Error('Failed to find reward');
      }
      
      // 3. Check if user has enough points
      if (account.points_balance < reward.points_cost) {
        return { 
          success: false, 
          message: `Not enough points. You need ${reward.points_cost} points but have ${account.points_balance}.`
        };
      }
      
      // 4. Create redemption transaction
      const { error: transactionError } = await supabase
        .from('loyalty_transactions')
        .insert({
          loyalty_id: loyaltyId,
          transaction_type: 'REDEMPTION',
          points_amount: -reward.points_cost, // Negative as points are being spent
          description: `Redeemed: ${reward.reward_name}`,
        });
      
      if (transactionError) {
        throw transactionError;
      }
      
      // 5. Update account balance
      const newBalance = account.points_balance - reward.points_cost;
      const { error: updateError } = await supabase
        .from('loyalty_accounts')
        .update({ 
          points_balance: newBalance,
          last_activity_date: new Date().toISOString()
        })
        .eq('loyalty_id', loyaltyId);
      
      if (updateError) {
        throw updateError;
      }
      
      // 6. Return success with redemption instructions
      return { 
        success: true, 
        message: reward.redemption_instructions_v1 || 'Reward redeemed successfully!'
      };
    } catch (error) {
      console.error('Error in redeemReward:', error);
      return { success: false, message: 'Failed to redeem reward due to system error' };
    }
  },
  
  // Calculate points from purchase amount
  calculatePointsFromPurchase(purchaseAmount: number): number {
    // V1 logic: 1 point per $1
    return Math.floor(purchaseAmount);
  }
};
