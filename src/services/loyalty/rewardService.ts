import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LoyaltyReward } from "./types";

export const rewardService = {
  // Get all active rewards
  async getActiveRewards(): Promise<LoyaltyReward[]> {
    try {
      const { data, error } = await (supabase
        .from('loyalty_rewards_v1' as any)
        .select('*')
        .eq('is_active', true)
        .order('points_cost', { ascending: true }) as any);
        
      if (error) throw error;
      return (data || []) as LoyaltyReward[];
    } catch (error) {
      console.error('Error in getActiveRewards:', error);
      toast.error('Failed to retrieve rewards');
      return [];
    }
  },
  
  // Redeem a reward
  async redeemReward(loyaltyId: number, rewardId: number): Promise<{success: boolean, message: string}> {
    try {
      // 1. Get the account
      const { data: account, error: accountError } = await (supabase
        .from('loyalty_accounts' as any)
        .select('*')
        .eq('loyalty_id', loyaltyId)
        .single() as any);
      
      if (accountError || !account) {
        throw new Error('Failed to find loyalty account');
      }
      
      // 2. Get the reward
      const { data: reward, error: rewardError } = await (supabase
        .from('loyalty_rewards_v1' as any)
        .select('*')
        .eq('reward_id', rewardId)
        .single() as any);
      
      if (rewardError || !reward) {
        throw new Error('Failed to find reward');
      }
      
      // 3. Check if user has enough points
      if ((account as any).points_balance < (reward as any).points_cost) {
        return { 
          success: false, 
          message: `Not enough points. You need ${(reward as any).points_cost} points but have ${(account as any).points_balance}.`
        };
      }
      
      // 4. Create redemption transaction
      const { error: transactionError } = await (supabase
        .from('loyalty_transactions' as any)
        .insert({
          loyalty_id: loyaltyId,
          transaction_type: 'REDEMPTION',
          points_amount: -(reward as any).points_cost, // Negative as points are being spent
          description: `Redeemed: ${(reward as any).reward_name}`,
        }) as any);
      
      if (transactionError) {
        throw transactionError;
      }
      
      // 5. Update account balance
      const newBalance = (account as any).points_balance - (reward as any).points_cost;
      const { error: updateError } = await (supabase
        .from('loyalty_accounts' as any)
        .update({ 
          points_balance: newBalance,
          last_activity_date: new Date().toISOString()
        })
        .eq('loyalty_id', loyaltyId) as any);
      
      if (updateError) {
        throw updateError;
      }
      
      // 6. Return success with redemption instructions
      return { 
        success: true, 
        message: (reward as any).redemption_instructions_v1 || 'Reward redeemed successfully!'
      };
    } catch (error) {
      console.error('Error in redeemReward:', error);
      return { success: false, message: 'Failed to redeem reward due to system error' };
    }
  }
};
