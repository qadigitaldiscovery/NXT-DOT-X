import React from 'react';
import { useSupplier } from '../../hooks/suppliers';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { CreditSummaryCard } from './credit/CreditSummaryCard';
import { GaugeRating } from './credit/GaugeRating';
import { PerformanceChart } from './performance/PerformanceChart';
import { ReportViewer } from './reports/ReportViewer';

interface SupplierDetailProps {
  supplierId: string;
}

export const SupplierDetail: React.FC<SupplierDetailProps> = ({ supplierId }) => {
  const { data: supplier, isLoading } = useSupplier(supplierId);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Supplier Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            Loading supplier details...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!supplier) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Supplier Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            Supplier not found
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{supplier.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Code</p>
              <p className="font-medium">{supplier.code}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium capitalize">{supplier.status}</p>
            </div>
            {supplier.contact_name && (
              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium">{supplier.contact_name}</p>
              </div>
            )}
            {supplier.email && (
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{supplier.email}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            {supplier.creditRating && (
              <CreditSummaryCard
                rating={supplier.creditRating.rating}
                description={supplier.creditRating.description}
                limit={supplier.creditRating.limit}
                score={supplier.creditRating.score}
              />
            )}
            {supplier.performance && (
              <GaugeRating
                value={supplier.performance.overall}
                maxValue={100}
                label="Overall Performance"
                description="Based on delivery, quality, and responsiveness"
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="performance">
          {supplier.performance?.history && (
            <PerformanceChart
              data={supplier.performance.history}
              title="Performance History"
              label="Performance score over time"
            />
          )}
        </TabsContent>

        <TabsContent value="reports">
          <ReportViewer
            reports={supplier.reports || []}
            onView={(report) => window.open(report.url, '_blank')}
            onDownload={(report) => {
              const link = document.createElement('a');
              link.href = report.url;
              link.download = report.title;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
