
import { useState, useEffect } from 'react';
import { 
  loyaltyService, 
  LoyaltyAccount, 
  LoyaltyTier, 
  LoyaltyTransaction,
  LoyaltyReward
} from '@/services/loyalty';
import { supabase } from "@/integrations/supabase/client";

// Hook for managing loyalty account
export function useLoyaltyAccount() {
  const [account, setAccount] = useState<LoyaltyAccount | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAccount() {
      try {
        setLoading(true);
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }
        
        const accountData = await loyaltyService.getOrCreateAccount(user.id);
        setAccount(accountData);
      } catch (err) {
        console.error('Error fetching loyalty account:', err);
        setError('Failed to fetch loyalty account');
      } finally {
        setLoading(false);
      }
    }

    fetchAccount();
  }, []);

  return { account, loading, error };
}

// Hook for managing loyalty tiers
export function useLoyaltyTiers() {
  const [tiers, setTiers] = useState<LoyaltyTier[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTiers() {
      try {
        setLoading(true);
        const tiersData = await loyaltyService.getAllTiers();
        setTiers(tiersData);
      } catch (err) {
        console.error('Error fetching loyalty tiers:', err);
        setError('Failed to fetch loyalty tiers');
      } finally {
        setLoading(false);
      }
    }

    fetchTiers();
  }, []);

  return { tiers, loading, error };
}

// Hook for managing loyalty transactions
export function useLoyaltyTransactions(loyaltyId: number | undefined) {
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      if (!loyaltyId) return;

      try {
        setLoading(true);
        const transactionsData = await loyaltyService.getTransactions(loyaltyId);
        setTransactions(transactionsData);
      } catch (err) {
        console.error('Error fetching loyalty transactions:', err);
        setError('Failed to fetch loyalty transactions');
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [loyaltyId]);

  return { transactions, loading, error };
}

// Hook for managing loyalty rewards
export function useLoyaltyRewards() {
  const [rewards, setRewards] = useState<LoyaltyReward[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRewards() {
      try {
        setLoading(true);
        const rewardsData = await loyaltyService.getActiveRewards();
        setRewards(rewardsData);
      } catch (err) {
        console.error('Error fetching loyalty rewards:', err);
        setError('Failed to fetch loyalty rewards');
      } finally {
        setLoading(false);
      }
    }

    fetchRewards();
  }, []);

  return { rewards, loading, error };
}

// Hook for loyalty point calculator
export function usePointsCalculator() {
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);
  const estimatedPoints = loyaltyService.calculatePointsFromPurchase(purchaseAmount);

  return { purchaseAmount, setPurchaseAmount, estimatedPoints };
}
