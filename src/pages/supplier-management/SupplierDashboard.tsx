
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSuppliers } from '@/hooks/use-suppliers';
import { BarChart, LineChart, PieChart, Activity, Package, AlertTriangle } from 'lucide-react';

const SupplierDashboard = () => {
  const { data: suppliers, isLoading } = useSuppliers();
  
  // Calculate supplier statistics
  const activeSuppliers = suppliers?.filter(s => s.status === 'active')?.length || 0;
  const inactiveSuppliers = suppliers?.filter(s => s.status !== 'active')?.length || 0;
  const totalSuppliers = suppliers?.length || 0;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Supplier Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your supplier relationships and performance metrics
        </p>
      </div>
      
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? '...' : totalSuppliers}</div>
            <p className="text-xs text-muted-foreground">Suppliers in database</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? '...' : activeSuppliers}</div>
            <p className="text-xs text-muted-foreground">Currently active suppliers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Suppliers</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? '...' : inactiveSuppliers}</div>
            <p className="text-xs text-muted-foreground">Suspended or inactive suppliers</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Data Visualization Placeholders */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Supplier Distribution</CardTitle>
            <CardDescription>Analysis by supplier category</CardDescription>
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
            <CardTitle>Cost Trends</CardTitle>
            <CardDescription>Historical cost analysis</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center p-6">
            <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
              <LineChart className="h-16 w-16" />
              <span className="ml-4">Cost trend chart will appear here</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest supplier-related actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading activity data...</p>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center border-b pb-4">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New supplier added</p>
                  <p className="text-sm text-muted-foreground">Example Corp. was added to the supplier directory</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
              <div className="flex items-center border-b pb-4">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Cost update</p>
                  <p className="text-sm text-muted-foreground">Acme Inc. updated their pricing structure</p>
                  <p className="text-xs text-muted-foreground">5 days ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Supplier status change</p>
                  <p className="text-sm text-muted-foreground">Global Partners status changed to inactive</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <button className="text-sm text-blue-500 hover:underline">View all activity</button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SupplierDashboard;
