
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
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
          <FileText className="mr-2" size={20} />
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
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={handleViewReport}
              >
                <Download className="mr-2" size={16} />
                View Report
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground">No reports available for this vendor.</p>
          </div>
        )}
        
        <div className="mt-4 border-t pt-4">
          <Button 
            onClick={handleFetchReport} 
            disabled={isPending}
          >
            {isPending ? 'Fetching...' : 'Request New Credit Report'}
          </Button>
          <p className="mt-2 text-sm text-muted-foreground">
            Fetch the latest credit information from our providers.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
