
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, RefreshCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

interface SuppliersTableProps {
  suppliers: Supplier[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onRefresh: () => void;
}

export function SuppliersTable({ suppliers, onDelete, onEdit, onRefresh }: SuppliersTableProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardContent>
        <div className="flex flex-wrap gap-4 items-center justify-between pb-4">
          <Input
            placeholder="Search suppliers..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onRefresh}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map(supplier => (
                <TableRow key={supplier.id}>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.email}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>
                    <Badge variant={supplier.status === 'active' ? 'default' : 'secondary'}>
                      {supplier.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(supplier.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(supplier.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredSuppliers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No suppliers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
