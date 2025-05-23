
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const SampleCsvSection = () => {
  const sampleData = `name,email,phone,address,category
Acme Corporation,contact@acme.com,555-0123,123 Main St,Technology
Beta Industries,info@beta.com,555-0456,456 Oak Ave,Manufacturing
Gamma Solutions,sales@gamma.com,555-0789,789 Pine Rd,Services`;

  const downloadSample = () => {
    const blob = new Blob([sampleData], { type: 'text/csv' });
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
        <CardTitle>Sample CSV Format</CardTitle>
        <CardDescription>
          Download a sample CSV file to see the expected format for bulk supplier uploads.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={downloadSample} variant="outline" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Sample CSV
        </Button>
      </CardContent>
    </Card>
  );
};

export default SampleCsvSection;
