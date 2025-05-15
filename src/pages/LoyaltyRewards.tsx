
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const LoyaltyRewards = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rewards Catalog</h1>
          <p className="text-muted-foreground">Manage available loyalty rewards.</p>
        </div>
        
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>New Reward</span>
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rewards..."
            className="pl-8"
          />
        </div>
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Sort</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle>Free Product</CardTitle>
              <Badge>Popular</Badge>
            </div>
            <CardDescription>Get a free item with your purchase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400">
              Reward Image
            </div>
            <p className="font-semibold">500 points</p>
            <p className="text-sm text-muted-foreground">Redeemed 1,245 times</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">Edit</Button>
            <Button size="sm">View Details</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>10% Discount</CardTitle>
            <CardDescription>Save on your next purchase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400">
              Reward Image
            </div>
            <p className="font-semibold">300 points</p>
            <p className="text-sm text-muted-foreground">Redeemed 843 times</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">Edit</Button>
            <Button size="sm">View Details</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle>VIP Access</CardTitle>
              <Badge variant="outline">Limited</Badge>
            </div>
            <CardDescription>Exclusive event access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400">
              Reward Image
            </div>
            <p className="font-semibold">1,000 points</p>
            <p className="text-sm text-muted-foreground">Redeemed 312 times</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">Edit</Button>
            <Button size="sm">View Details</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoyaltyRewards;
