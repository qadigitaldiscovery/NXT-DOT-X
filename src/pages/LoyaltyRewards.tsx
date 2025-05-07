import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { AlertTriangle, GiftIcon, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useLoyaltyAccount, useLoyaltyRewards } from '@/hooks/use-loyalty';
import { loyaltyService } from '@/services/loyaltyService';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from '@/components/ui/input';

const LoyaltyRewards = () => {
  const { account, loading: accountLoading } = useLoyaltyAccount();
  const { rewards, loading: rewardsLoading } = useLoyaltyRewards();
  
  const [selectedReward, setSelectedReward] = React.useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const [processingRedemption, setProcessingRedemption] = React.useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  
  // Points calculator
  const [purchaseAmount, setPurchaseAmount] = React.useState('');
  const estimatedPoints = loyaltyService.calculatePointsFromPurchase(Number(purchaseAmount) || 0);
  
  const handleRedeemClick = (reward) => {
    setSelectedReward(reward);
    setConfirmDialogOpen(true);
  };
  
  const handleConfirmRedemption = async () => {
    if (!account || !selectedReward) return;
    
    setProcessingRedemption(true);
    
    try {
      const result = await loyaltyService.redeemReward(account.loyalty_id, selectedReward.reward_id);
      
      if (result.success) {
        setSuccessMessage(result.message);
        setConfirmDialogOpen(false);
        setSuccessDialogOpen(true);
        
        // Refresh the page to update points balance after dialog is closed
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(result.message);
        setConfirmDialogOpen(false);
      }
    } catch (error) {
      console.error('Redemption error:', error);
      toast.error('Failed to redeem reward. Please try again.');
    } finally {
      setProcessingRedemption(false);
    }
  };
  
  const handleCancelRedemption = () => {
    setSelectedReward(null);
    setConfirmDialogOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Rewards</h1>
        <p className="text-muted-foreground">Redeem your points for exclusive rewards and benefits.</p>
      </div>
      
      {/* Points Balance Summary */}
      {accountLoading ? (
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      ) : account ? (
        <Card>
          <CardHeader>
            <CardTitle>Your Points Balance</CardTitle>
            <CardDescription>Available points to redeem for rewards</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">{account.points_balance}</span>
                <span className="ml-2 text-muted-foreground">available points</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Membership Level: {account.tier_level}
              </p>
            </div>
            
            <div>
              <Badge className="bg-purple-600 hover:bg-purple-700">
                {account.tier_level}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Not Enrolled</AlertTitle>
          <AlertDescription>
            Sign in to create your loyalty account and access rewards.
          </AlertDescription>
        </Alert>
      )}
      
      {/* Points Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Points Calculator</CardTitle>
          <CardDescription>Estimate how many points you'll earn from a purchase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label htmlFor="purchase-amount" className="block text-sm font-medium mb-1">
                Enter Purchase Amount ($)
              </label>
              <Input
                id="purchase-amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex flex-col justify-end">
              <div className="bg-muted p-4 rounded-md text-center">
                <p className="text-sm text-muted-foreground">Estimated Points</p>
                <p className="text-2xl font-bold">{estimatedPoints}</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Points are calculated at a rate of 1 point per $1 spent
          </p>
        </CardContent>
      </Card>
      
      {/* Available Rewards */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Available Rewards</h2>
        
        {rewardsLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : rewards.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rewards.map(reward => (
              <Card key={reward.reward_id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{reward.reward_name}</CardTitle>
                  {reward.value_monetary && (
                    <CardDescription>Value: ${reward.value_monetary.toFixed(2)}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm">{reward.description_v1}</p>
                  <div className="flex items-center mt-4">
                    <Badge className="bg-purple-600 hover:bg-purple-700 font-medium">
                      {reward.points_cost} points
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleRedeemClick(reward)} 
                    className="w-full"
                    disabled={!account || account.points_balance < reward.points_cost}
                  >
                    {!account ? 'Sign In to Redeem' : 
                      account.points_balance < reward.points_cost ? 
                      `Need ${reward.points_cost - account.points_balance} more points` : 
                      'Redeem Reward'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <GiftIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No rewards available at the moment</p>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Redemption</DialogTitle>
            <DialogDescription>
              Are you sure you want to redeem this reward?
            </DialogDescription>
          </DialogHeader>
          
          {selectedReward && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between">
                <span className="font-medium">Reward:</span>
                <span>{selectedReward.reward_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Cost:</span>
                <span>{selectedReward.points_cost} points</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Your Balance:</span>
                <span>{account?.points_balance || 0} points</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Remaining Balance:</span>
                <span>{account ? (account.points_balance - selectedReward.points_cost) : 0} points</span>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelRedemption} disabled={processingRedemption}>
              Cancel
            </Button>
            <Button onClick={handleConfirmRedemption} disabled={processingRedemption}>
              {processingRedemption && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Redemption
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Redemption Successful</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p>{successMessage}</p>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setSuccessDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoyaltyRewards;
