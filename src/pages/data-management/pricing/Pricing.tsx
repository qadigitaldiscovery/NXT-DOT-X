
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, BarChart2, LineChart, RefreshCw, 
  Download, Filter, Plus, Search, Upload 
} from "lucide-react";
import { Input } from "@/components/ui/input";

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pricing Management</h1>
          <p className="text-muted-foreground">Analyze and adjust pricing strategies</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Price Rule
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="competitor">Competitor Analysis</TabsTrigger>
          <TabsTrigger value="optimization">Price Optimization</TabsTrigger>
          <TabsTrigger value="history">Price History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="flex gap-4 mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Price Health</CardTitle>
                <AreaChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Price Changes</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">In the last 30 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Avg. Margin</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28.6%</div>
                <p className="text-xs text-muted-foreground">+2.1% from previous period</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Price Updates</CardTitle>
              <CardDescription>Latest pricing changes across products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted border-b">
                      <th className="py-2 px-4 text-left font-medium">Product</th>
                      <th className="py-2 px-4 text-left font-medium">Previous Price</th>
                      <th className="py-2 px-4 text-left font-medium">New Price</th>
                      <th className="py-2 px-4 text-left font-medium">Change</th>
                      <th className="py-2 px-4 text-left font-medium">Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-2 px-4">Product {i}</td>
                        <td className="py-2 px-4">${(19.99 + i).toFixed(2)}</td>
                        <td className="py-2 px-4">${(22.99 + i).toFixed(2)}</td>
                        <td className="py-2 px-4 text-green-600">+15%</td>
                        <td className="py-2 px-4 text-muted-foreground">2d ago</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="competitor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Price Analysis</CardTitle>
              <CardDescription>Compare your prices with competitor data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12 text-muted-foreground">
                <div className="text-center">
                  <AreaChart className="mx-auto h-12 w-12 opacity-30" />
                  <h3 className="mt-4 text-lg font-semibold">No competitor data loaded</h3>
                  <p className="mt-2 text-sm">Upload competitor pricing data to begin analysis</p>
                  <Button className="mt-4" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Price Optimization Suggestions</CardTitle>
              <CardDescription>AI-powered pricing recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12 text-muted-foreground">
                <div className="text-center">
                  <BarChart2 className="mx-auto h-12 w-12 opacity-30" />
                  <h3 className="mt-4 text-lg font-semibold">Price optimization available soon</h3>
                  <p className="mt-2 text-sm">This feature will be available in an upcoming release</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historical Price Trends</CardTitle>
              <CardDescription>Price changes over time for key products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12 text-muted-foreground">
                <div className="text-center">
                  <LineChart className="mx-auto h-12 w-12 opacity-30" />
                  <h3 className="mt-4 text-lg font-semibold">Historical data loading...</h3>
                  <p className="mt-2 text-sm">Price history will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PricingPage;
