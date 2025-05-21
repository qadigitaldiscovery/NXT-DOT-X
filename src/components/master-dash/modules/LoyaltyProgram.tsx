import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgePercent, Gift, TrendingUp } from "lucide-react";

const LoyaltyProgram: React.FC = () => {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-bold">Loyalty Program</CardTitle>
          <CardDescription>
            Manage customer rewards and points
          </CardDescription>
        </div>
        <BadgePercent className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between text-sm">
            <span>Active Members:</span>
            <span className="font-medium">8,492</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total Points:</span>
            <span className="font-medium">1.2M</span>
          </div>
          <div className="mt-2">
            <Button size="sm">Manage Program</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyProgram;
