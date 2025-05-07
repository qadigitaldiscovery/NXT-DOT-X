import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { useLoyaltyAccount, useLoyaltyTiers, useLoyaltyTransactions } from '@/hooks/use-loyalty';
import { Progress } from '@/components/ui/progress';

const LoyaltyMembers = () => {
  const { account, loading: accountLoading } = useLoyaltyAccount();
  const { tiers, loading: tiersLoading } = useLoyaltyTiers();
  const { transactions, loading: transactionsLoading } = useLoyaltyTransactions(account?.loyalty_id);
  
  // Find the current tier and next tier
  const currentTier = tiers.find(tier => tier.tier_name === account?.tier_level);
  const currentTierIndex = tiers.findIndex(tier => tier.tier_name === account?.tier_level);
  const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;
  
  // Calculate progress to next tier
  const pointsToNextTier = nextTier ? nextTier.min_points_required - (account?.points_balance || 0) : 0;
  const progressPercentage = nextTier 
    ? Math.min(100, ((account?.points_balance || 0) / nextTier.min_points_required) * 100) 
    : 100;
  
  // Format transaction type for display
  const formatTransactionType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Member Dashboard</h1>
        <p className="text-muted-foreground">Manage your loyalty membership and view your points.</p>
      </div>
      
      {accountLoading || tiersLoading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
        </Card>
      ) : account ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Membership Overview</CardTitle>
              <CardDescription>Your current loyalty status and points balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">Membership Level</h3>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-green-600 hover:bg-green-700 font-medium text-white py-1 px-3">
                          {account.tier_level}
                        </Badge>
                      </div>
                      {currentTier?.benefits_summary_v1 && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {currentTier.benefits_summary_v1}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Member since</p>
                      <p className="font-medium">{format(new Date(account.join_date), 'MMM d, yyyy')}</p>
                    </div>
                  </div>
                  
                  {nextTier && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress to {nextTier.tier_name}</span>
                        <span>{account.points_balance} / {nextTier.min_points_required} points</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        {pointsToNextTier > 0 
                          ? `Earn ${pointsToNextTier} more points to reach ${nextTier.tier_name}` 
                          : `You've qualified for ${nextTier.tier_name}!`}
                      </p>
                    </div>
                  )}
                  
                  {!nextTier && currentTierIndex === tiers.length - 1 && (
                    <div className="space-y-2">
                      <p className="text-sm">You've reached our highest tier level!</p>
                      <Progress value={100} className="h-2" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Points Balance</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{account.points_balance}</span>
                    <span className="ml-2 text-muted-foreground">points available</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Points can be redeemed for rewards in the Rewards section
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <Tabs defaultValue="activity">
              <TabsList className="mb-4">
                <TabsTrigger value="activity">Activity History</TabsTrigger>
                <TabsTrigger value="tiers">Tier Benefits</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Points Activity</CardTitle>
                    <CardDescription>Your recent points transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {transactionsLoading ? (
                      <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                      </div>
                    ) : transactions.length > 0 ? (
                      <div className="border rounded-md overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="text-left p-3 font-medium">Date</th>
                              <th className="text-left p-3 font-medium">Transaction</th>
                              <th className="text-left p-3 font-medium">Description</th>
                              <th className="text-right p-3 font-medium">Points</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactions.map(transaction => (
                              <tr key={transaction.transaction_id} className="border-t">
                                <td className="p-3">{format(new Date(transaction.transaction_date), 'MMM d, yyyy')}</td>
                                <td className="p-3">{formatTransactionType(transaction.transaction_type)}</td>
                                <td className="p-3">{transaction.description || '-'}</td>
                                <td className={`p-3 text-right font-medium ${transaction.points_amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {transaction.points_amount >= 0 ? '+' : ''}{transaction.points_amount}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground py-8">No transactions found</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tiers">
                <Card>
                  <CardHeader>
                    <CardTitle>Membership Tiers</CardTitle>
                    <CardDescription>Benefits for each membership level</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                      {tiers.map(tier => (
                        <Card key={tier.tier_id} className={`overflow-hidden border-2 ${tier.tier_name === account.tier_level ? 'border-green-600' : 'border-transparent'}`}>
                          <CardHeader className="pb-2">
                            <CardTitle className="flex items-center justify-between">
                              {tier.tier_name}
                              {tier.tier_name === account.tier_level && 
                                <Badge className="bg-green-600 hover:bg-green-700">Current</Badge>
                              }
                            </CardTitle>
                            <CardDescription>{tier.min_points_required} points</CardDescription>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-sm">{tier.description_v1}</p>
                            
                            <div className="mt-4">
                              <h4 className="text-sm font-medium mb-2">Benefits:</h4>
                              <p className="text-sm text-muted-foreground">{tier.benefits_summary_v1}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Welcome to our Loyalty Program</CardTitle>
            <CardDescription>Join today to start earning points and rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Sign in to create your loyalty account and start earning rewards.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LoyaltyMembers;
