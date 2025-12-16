import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LoyaltyAccount } from "./types";
import { transactionService } from "./transactionService";

export const accountService = {
  // Get or create a loyalty account for the current user
  async getOrCreateAccount(userId: string): Promise<LoyaltyAccount | null> {
    try {
      // First try to get existing account
      const { data: existingAccount, error: fetchError } = await (supabase
        .from('loyalty_accounts' as any)
        .select('*')
        .eq('user_id', userId)
        .single() as any);

      if (existingAccount) {
        return existingAccount as LoyaltyAccount;
      }
      
      // If no account exists, create one with welcome bonus
      if (fetchError) {
        // Create new account
        const { data: newAccount, error: createError } = await (supabase
          .from('loyalty_accounts' as any)
          .insert([{ user_id: userId }])
          .select()
          .single() as any);
          
        if (createError) throw createError;
        
        if (newAccount) {
          // Add welcome bonus transaction (100 points)
          await transactionService.addTransaction({
            loyalty_id: (newAccount as any).loyalty_id,
            transaction_type: 'ACCOUNT_CREATION_BONUS',
            points_amount: 100,
            description: 'Welcome bonus for joining the loyalty program',
          });
          
          // Update points balance
          const { error: updateError } = await (supabase
            .from('loyalty_accounts' as any)
            .update({ points_balance: 100 })
            .eq('loyalty_id', (newAccount as any).loyalty_id) as any);
          
          if (updateError) throw updateError;
          
          // Fetch updated account
          const { data: updatedAccount, error: refreshError } = await (supabase
            .from('loyalty_accounts' as any)
            .select('*')
            .eq('user_id', userId)
            .single() as any);
          
          if (refreshError) throw refreshError;
          return updatedAccount as LoyaltyAccount;
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
      const { data, error } = await (supabase
        .from('loyalty_accounts' as any)
        .select('*')
        .eq('user_id', userId)
        .single() as any);
        
      if (error) throw error;
      return data as LoyaltyAccount;
    } catch (error) {
      console.error('Error in getAccountByUserId:', error);
      return null;
    }
  }
};
