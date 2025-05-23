
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function SampleCsvSection() {
  const downloadSampleCsv = () => {
    const sampleData = [
      ['name', 'code', 'email', 'phone', 'website', 'status', 'contact_name', 'payment_terms'],
      ['Acme Corp', 'ACM001', 'contact@acme.com', '+1234567890', 'https://acme.com', 'active', 'John Doe', 'Net 30'],
      ['Beta Industries', 'BET002', 'info@beta.com', '+1987654321', 'https://beta.com', 'active', 'Jane Smith', 'Net 60']
    ];

    const csvContent = sampleData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_suppliers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CSV Format Requirements</CardTitle>
        <CardDescription>
          Your CSV file should include the following columns
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Required columns:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>name</li>
              <li>code</li>
            </ul>
          </div>
          <div>
            <strong>Optional columns:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>email</li>
              <li>phone</li>
              <li>website</li>
              <li>status</li>
              <li>contact_name</li>
              <li>payment_terms</li>
            </ul>
          </div>
        </div>

        <Button onClick={downloadSampleCsv} variant="outline" className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Download Sample CSV
        </Button>
      </CardContent>
    </Card>
  );
}
