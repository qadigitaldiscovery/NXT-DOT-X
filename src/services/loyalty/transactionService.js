import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
export const transactionService = {
    // Get transactions for a loyalty account
    async getTransactions(loyaltyId) {
        try {
            const { data, error } = await supabase
                .from('loyalty_transactions')
                .select('*')
                .eq('loyalty_id', loyaltyId)
                .order('transaction_date', { ascending: false });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Error in getTransactions:', error);
            toast.error('Failed to retrieve transactions');
            return [];
        }
    },
    // Add a transaction
    async addTransaction(transaction) {
        try {
            const { error } = await supabase
                .from('loyalty_transactions')
                .insert(transaction);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error('Error in addTransaction:', error);
            toast.error('Failed to record transaction');
            return false;
        }
    }
};
