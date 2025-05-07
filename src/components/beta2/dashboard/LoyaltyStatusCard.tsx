
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { LoyaltyAccount } from '@/services/loyalty/types';
import { toast } from 'sonner';
import { supabase } from "@/integrations/supabase/client";
import { useLoyaltyAccount } from '@/hooks/use-loyalty';

export const LoyaltyStatusCard: React.FC = () => {
  const navigate = useNavigate();
  const { account, loading } = useLoyaltyAccount();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    }
    
    checkAuth();
  }, []);
  
  const handleEnrollClick = async () => {
    if (!isLoggedIn) {
      toast.error("Please sign in to enroll in the loyalty program");
      return;
    }
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be signed in to enroll");
        return;
      }
      
      // This will create an account if none exists
      await useLoyaltyAccount();
      toast.success("You've been enrolled in our loyalty program!");
      navigate('/beta2/members');
    } catch (error) {
      console.error("Error enrolling:", error);
      toast.error("Failed to enroll in the loyalty program");
    }
  };
  
  return (
    <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <CardHeader>
        <CardTitle className="text-xl text-white">Loyalty Program Status</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-48 bg-white/20" />
            <Skeleton className="h-4 w-72 bg-white/20" />
            <Skeleton className="h-10 w-32 bg-white/20 mt-4" />
          </div>
        ) : account ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold">Welcome back, Valued Member!</h3>
              <p>You have <span className="font-bold text-xl">{account.points_balance}</span> points available</p>
              <p className="text-sm text-white/80">Current tier: {account.tier_level}</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => navigate('/beta2/members')}>
                View Dashboard
              </Button>
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" onClick={() => navigate('/beta2/rewards')}>
                Redeem Rewards
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold">Join Our Loyalty Program</h3>
              <p>Earn points, get exclusive rewards, and enjoy member benefits.</p>
            </div>
            
            <Button variant="secondary" onClick={handleEnrollClick}>
              Enroll Now
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
