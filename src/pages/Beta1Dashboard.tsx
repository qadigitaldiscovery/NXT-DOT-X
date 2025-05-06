
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Beta1Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Beta 1 Dashboard</h1>
      <p className="text-muted-foreground">Welcome to the DOT-X Data Management Platform</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Supplier Costing</CardTitle>
            <CardDescription>Monitor and analyze supplier costs</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Access detailed supplier cost analytics and trends.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Cost Analysis</CardTitle>
            <CardDescription>Analyze cost data and metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Deep dive into cost structures and optimization opportunities.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Competitor Pricing</CardTitle>
            <CardDescription>Track competitor pricing strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Stay informed on market pricing and competitive positioning.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Beta1Dashboard;
