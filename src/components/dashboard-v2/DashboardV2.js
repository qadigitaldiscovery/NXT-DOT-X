import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
    return (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(KpiCard, { title: "Total Revenue", value: formatCurrency(kpiData.totalRevenue), change: kpiData.revenueChange }), _jsx(KpiCard, { title: "Total Orders", value: kpiData.totalOrders.toString(), change: kpiData.ordersChange }), _jsx(KpiCard, { title: "Total Customers", value: kpiData.totalCustomers.toString(), change: kpiData.customersChange }), _jsx(KpiCard, { title: "Conversion Rate", value: `${kpiData.conversionRate}%`, change: kpiData.conversionChange }), _jsxs(Card, { className: "md:col-span-2 lg:col-span-4", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Recent Activity" }), _jsx(CardDescription, { children: "Latest transactions and updates" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: _jsx("p", { className: "text-sm text-muted-foreground", children: "No recent activity" }) }) })] })] }));
}
