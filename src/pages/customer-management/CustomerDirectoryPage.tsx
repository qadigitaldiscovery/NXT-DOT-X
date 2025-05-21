import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

const CustomerManagement = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customer Management</h2>
          <p className="text-muted-foreground">
            Manage your customer relationships and data.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Customer
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Customers</CardTitle>
            <CardDescription>Active accounts in your system</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">287</p>
            <p className="text-sm text-muted-foreground mt-2">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Accounts requiring verification</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">24</p>
            <p className="text-sm text-muted-foreground mt-2">-3% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">152</p>
            <p className="text-sm text-muted-foreground mt-2">+8% from previous period</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional content would go here */}
    </div>
  );
};

export default CustomerManagement;
