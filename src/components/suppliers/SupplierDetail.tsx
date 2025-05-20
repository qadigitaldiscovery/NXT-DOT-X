import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { CreditSummaryCard } from "./credit/CreditSummaryCard";
import { GaugeRating } from "./credit/GaugeRating";
import { PerformanceChart } from "./performance/PerformanceChart";
import { ReportViewer } from "./reports/ReportViewer";
import { useSupplier } from "../../hooks/use-suppliers";

interface SupplierDetailProps {
  supplierId: string;
}

export const SupplierDetail: React.FC<SupplierDetailProps> = ({ supplierId }) => {
  const { data: supplier, isLoading } = useSupplier(supplierId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!supplier) {
    return <div>Supplier not found</div>;
  }

  // Sample performance data - replace with actual data from API
  const performanceData = [
    { date: '2024-01', value: 85 },
    { date: '2024-02', value: 88 },
    { date: '2024-03', value: 92 }
  ];

  // Sample reports - replace with actual data from API
  const reports = [
    {
      id: '1',
      title: 'Annual Performance Review',
      type: 'PDF',
      date: '2024-03-15',
      size: '2.4 MB',
      url: '/reports/annual-review.pdf'
    },
    {
      id: '2',
      title: 'Quality Assessment',
      type: 'PDF',
      date: '2024-02-28',
      size: '1.8 MB',
      url: '/reports/quality-assessment.pdf'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{supplier.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Contact</p>
              <p>{supplier.contact_name}</p>
              <p>{supplier.email}</p>
              <p>{supplier.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Details</p>
              <p>Code: {supplier.code}</p>
              <p>Status: {supplier.status}</p>
              <p>Payment Terms: {supplier.payment_terms}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <CreditSummaryCard
              rating="A"
              description="Excellent"
              limit="$500,000"
              score={92}
            />
            <GaugeRating
              value={92}
              maxValue={100}
              label="Overall Performance"
              description="Based on last 12 months"
            />
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceChart
            data={performanceData}
            title="Performance Trend"
            label="Performance Score"
          />
        </TabsContent>

        <TabsContent value="reports">
          <ReportViewer
            reports={reports}
            onView={(report) => window.open(report.url, '_blank')}
            onDownload={(report) => window.open(report.url, '_blank')}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
