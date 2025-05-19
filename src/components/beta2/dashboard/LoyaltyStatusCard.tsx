import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Medal } from 'lucide-react';

export function LoyaltyStatusCard() {
  // Mock data - in a real app, this would come from a data hook
  const loyaltyData = {
    tier: 'Gold',
    points: 2450,
    nextTierPoints: 3000,
    progress: 82,
    benefits: ['Priority Support', 'Exclusive Offers', 'Free Shipping'],
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white pb-3">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Loyalty Status
        </CardTitle>
        <CardDescription className="text-amber-100">
          Your current tier and progress
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Medal className="h-5 w-5 text-amber-500" />
              <span className="text-lg font-semibold">{loyaltyData.tier} Member</span>
            </div>
            <Badge variant="secondary">
              {loyaltyData.points} Points
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress to Platinum</span>
              <span>{loyaltyData.points}/{loyaltyData.nextTierPoints} pts</span>
            </div>
            <Progress value={loyaltyData.progress} className="w-full" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Tier Benefits</h3>
            <ul className="list-disc list-inside space-y-1 pl-1">
              {loyaltyData.benefits.map((benefit, index) => (
                <li key={index} className="text-sm">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
