
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export const BulkSupplierUpload: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Supplier Import</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Upload a CSV file to import multiple suppliers at once.
          </p>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Choose File
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkSupplierUpload;
