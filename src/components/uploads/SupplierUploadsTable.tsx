
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Supplier } from '@/hooks/use-suppliers';

interface SupplierUploadsTableProps {
  supplier?: Supplier;
  supplierId?: string;
}

export const SupplierUploadsTable: React.FC<SupplierUploadsTableProps> = ({
  supplier,
  supplierId
}) => {
  // Mock data
  const uploads = [
    {
      id: '1',
      filename: 'costs_2024.csv',
      uploadDate: '2024-01-15',
      status: 'processed',
      recordsCount: 150
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {supplier ? `Uploads for ${supplier.name}` : 'Recent Uploads'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Filename</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Records</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {uploads.map((upload) => (
              <TableRow key={upload.id}>
                <TableCell>{upload.filename}</TableCell>
                <TableCell>{upload.uploadDate}</TableCell>
                <TableCell>{upload.status}</TableCell>
                <TableCell>{upload.recordsCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SupplierUploadsTable;
