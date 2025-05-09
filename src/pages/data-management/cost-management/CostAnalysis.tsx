
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart3, ArrowUpRight, ArrowDownRight, DollarSign, Download } from "lucide-react";
import { formatCurrency } from '@/lib/utils';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function CostAnalysis() {
  // State for time range filter
  const [timeRange, setTimeRange] = useState('6m');
  
  // Mock data for a real South African business
  const averageCostChange = 2.5;
  const costSavingsAmount = 229580; // R229,580
  const suppliersWithIncreases = 5;
  const productsWithAlerts = 24;
  const costChangeTrend = 0.8;
  const savingsIncrease = 18;

  // Mock data for cost trends
  const costTrendData = [
    { month: 'Jan', cost: 520000, previous: 500000 },
    { month: 'Feb', cost: 540000, previous: 520000 },
    { month: 'Mar', cost: 510000, previous: 530000 },
    { month: 'Apr', cost: 570000, previous: 540000 },
    { month: 'May', cost: 550000, previous: 560000 },
    { month: 'Jun', cost: 590000, previous: 550000 },
  ];

  // Mock data for supplier comparison
  const supplierComparisonData = [
    { name: 'AudioTech Pro', value: 35 },
    { name: 'VisualEdge', value: 25 },
    { name: 'SoundVision', value: 20 },
    { name: 'MediaMax', value: 15 },
    { name: 'Others', value: 5 },
  ];

  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cost Analysis</h1>
          <p className="text-muted-foreground">
            Analyze supplier costs and identify savings opportunities (ZAR)
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select 
            value={timeRange} 
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="12m">Last Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="backdrop-blur-md bg-white/30 border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Cost Change</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{averageCostChange}%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3 text-destructive" />
              <span className="text-destructive">{costChangeTrend}%</span> increase from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-md bg-white/30 border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings Identified</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R{costSavingsAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-600" />
              <span className="text-green-600">{savingsIncrease}%</span> increase from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-md bg-white/30 border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suppliers with Price Increases</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliersWithIncreases}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowDownRight className="h-3 w-3 text-green-600" />
              <span className="text-green-600">2</span> decrease from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-md bg-white/30 border border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products with Price Alerts</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productsWithAlerts}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3 text-destructive" />
              <span className="text-destructive">6</span> increase from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1 backdrop-blur-md bg-white/30 border border-white/10">
          <CardHeader>
            <CardTitle>Cost Trend Analysis</CardTitle>
            <CardDescription>
              View cost trends over time by category
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `R${(value/1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value) => [`R${value.toLocaleString()}`, 'Amount']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cost" 
                  stroke="#0EA5E9" 
                  strokeWidth={2} 
                  name="Current Period"
                  activeDot={{ r: 8 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="previous" 
                  stroke="#94A3B8" 
                  strokeDasharray="5 5" 
                  name="Previous Period" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 backdrop-blur-md bg-white/30 border border-white/10">
          <CardHeader>
            <CardTitle>Supplier Cost Comparison</CardTitle>
            <CardDescription>
              Compare costs across suppliers
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={supplierComparisonData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {supplierComparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card className="backdrop-blur-md bg-white/30 border border-white/10">
        <CardHeader>
          <CardTitle>Cost Variation by Category</CardTitle>
          <CardDescription>
            Analyze cost variations across product categories
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { category: 'Electronics', variance: 8.2 },
                { category: 'Audio', variance: 5.7 },
                { category: 'Displays', variance: 12.3 },
                { category: 'Accessories', variance: 3.4 },
                { category: 'Components', variance: 7.9 },
                { category: 'Cables', variance: 2.1 },
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis label={{ value: 'Variance %', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="variance" fill="#8884d8">
                {[
                  { category: 'Electronics', variance: 8.2 },
                  { category: 'Audio', variance: 5.7 },
                  { category: 'Displays', variance: 12.3 },
                  { category: 'Accessories', variance: 3.4 },
                  { category: 'Components', variance: 7.9 },
                  { category: 'Cables', variance: 2.1 },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.variance > 10 ? '#FF8042' : entry.variance > 5 ? '#FFBB28' : '#00C49F'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
