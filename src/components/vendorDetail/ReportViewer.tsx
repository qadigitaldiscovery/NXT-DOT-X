
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { VendorReport } from '@/types/vendor';
import { getReportUrl } from '@/services/vendorApi';
import { FileText, Download } from 'lucide-react';
import { useFetchCreditReport } from '@/hooks/useVendorDetail';

interface ReportViewerProps {
  report?: VendorReport;
  vendorId: string;
}

export function ReportViewer({ report, vendorId }: ReportViewerProps) {
  const [url, setUrl] = useState<string | null>(null);
  const { mutate: fetchReport, isPending } = useFetchCreditReport(vendorId);
  
  // Function to get and open the report
  const handleViewReport = async () => {
    if (!report?.file_path) return;
    
    try {
      const reportUrl = await getReportUrl(report.file_path);
      setUrl(reportUrl);
      window.open(reportUrl, '_blank');
    } catch (error) {
      console.error('Error getting report URL:', error);
    }
  };
  
  // Function to fetch a new credit report
  const handleFetchReport = () => {
    fetchReport();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <FileText className="mr-2" size={20} aria-hidden="true" />
          Credit Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        {report ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Latest Report</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(report.fetched_at).toLocaleDateString()}
                </p>
              </div>
              <a 
                href="#"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  handleViewReport();
                }}
                aria-label="View credit report"
              >
                <Download className="mr-2" size={16} aria-hidden="true" />
                View Report
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground">No reports available for this vendor.</p>
          </div>
        )}
        
        <div className="mt-4 border-t pt-4">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              handleFetchReport();
            }}
            className={`inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 hover:underline ${isPending ? 'opacity-50 pointer-events-none' : ''}`}
            aria-label="Request new credit report"
          >
            {isPending ? 'Fetching...' : 'Request New Credit Report'}
          </a>
          <p className="mt-2 text-sm text-muted-foreground">
            Fetch the latest credit information from our providers.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
