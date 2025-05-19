
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2, RefreshCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Supplier } from '@/hooks/suppliers/types';

interface SuppliersTableProps {
  suppliers?: Supplier[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onRefresh?: () => void;
}

export function SuppliersTable({ 
  suppliers = [], 
  onDelete = () => {}, 
  onEdit = () => {}, 
  onRefresh = () => {} 
}: SuppliersTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Make sure suppliers is an array before filtering
  const suppliersList = Array.isArray(suppliers) ? suppliers : [];
  
  const filteredSuppliers = suppliersList.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (supplier.email && supplier.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (supplier.phone && supplier.phone.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Use default handler functions if not provided through props
  const handleEdit = (id: string) => {
    if (onEdit) {
      onEdit(id);
    } else {
      navigate(`/data-management/suppliers/${id}`);
    }
  };

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  const handleRefresh = () => {
    onRefresh();
  };

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
            <Button variant="outline" size="sm" onClick={handleRefresh}>
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
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map(supplier => (
                  <TableRow key={supplier.id}>
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell>{supplier.email || '-'}</TableCell>
                    <TableCell>{supplier.phone || '-'}</TableCell>
                    <TableCell>
                      <Badge variant={supplier.status === 'active' ? 'default' : 'secondary'}>
                        {supplier.status || 'active'}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(supplier.id)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(supplier.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
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
