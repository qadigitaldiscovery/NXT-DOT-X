
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CustomerManagement() {
  const navigate = useNavigate();

  return (
    <Card className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-cyan-500" />
          <span>Customer Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-500">
          Manage customer relationships, profiles, and engagement analytics.
        </p>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm">Customer directory</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm">Engagement tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm">Customer analytics</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => navigate('/customer-management')} 
          className="w-full"
        >
          Open Customer Management
        </Button>
      </CardFooter>
    </Card>
  );
}
