
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Supplier } from '@/hooks/use-suppliers';

interface CostsListProps {
  supplier: Supplier;
}

export const CostsList: React.FC<CostsListProps> = ({ supplier }) => {
  // Mock data
  const costs = [
    {
      id: '1',
      item: 'Product A',
      cost: '$10.50',
      effectiveDate: '2024-01-01',
      currency: 'USD'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Data for {supplier.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Effective Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {costs.map((cost) => (
              <TableRow key={cost.id}>
                <TableCell>{cost.item}</TableCell>
                <TableCell>{cost.cost}</TableCell>
                <TableCell>{cost.currency}</TableCell>
                <TableCell>{cost.effectiveDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CostsList;
