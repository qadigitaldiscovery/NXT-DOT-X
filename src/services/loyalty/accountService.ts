
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LoyaltyAccount } from "./types";
import { transactionService } from "./transactionService";

export const accountService = {
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
          await transactionService.addTransaction({
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
  }
};
