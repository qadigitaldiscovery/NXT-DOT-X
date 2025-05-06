
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LineChart, BarChart, PieChart } from 'recharts';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Line,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';

// Mock data for cost trends
const costTrendData = [
  { month: 'Jan', cost: 5200, previous: 5000 },
  { month: 'Feb', cost: 5400, previous: 5200 },
  { month: 'Mar', cost: 5100, previous: 5300 },
  { month: 'Apr', cost: 5700, previous: 5400 },
  { month: 'May', cost: 5500, previous: 5600 },
];

// Mock data for cost distribution
const costDistributionData = [
  { name: 'AudioTech Pro', value: 35 },
  { name: 'VisualEdge', value: 25 },
  { name: 'SoundVision', value: 20 },
  { name: 'MediaMax', value: 15 },
  { name: 'Others', value: 5 },
];

// Mock data for discount analysis
const discountAnalysisData = [
  { category: 'Speakers', avgDiscount: 12, maxDiscount: 18 },
  { category: 'Displays', avgDiscount: 8, maxDiscount: 15 },
  { category: 'Amplifiers', avgDiscount: 10, maxDiscount: 17 },
  { category: 'Microphones', avgDiscount: 15, maxDiscount: 22 },
  { category: 'Accessories', avgDiscount: 20, maxDiscount: 30 },
];

// Mock data for top products
const topProductsData = [
  { 
    id: 1, 
    sku: 'AT-SPK-001', 
    name: 'Premium Bookshelf Speaker', 
    supplier: 'AudioTech Pro',
    cost: 249.99,
    previousCost: 259.99,
    discount: 15,
    margin: 42
  },
  { 
    id: 2, 
    sku: 'VE-DSP-120', 
    name: '4K HDR Display Monitor', 
    supplier: 'VisualEdge',
    cost: 599.99,
    previousCost: 599.99,
    discount: 12,
    margin: 38
  },
  { 
    id: 3, 
    sku: 'SV-AMP-220', 
    name: 'Multi-Channel Power Amplifier', 
    supplier: 'SoundVision',
    cost: 349.99,
    previousCost: 379.99,
    discount: 18,
    margin: 45
  },
  { 
    id: 4, 
    sku: 'MM-MIC-320', 
    name: 'Studio Condenser Microphone', 
    supplier: 'MediaMax',
    cost: 129.99,
    previousCost: 119.99,
    discount: 10,
    margin: 52
  },
  { 
    id: 5, 
    sku: 'AT-CAB-105', 
    name: 'Premium HDMI Cable 3m', 
    supplier: 'AudioTech Pro',
    cost: 24.99,
    previousCost: 29.99,
    discount: 25,
    margin: 68
  },
];

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const CostAnalysis = () => {
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Cost Analysis</h1>
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
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cost Trends</CardTitle>
            <CardDescription>
              Average costs over time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={costTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cost" 
                  stroke="#0EA5E9" 
                  strokeWidth={2} 
                  name="Current Period"
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
        
        <Card>
          <CardHeader>
            <CardTitle>Supplier Cost Distribution</CardTitle>
            <CardDescription>
              Cost breakdown by supplier
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={costDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {costDistributionData.map((entry, index) => (
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
      
      <Card>
        <CardHeader>
          <CardTitle>Discount Analysis</CardTitle>
          <CardDescription>
            Average and maximum discounts by product category
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={discountAnalysisData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis unit="%" />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="avgDiscount" name="Average Discount" fill="#0EA5E9" />
              <Bar dataKey="maxDiscount" name="Maximum Discount" fill="#38BDF8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Products</CardTitle>
          <CardDescription>
            Products with significant cost changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Current Cost</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Margin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProductsData.map((product) => {
                const costDiff = ((product.cost - product.previousCost) / product.previousCost) * 100;
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-mono">{product.sku}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.supplier}</TableCell>
                    <TableCell>${product.cost.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {costDiff !== 0 ? (
                          <>
                            {costDiff < 0 ? (
                              <ArrowDownRight className="mr-1 h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowUpRight className="mr-1 h-4 w-4 text-red-500" />
                            )}
                            <span className={costDiff < 0 ? "text-green-500" : "text-red-500"}>
                              {Math.abs(costDiff).toFixed(2)}%
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-500">0.00%</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{product.discount}%</TableCell>
                    <TableCell>{product.margin}%</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostAnalysis;
