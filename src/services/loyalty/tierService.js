import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
export const tierService = {
    // Get all loyalty tiers
    async getAllTiers() {
        try {
            const { data, error } = await supabase
                .from('loyalty_tiers')
                .select('*')
                .order('min_points_required', { ascending: true });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Error in getAllTiers:', error);
            toast.error('Failed to retrieve loyalty tiers');
            return [];
        }
    }
};
