
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Gift, Users, BarChart3, ArrowRight, ShoppingCart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useLoyaltyAccount } from '@/hooks/use-loyalty';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

const Beta2Dashboard = () => {
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loyalty Program Manager</h1>
          <p className="text-muted-foreground">Welcome to the loyalty program management platform.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/prototypes')}>
            Back to Selector
          </Button>
        </div>
      </div>
      
      {/* Account status card */}
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
      
      {/* Quick navigation cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" 
              onClick={() => navigate('/beta2/members')}>
          <CardHeader className="pb-2">
            <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <CardTitle className="text-xl mt-2">Members</CardTitle>
            <CardDescription>Manage member accounts and view activity</CardDescription>
          </CardHeader>
          <CardFooter className="pt-0 pb-4">
            <Button variant="ghost" className="p-0 h-auto" onClick={() => navigate('/beta2/members')}>
              <span className="flex items-center text-sm text-purple-600 font-medium">
                View Members 
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate('/beta2/rewards')}>
          <CardHeader className="pb-2">
            <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center">
              <Gift className="h-5 w-5 text-purple-600" />
            </div>
            <CardTitle className="text-xl mt-2">Rewards</CardTitle>
            <CardDescription>Manage and redeem loyalty rewards</CardDescription>
          </CardHeader>
          <CardFooter className="pt-0 pb-4">
            <Button variant="ghost" className="p-0 h-auto" onClick={() => navigate('/beta2/rewards')}>
              <span className="flex items-center text-sm text-purple-600 font-medium">
                View Rewards 
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate('/beta2/analytics')}>
          <CardHeader className="pb-2">
            <div className="bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            <CardTitle className="text-xl mt-2">Analytics</CardTitle>
            <CardDescription>View program performance analytics</CardDescription>
          </CardHeader>
          <CardFooter className="pt-0 pb-4">
            <Button variant="ghost" className="p-0 h-auto" onClick={() => navigate('/beta2/analytics')}>
              <span className="flex items-center text-sm text-purple-600 font-medium">
                View Analytics 
                <ArrowRight className="ml-1 h-4 w-4" />
              </span>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Getting Started Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Learn how to use the loyalty program management system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-purple-100 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center">
                <span className="font-bold text-purple-600">1</span>
              </div>
              <div>
                <h3 className="font-medium">Enroll Members</h3>
                <p className="text-sm text-muted-foreground">
                  Members can join the loyalty program and start earning points.
                  Points are tracked automatically based on purchases.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-purple-100 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center">
                <span className="font-bold text-purple-600">2</span>
              </div>
              <div>
                <h3 className="font-medium">Earn Points</h3>
                <p className="text-sm text-muted-foreground">
                  Members earn 1 point for every $1 spent on purchases.
                  Additional points can be awarded for special promotions.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-purple-100 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center">
                <span className="font-bold text-purple-600">3</span>
              </div>
              <div>
                <h3 className="font-medium">Redeem Rewards</h3>
                <p className="text-sm text-muted-foreground">
                  Members can redeem their points for various rewards including
                  discounts, store credit, and exclusive benefits.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-purple-100 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center">
                <span className="font-bold text-purple-600">4</span>
              </div>
              <div>
                <h3 className="font-medium">Track Performance</h3>
                <p className="text-sm text-muted-foreground">
                  Use the analytics dashboard to monitor program performance,
                  member engagement, and redemption patterns.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Beta2Dashboard;
