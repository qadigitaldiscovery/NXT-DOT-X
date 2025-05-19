import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import KpiCard from './KpiCard';
import { formatCurrency } from '@/lib/utils';

export function DashboardV2() {
  // Mock data - in a real app, this would come from a data hook
  const kpiData = {
    totalRevenue: 125684.32,
    revenueChange: 8.2,
    totalOrders: 3421,
    ordersChange: 5.7,
    totalCustomers: 856,
    customersChange: 3.1,
    conversionRate: 4.6,
    conversionChange: 0.8,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KpiCard
        title="Total Revenue"
        value={formatCurrency(kpiData.totalRevenue)}
        change={kpiData.revenueChange}
      />
      <KpiCard
        title="Total Orders"
        value={kpiData.totalOrders.toString()}
        change={kpiData.ordersChange}
      />
      <KpiCard
        title="Total Customers"
        value={kpiData.totalCustomers.toString()}
        change={kpiData.customersChange}
      />
      <KpiCard
        title="Conversion Rate"
        value={`${kpiData.conversionRate}%`}
        change={kpiData.conversionChange}
      />
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest transactions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
