
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info, Download } from 'lucide-react';

const SAMPLE_CSV = `name,code,contact_name,email,phone,website,payment_terms,status
"Audio Solutions","AUD001","John Smith","john@audiosolutions.com","+27 21 555 0101","audiosolutions.com","Net 30","active"
"Visual Technology","VIS002","Sarah Jones","sarah@visualtech.co.za","+27 11 555 0202","visualtech.co.za","Net 45","active"
"Sound Equipment Ltd","SND003","Michael Brown","michael@soundequip.com","+27 31 555 0303","soundequip.com","Cash on Delivery","active"
`;

export function SampleCsvSection() {
  const downloadTemplate = () => {
    const blob = new Blob([SAMPLE_CSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'supplier_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>CSV Format</AlertTitle>
      <AlertDescription>
        The CSV file should have the following headers: name, code, contact_name, email, phone, website, payment_terms, status.
        <Button 
          variant="link" 
          className="p-0 h-auto text-sm" 
          onClick={downloadTemplate}
        >
          Download template <Download className="h-3 w-3 ml-1" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}

export { SAMPLE_CSV };
