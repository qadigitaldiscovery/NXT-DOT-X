
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart, Activity, Users, AlertTriangle } from 'lucide-react';

const CustomerDashboard = () => {
  // In a real implementation, this would fetch actual customer data
  const activeCustomers = 124;
  const inactiveCustomers = 18;
  const totalCustomers = activeCustomers + inactiveCustomers;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customer Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your customer relationships and analytics
        </p>
      </div>
      
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Customers in database</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCustomers}</div>
            <p className="text-xs text-muted-foreground">Currently active customers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Customers</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveCustomers}</div>
            <p className="text-xs text-muted-foreground">Suspended or inactive customers</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Data Visualization Placeholders */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Customer Distribution</CardTitle>
            <CardDescription>Analysis by customer segment</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center p-6">
            <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
              <PieChart className="h-16 w-16" />
              <span className="ml-4">Distribution chart will appear here</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Growth Trends</CardTitle>
            <CardDescription>Customer acquisition analysis</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center p-6">
            <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
              <LineChart className="h-16 w-16" />
              <span className="ml-4">Growth trend chart will appear here</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest customer-related actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center border-b pb-4">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">New customer onboarded</p>
                <p className="text-sm text-muted-foreground">ABC Corporation was added to the customer directory</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center border-b pb-4">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Contract renewed</p>
                <p className="text-sm text-muted-foreground">XYZ Ltd. extended their service contract</p>
                <p className="text-xs text-muted-foreground">4 days ago</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Customer status change</p>
                <p className="text-sm text-muted-foreground">Global Partners status changed to VIP</p>
                <p className="text-xs text-muted-foreground">1 week ago</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <button className="text-sm text-blue-500 hover:underline">View all activity</button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerDashboard;
