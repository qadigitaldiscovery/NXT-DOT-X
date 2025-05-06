
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Beta2Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Detailed pricing and market analytics.</p>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Market Overview</CardTitle>
                <CardDescription>Overall market performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-100 rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Market trend chart placeholder</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
                <CardDescription>Revenue by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-slate-100 rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Revenue distribution chart placeholder</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Analysis</CardTitle>
              <CardDescription>Detailed pricing metrics across product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-64 bg-slate-100 rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Pricing trends chart placeholder</span>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-md">
                    <p className="text-sm text-muted-foreground">Average Price</p>
                    <p className="text-2xl font-bold">$245.50</p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <p className="text-sm text-muted-foreground">Price Range</p>
                    <p className="text-2xl font-bold">$45 - $899</p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <p className="text-sm text-muted-foreground">Price Change</p>
                    <p className="text-2xl font-bold text-green-600">+3.2%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="competitors">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Pricing</CardTitle>
              <CardDescription>Market comparison against main competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-64 bg-slate-100 rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Competitor comparison chart placeholder</span>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 font-medium">Competitor</th>
                        <th className="text-left p-3 font-medium">Avg. Price</th>
                        <th className="text-left p-3 font-medium">Comparison</th>
                        <th className="text-left p-3 font-medium">Market Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3">CompA Inc.</td>
                        <td className="p-3">$258.45</td>
                        <td className="p-3 text-amber-600">+5.2%</td>
                        <td className="p-3">32%</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">Our Company</td>
                        <td className="p-3">$245.50</td>
                        <td className="p-3">-</td>
                        <td className="p-3">24%</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">CompB Ltd.</td>
                        <td className="p-3">$232.30</td>
                        <td className="p-3 text-green-600">-5.4%</td>
                        <td className="p-3">18%</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">CompC Corp.</td>
                        <td className="p-3">$268.75</td>
                        <td className="p-3 text-amber-600">+9.5%</td>
                        <td className="p-3">15%</td>
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
