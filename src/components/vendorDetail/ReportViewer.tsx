
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Download, Calendar, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { VendorReport } from '@/types/vendor';

interface ReportViewerProps {
  reports: VendorReport[];
  isLoading?: boolean;
}

const ReportViewer: React.FC<ReportViewerProps> = ({ reports, isLoading = false }) => {
  const [selectedReport, setSelectedReport] = useState<VendorReport | null>(null);

  if (isLoading) {
    return <div className="p-6 text-center">Loading reports...</div>;
  }

  if (reports.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No reports available for this vendor.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return 'Unknown date';
    }
  };

  const handleViewReport = (report: VendorReport) => {
    setSelectedReport(report);
    if (report.file_url) {
      window.open(report.file_url, '_blank');
    }
  };

  const handleDownloadReport = (report: VendorReport) => {
    if (report.file_url) {
      const link = document.createElement('a');
      link.href = report.file_url;
      link.download = `${report.title || 'vendor-report'}.pdf`;
      link.click();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Vendor Reports</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <CardTitle>{report.title || 'Untitled Report'}</CardTitle>
              <CardDescription className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {formatDate(report.created_at)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <FileText className="mr-2 h-4 w-4" />
                {report.type || 'Document'}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleViewReport(report)}
                disabled={!report.file_url}
              >
                <Eye className="mr-2 h-4 w-4" /> View
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleDownloadReport(report)}
                disabled={!report.file_url}
              >
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportViewer;
