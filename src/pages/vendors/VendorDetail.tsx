
import React from 'react';
import { useParams } from 'react-router-dom';
import { useVendorDetail, useVendorPerformance } from '@/hooks/useVendorDetail';
import { CreditSummaryCard } from '@/components/vendorDetail/CreditSummaryCard';
import { GaugeRating } from '@/components/vendorDetail/GaugeRating';
import { PerformanceChart } from '@/components/vendorDetail/PerformanceChart';
import { ReportViewer } from '@/components/vendorDetail/ReportViewer';
import { TabsContainer } from '@/components/vendorDetail/TabsContainer';
import { Skeleton } from '@/components/ui/skeleton';

export default function VendorDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: vendor, isLoading: isLoadingVendor } = useVendorDetail(id!);
  const { data: performanceData, emaScore, hasPerformanceAlert } = useVendorPerformance(id!);

  if (isLoadingVendor) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-40 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Vendor not found or you don't have permission to view it.
        </div>
      </div>
    );
  }

  // Get latest credit rating
  const latestRating = vendor.credit_ratings && vendor.credit_ratings.length > 0 
    ? vendor.credit_ratings[0] 
    : { rating_code: 'N/A', description: 'Not Available', credit_limit: 0 };

  // Get latest report
  const latestReport = vendor.vendor_reports && vendor.vendor_reports.length > 0
    ? vendor.vendor_reports[0]
    : undefined;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-2">{vendor.company_name}</h1>
      
      <TabsContainer vendorId={id!}>
        <div className="space-y-6">
          <CreditSummaryCard
            rating={latestRating.rating_code}
            description={latestRating.description}
            limit={latestRating.credit_limit}
            localScore={vendor.local_score || 0}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GaugeRating ratingCode={latestRating.rating_code} />
            <PerformanceChart 
              data={performanceData || []} 
              emaScore={emaScore}
              hasAlert={hasPerformanceAlert}
            />
          </div>
          
          <ReportViewer report={latestReport} vendorId={id!} />
        </div>
      </TabsContainer>
    </div>
  );
}
