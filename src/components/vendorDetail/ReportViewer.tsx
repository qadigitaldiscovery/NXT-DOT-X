
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { VendorReport } from '@/types/vendor';

interface ReportViewerProps {
  report: VendorReport;
}

const ReportViewer: React.FC<ReportViewerProps> = ({ report }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-500" />
          <div>
            <CardTitle className="text-lg">{report.title}</CardTitle>
            <CardDescription className="text-sm">
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(report.createdAt)}
              </span>
            </CardDescription>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => window.open(report.fileUrl, '_blank')}>
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.location.href = report.fileUrl}>
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{report.description}</p>
      </CardContent>
    </Card>
  );
};

export default ReportViewer;
