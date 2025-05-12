import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function LoyaltyProgram() {
  const navigate = useNavigate();
  return <Card className="col-span-1 bg-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-yellow-500" />
          <span>Loyalty Program</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-500">
          Manage loyalty rewards, member tiers, and customer engagement campaigns.
        </p>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm">Member management</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm">Reward programs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm">Analytics</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => navigate('/loyalty')} className="w-full">
          Open Loyalty Program
        </Button>
      </CardFooter>
    </Card>;
}