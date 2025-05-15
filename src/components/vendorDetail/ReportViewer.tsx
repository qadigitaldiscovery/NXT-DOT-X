
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getReportUrl } from '@/services/vendorApi';
import { VendorReport } from '@/types/vendor';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { formatDate } from '@/utils/vendorCalculations';
import { useFetchCreditReport } from '@/hooks/useVendorDetail';

interface ReportViewerProps {
  report?: VendorReport;
  vendorId: string;
}

export function ReportViewer({ report, vendorId }: ReportViewerProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(1);
  
  const { mutate: fetchReport, isPending } = useFetchCreditReport(vendorId);

  useEffect(() => {
    if (report) {
      getReportUrl(report.file_path)
        .then(url => setSignedUrl(url))
        .catch(err => console.error('Error fetching report URL:', err));
    }
  }, [report]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleFetchReport = () => {
    fetchReport();
  };

  if (!report) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Credit Report</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-72">
          <p className="text-muted-foreground mb-4">No report available</p>
          <Button onClick={handleFetchReport} disabled={isPending}>
            {isPending ? 'Fetching...' : 'Fetch Latest Report'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Credit Report</CardTitle>
          <div className="text-sm text-muted-foreground">
            {report && `Last Updated: ${formatDate(report.fetched_at)}`}
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {page}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(prev => prev + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoom <= 0.5}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm">{Math.round(zoom * 100)}%</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoom >= 2}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            {signedUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={signedUrl} download target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-1" /> Download
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] overflow-hidden border rounded">
          {signedUrl ? (
            <iframe
              src={`${signedUrl}#page=${page}&zoom=${zoom}`}
              className="w-full h-full"
              title="Vendor Credit Report"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p>Loading report...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
