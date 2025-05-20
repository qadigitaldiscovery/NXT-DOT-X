import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { formatDate } from "../../../lib/utils";

interface Report {
  id: string;
  title: string;
  type: string;
  date: string;
  size: string;
  url: string;
}

interface ReportViewerProps {
  reports: Report[];
  onView: (report: Report) => void;
  onDownload: (report: Report) => void;
}

export const ReportViewer: React.FC<ReportViewerProps> = ({
  reports,
  onView,
  onDownload
}) => {
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return (
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'excel':
      case 'xlsx':
        return (
          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-gray-200">
          {reports.map((report) => (
            <div
              key={report.id}
              className="py-4 first:pt-0 last:pb-0"
            >
              <div className="flex items-start space-x-4">
                {getFileIcon(report.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {report.title}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{report.type.toUpperCase()}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                    <span>•</span>
                    <span>{formatDate(report.date)}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onView(report)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onDownload(report)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {reports.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No reports available
          </div>
        )}
      </CardContent>
    </Card>
  );
