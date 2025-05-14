
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { toast } from "@/hooks/use-toast";

// Sample data for price optimization charts
const priceElasticityData = [
  { price: 10, demand: 100, revenue: 1000 },
  { price: 15, demand: 85, revenue: 1275 },
  { price: 20, demand: 70, revenue: 1400 },
  { price: 25, demand: 55, revenue: 1375 },
  { price: 30, demand: 40, revenue: 1200 },
  { price: 35, demand: 28, revenue: 980 },
  { price: 40, demand: 20, revenue: 800 },
];

const competitorPricesData = [
  { competitor: 'Competitor A', price: 18 },
  { competitor: 'Competitor B', price: 22 },
  { competitor: 'Competitor C', price: 25 },
  { competitor: 'Industry Average', price: 21.5 },
];

const PriceOptimization: React.FC = () => {
  const [currentPrice, setCurrentPrice] = React.useState<number>(20);
  const [optimizationTarget, setOptimizationTarget] = React.useState<string>("revenue");

  const handlePriceChange = (value: number[]) => {
    setCurrentPrice(value[0]);
  };

  const handleOptimize = () => {
    // In a real application, this would run an optimization algorithm
    const optimalPrice = optimizationTarget === "revenue" ? 20 : 15;
    setCurrentPrice(optimalPrice);
    
    // Fix the toast call to use the correct format
    toast({
      description: `Optimal price calculated: $${optimalPrice.toFixed(2)} based on ${optimizationTarget} optimization`,
    });
  };

  const getOptimalPoint = () => {
    return optimizationTarget === "revenue" 
      ? { price: 20, demand: 70, revenue: 1400 } 
      : { price: 15, demand: 85, revenue: 1275 };
  };

  const optimalPoint = getOptimalPoint();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Price Optimization</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Price</CardTitle>
            <CardDescription>Your product's current price point</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${currentPrice.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Optimal Price</CardTitle>
            <CardDescription>Based on {optimizationTarget}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              ${optimalPoint.price.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Expected Revenue</CardTitle>
            <CardDescription>At the current price point</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${(currentPrice * (100 - (currentPrice * 1.5))).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Price Elasticity Analysis</CardTitle>
            <CardDescription>Relationship between price, demand, and revenue</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceElasticityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="price" label={{ value: 'Price ($)', position: 'bottom' }} />
                <YAxis yAxisId="left" label={{ value: 'Demand', angle: -90, position: 'left' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Revenue ($)', angle: 90, position: 'right' }} />
                <Tooltip formatter={(value, name) => [`${value}${name === 'demand' ? ' units' : ' $'}`, name]} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="demand" stroke="#8884d8" name="Demand" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Price Adjustment</CardTitle>
            <CardDescription>Manually adjust pricing and see the impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">Set Price: ${currentPrice.toFixed(2)}</label>
              <Slider
                defaultValue={[currentPrice]}
                max={40}
                min={10}
                step={0.5}
                onValueChange={handlePriceChange}
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Optimization Target:</label>
              <Tabs 
                value={optimizationTarget} 
                onValueChange={setOptimizationTarget}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="volume">Volume</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleOptimize} className="w-full">Calculate Optimal Price</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competitor Analysis</CardTitle>
            <CardDescription>Your pricing relative to competitors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {competitorPricesData.map((competitor, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{competitor.competitor}</span>
                  <span className={`font-semibold ${
                    competitor.price > currentPrice ? 'text-red-500' : 'text-green-500'
                  }`}>
                    ${competitor.price.toFixed(2)}
                    {competitor.competitor !== 'Industry Average' && (
                      <span className="text-xs ml-2">
                        ({competitor.price > currentPrice ? '+' : ''}
                        ${(competitor.price - currentPrice).toFixed(2)})
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="text-sm text-gray-500">
            Your price: ${currentPrice.toFixed(2)}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PriceOptimization;
