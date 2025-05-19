
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SampleCsvSection() {
  const downloadSampleCsv = () => {
    // Create sample CSV content with required and optional fields
    const headers = ["name", "code", "contact_name", "email", "phone", "website", "payment_terms", "status"];
    const sampleData = [
      ["Acme Supplies", "ACME001", "John Doe", "john@acme.com", "+1-555-123-4567", "https://acme.com", "Net 30", "active"],
      ["GlobalTech", "GTECH002", "Jane Smith", "jane@globaltech.com", "+1-555-987-6543", "https://globaltech.com", "Net 45", "active"],
      ["Local Distributors", "LDIST003", "Robert Johnson", "robert@localdist.com", "+1-555-456-7890", "https://localdist.com", "Net 15", "active"]
    ];
    
    // Convert to CSV string
    const csvContent = [
      headers.join(','),
      ...sampleData.map(row => row.join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'sample_suppliers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="space-y-4">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Required CSV Format</AlertTitle>
        <AlertDescription>
          <div className="mt-2 space-y-2">
            <p>Your CSV file must include the following headers:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge variant="outline" className="bg-red-50 text-red-800 hover:bg-red-100 border-red-200">
                name*
              </Badge>
              <Badge variant="outline" className="bg-red-50 text-red-800 hover:bg-red-100 border-red-200">
                code*
              </Badge>
              <Badge variant="outline">contact_name</Badge>
              <Badge variant="outline">email</Badge>
              <Badge variant="outline">phone</Badge>
              <Badge variant="outline">website</Badge>
              <Badge variant="outline">payment_terms</Badge>
              <Badge variant="outline">status</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">* Required fields</p>
          </div>
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={downloadSampleCsv}
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          Download Sample CSV
        </Button>
      </div>
    </div>
  );
}
