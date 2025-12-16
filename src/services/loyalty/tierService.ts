import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LoyaltyTier } from "./types";

export const tierService = {
  // Get all loyalty tiers
  async getAllTiers(): Promise<LoyaltyTier[]> {
    try {
      const { data, error } = await (supabase
        .from('loyalty_tiers' as any)
        .select('*')
        .order('min_points_required', { ascending: true }) as any);
        
      if (error) throw error;
      return (data || []) as LoyaltyTier[];
    } catch (error) {
      console.error('Error in getAllTiers:', error);
      toast.error('Failed to retrieve loyalty tiers');
      return [];
    }
  }
};
