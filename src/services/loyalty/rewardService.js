import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
export const rewardService = {
    // Get all active rewards
    async getActiveRewards() {
        try {
            const { data, error } = await supabase
                .from('loyalty_rewards_v1')
                .select('*')
                .eq('is_active', true)
                .order('points_cost', { ascending: true });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Error in getActiveRewards:', error);
            toast.error('Failed to retrieve rewards');
            return [];
        }
    },
    // Redeem a reward
    async redeemReward(loyaltyId, rewardId) {
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
        }
        catch (error) {
            console.error('Error in redeemReward:', error);
            return { success: false, message: 'Failed to redeem reward due to system error' };
        }
    }
};
