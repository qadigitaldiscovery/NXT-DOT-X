
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Beta2Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Loyalty Analytics</h1>
        <p className="text-muted-foreground">Track and analyze your loyalty program performance.</p>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Program Overview</TabsTrigger>
          <TabsTrigger value="members">Member Metrics</TabsTrigger>
          <TabsTrigger value="rewards">Reward Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Program Performance</CardTitle>
                <CardDescription>Key loyalty program metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-100 rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Program metrics chart placeholder</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Membership Growth</CardTitle>
                <CardDescription>New members over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-100 rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Membership growth chart placeholder</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Member Analysis</CardTitle>
              <CardDescription>Detailed metrics about program members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-64 bg-slate-100 rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Member segments chart placeholder</span>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-md">
                    <p className="text-sm text-muted-foreground">Total Members</p>
                    <p className="text-2xl font-bold">12,543</p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <p className="text-sm text-muted-foreground">Active Rate</p>
                    <p className="text-2xl font-bold">68%</p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <p className="text-sm text-muted-foreground">Avg. Points Balance</p>
                    <p className="text-2xl font-bold">2,450</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rewards">
          <Card>
            <CardHeader>
              <CardTitle>Reward Redemptions</CardTitle>
              <CardDescription>Analysis of reward program usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-64 bg-slate-100 rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Redemption trends chart placeholder</span>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 font-medium">Reward Type</th>
                        <th className="text-left p-3 font-medium">Redemption Count</th>
                        <th className="text-left p-3 font-medium">Points Used</th>
                        <th className="text-left p-3 font-medium">Popularity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3">Free Product</td>
                        <td className="p-3">1,245</td>
                        <td className="p-3">62,250</td>
                        <td className="p-3">High</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">Discount Coupon</td>
                        <td className="p-3">843</td>
                        <td className="p-3">25,290</td>
                        <td className="p-3">Medium</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">Exclusive Access</td>
                        <td className="p-3">312</td>
                        <td className="p-3">31,200</td>
                        <td className="p-3">Medium</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">Gift Card</td>
                        <td className="p-3">196</td>
                        <td className="p-3">49,000</td>
                        <td className="p-3">Low</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Beta2Analytics;
