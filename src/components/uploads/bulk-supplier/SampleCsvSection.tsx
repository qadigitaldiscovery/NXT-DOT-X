
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';

export function SampleCsvSection() {
  const generateSampleCsv = () => {
    const headers = "name,code,contact_name,email,phone,website,payment_terms,status";
    const rows = [
      '"ABC Corporation",ABC001,"John Smith",john@abccorp.example,555-1234,https://abccorp.example,"Net 30",active',
      '"XYZ Suppliers",XYZ002,"Jane Doe",jane@xyzsuppliers.example,555-5678,https://xyzsuppliers.example,"Net 60",active',
      '"123 Manufacturing",MFG003,"Mike Johnson",mike@123mfg.example,555-9012,https://123mfg.example,"Net 15",inactive'
    ];
    
    return [headers, ...rows].join('\n');
  };
  
  const downloadSampleCsv = () => {
    const csvContent = generateSampleCsv();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'sample_suppliers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="instructions">
        <AccordionTrigger className="text-sm">CSV Format Instructions & Sample</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3 text-sm">
            <div className="mb-4">
              <h4 className="font-medium mb-1">Required Fields</h4>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="outline" className="bg-primary/10">name</Badge>
                <Badge variant="outline" className="bg-primary/10">code</Badge>
              </div>
              <p className="text-muted-foreground text-xs">
                Note: Our system is intelligent and will try to detect these fields even if your headers are different.
              </p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium mb-1">Optional Fields</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">contact_name</Badge>
                <Badge variant="outline">email</Badge>
                <Badge variant="outline">phone</Badge>
                <Badge variant="outline">website</Badge>
                <Badge variant="outline">payment_terms</Badge>
                <Badge variant="outline">status</Badge>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium mb-1">Intelligent Header Recognition</h4>
              <p className="text-muted-foreground text-xs">
                We can recognize variations of headers like "Supplier Name" for "name", "Vendor Code" for "code", etc.
                If required fields are missing, we'll attempt to generate them automatically.
              </p>
            </div>
            
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={downloadSampleCsv}
                className="flex items-center gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                Download Sample CSV
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
