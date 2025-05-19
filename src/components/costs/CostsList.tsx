import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface CostItem {
  id: string;
  supplier: string;
  category: string;
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const mockCosts: CostItem[] = [
  { id: '1', supplier: 'TechCorp', category: 'Hardware', amount: 12500.00, date: '2023-05-15', status: 'approved' },
  { id: '2', supplier: 'OfficeMax', category: 'Supplies', amount: 850.50, date: '2023-05-18', status: 'pending' },
  { id: '3', supplier: 'FurniCo', category: 'Furniture', amount: 3200.75, date: '2023-05-10', status: 'rejected' },
  { id: '4', supplier: 'SoftSolutions', category: 'Software', amount: 4999.99, date: '2023-05-22', status: 'approved' },
  { id: '5', supplier: 'CloudNet', category: 'Services', amount: 750.00, date: '2023-05-25', status: 'pending' },
];

export function CostsList() {
  const handleEdit = (id: string) => {
    console.log(`Editing cost ${id}`);
    // Implement edit functionality
  };

  const handleDelete = (id: string, supplier: string) => {
    if (window.confirm(`Are you sure you want to delete the cost entry for ${supplier}?`)) {
      console.log(`Deleting cost ${id}`);
      // Implement delete functionality
    }
  };

  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Supplier</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCosts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No costs found
              </TableCell>
            </TableRow>
          ) : (
            mockCosts.map((cost) => (
              <TableRow key={cost.id}>
                <TableCell className="font-medium">{cost.supplier}</TableCell>
                <TableCell>{cost.category}</TableCell>
                <TableCell>{formatCurrency(cost.amount)}</TableCell>
                <TableCell>{cost.date}</TableCell>
                <TableCell>
                  <Badge variant={
                    cost.status === 'approved' ? 'default' : 
                    cost.status === 'pending' ? 'secondary' : 'destructive'
                  }>
                    {cost.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {cost.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                    {cost.status === 'rejected' && <AlertCircle className="h-3 w-3 mr-1" />}
                    {cost.status.charAt(0).toUpperCase() + cost.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(cost.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(cost.id, cost.supplier)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
