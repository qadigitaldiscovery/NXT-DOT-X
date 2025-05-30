
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useLoyaltyAccount } from '@/hooks/use-loyalty';
import { supabase } from "@/integrations/supabase/client";
import { LoadingState } from './states/LoadingState';
import { AuthenticatedState } from './states/AuthenticatedState';
import { UnauthenticatedState } from './states/UnauthenticatedState';

export const LoyaltyStatusCard: React.FC = () => {
  const { account, loading } = useLoyaltyAccount();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    }
    
    checkAuth();
  }, []);
  
  return (
    <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <CardHeader>
        <CardTitle className="text-xl text-white">Loyalty Program Status</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingState />
        ) : account ? (
          <AuthenticatedState account={account} />
        ) : (
          <UnauthenticatedState />
        )}
      </CardContent>
    </Card>
  );
};
