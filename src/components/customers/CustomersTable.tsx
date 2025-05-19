import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpend: number;
  lastPurchase: string;
  status: 'active' | 'inactive';
}

const mockCustomers: Customer[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', totalSpend: 1250.50, lastPurchase: '2023-05-15', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 987-6543', totalSpend: 850.75, lastPurchase: '2023-04-22', status: 'active' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', phone: '(555) 456-7890', totalSpend: 320.25, lastPurchase: '2023-03-10', status: 'inactive' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', phone: '(555) 321-0987', totalSpend: 1800.00, lastPurchase: '2023-05-28', status: 'active' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', phone: '(555) 654-3210', totalSpend: 450.30, lastPurchase: '2023-02-18', status: 'inactive' },
];

export function CustomersTable() {
  const handleEdit = (id: string) => {
    console.log(`Editing customer ${id}`);
    // Implement edit functionality
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the customer "${name}"?`)) {
      console.log(`Deleting customer ${id}`);
      // Implement delete functionality
    }
  };

  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Total Spend</TableHead>
            <TableHead>Last Purchase</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockCustomers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No customers found
              </TableCell>
            </TableRow>
          ) : (
            mockCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{formatCurrency(customer.totalSpend)}</TableCell>
                <TableCell>{customer.lastPurchase}</TableCell>
                <TableCell>{customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(customer.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(customer.id, customer.name)}>
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
