
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";
import { formatCurrency } from '@/lib/utils';

export default function CostAnalysis() {
  // Mock data for a real South African business
  const averageCostChange = 2.5;
  const costSavingsAmount = 229580; // R229,580
  const suppliersWithIncreases = 5;
  const productsWithAlerts = 24;
  const costChangeTrend = 0.8;
  const savingsIncrease = 18;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Cost Analysis</h1>
        <p className="text-muted-foreground">
          Analyze supplier costs and identify savings opportunities (ZAR)
        </p>
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
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-sm text-muted-foreground">
              Cost trend visualization will appear here
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 backdrop-blur-md bg-white/30 border border-white/10">
          <CardHeader>
            <CardTitle>Supplier Cost Comparison</CardTitle>
            <CardDescription>
              Compare costs across suppliers
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-sm text-muted-foreground">
              Supplier comparison chart will appear here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
