
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, LineChart, Calendar, ArrowDownUp, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PriceHistory = () => {
  const [timeRange, setTimeRange] = useState('3-months');
  const [productCategory, setProductCategory] = useState('all');
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Price History Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Track historical price changes and analyze pricing trends across your product catalog
        </p>
      </div>
      
      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-wrap gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30-days">Last 30 Days</SelectItem>
              <SelectItem value="3-months">Last 3 Months</SelectItem>
              <SelectItem value="6-months">Last 6 Months</SelectItem>
              <SelectItem value="1-year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={productCategory} onValueChange={setProductCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Product Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="home">Home & Garden</SelectItem>
              <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ArrowDownUp className="h-4 w-4 mr-2" />
            Sort
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Price History Visualizations */}
      <Tabs defaultValue="trends">
        <TabsList>
          <TabsTrigger value="trends">Price Trends</TabsTrigger>
          <TabsTrigger value="comparison">Competitor Comparison</TabsTrigger>
          <TabsTrigger value="volatility">Price Volatility</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Price Trend Analysis</CardTitle>
              <CardDescription>Historical price changes over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <LineChart className="h-16 w-16 mx-auto mb-2" />
                <p>Price trend visualization</p>
                <p className="text-xs mt-1">Shows average price changes across selected product categories</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Price Change Frequency</CardTitle>
                <CardDescription>How often prices change by category</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                  <p>Price change frequency chart</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Price Change Magnitude</CardTitle>
                <CardDescription>Size of price adjustments over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                  <p>Price change magnitude chart</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Price Comparison</CardTitle>
              <CardDescription>Your prices compared to market averages</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <LineChart className="h-16 w-16 mx-auto mb-2" />
                <p>Competitor price comparison chart</p>
                <p className="text-xs mt-1">Shows your prices vs. market average over time</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="volatility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Price Volatility Analysis</CardTitle>
              <CardDescription>Stability of prices across product categories</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-16 w-16 mx-auto mb-2" />
                <p>Price volatility visualization</p>
                <p className="text-xs mt-1">Higher bars indicate more volatile pricing</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Recent Price Changes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Price Changes</CardTitle>
          <CardDescription>Latest price adjustments across products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-4 font-medium text-sm">
              <div>Product</div>
              <div>Previous Price</div>
              <div>Current Price</div>
              <div>Change Date</div>
            </div>
            <div className="space-y-2">
              {[
                { product: "Smartphone X Pro", previous: "$899", current: "$849", date: "Jun 10, 2025" },
                { product: "Wireless Headphones", previous: "$129", current: "$149", date: "Jun 5, 2025" },
                { product: "Smart Watch Series 5", previous: "$299", current: "$279", date: "May 28, 2025" },
                { product: "Laptop Ultra Slim", previous: "$1299", current: "$1199", date: "May 22, 2025" },
                { product: "Bluetooth Speaker", previous: "$79", current: "$69", date: "May 15, 2025" }
              ].map((item, i) => (
                <div key={i} className="grid grid-cols-4 text-sm border-b pb-2">
                  <div className="font-medium">{item.product}</div>
                  <div>{item.previous}</div>
                  <div className={item.current > item.previous ? "text-red-500" : "text-green-500"}>
                    {item.current}
                  </div>
                  <div>{item.date}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceHistory;
