
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from 'date-fns';
import { PlusCircle, MoreHorizontal, Edit, History, Trash2, Search, Calendar, Filter } from "lucide-react";
import { CostFilterOptions, useDeleteSupplierCost, useSupplierCosts } from '@/hooks/use-supplier-costs';
import { Supplier } from '@/hooks/use-suppliers';

type CostsListProps = {
  supplier?: Supplier;
};

export function CostsList({ supplier }: CostsListProps) {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<CostFilterOptions>({
    supplierId: supplier?.id,
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: costs = [], isLoading } = useSupplierCosts(filters);
  const { mutate: deleteCost } = useDeleteSupplierCost();
  
  // Filter by search term (product name or SKU)
  const filteredCosts = costs.filter(cost => 
    cost.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    cost.product_sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this cost record?')) {
      deleteCost(id);
    }
  };
  
  const handleFilterChange = (key: keyof CostFilterOptions, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>
            {supplier ? `${supplier.name} - Costs` : 'All Supplier Costs'}
          </CardTitle>
          <CardDescription>
            {supplier 
              ? `Manage cost data for ${supplier.name}`
              : 'View and manage all supplier costs'}
          </CardDescription>
        </div>
        <Button onClick={() => navigate(supplier 
          ? `/beta1/suppliers/${supplier.id}/costs/new` 
          : '/beta1/costs/new'
        )}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Cost
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by product name or SKU..."
                className="pl-8"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Status:</span>
              <Select
                value={filters.status || ''}
                onValueChange={value => handleFilterChange('status', value || undefined)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending_approval">Pending</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {!supplier && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Date:</span>
                <Select
                  value={filters.effectiveDateStart ? 'custom' : ''}
                  onValueChange={value => {
                    if (value === '') {
                      handleFilterChange('effectiveDateStart', undefined);
                      handleFilterChange('effectiveDateEnd', undefined);
                    } else if (value === 'current') {
                      handleFilterChange('effectiveDateStart', new Date().toISOString());
                    }
                  }}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="All Dates" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Dates</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                {!supplier && <TableHead>Supplier</TableHead>}
                <TableHead>Cost</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={supplier ? 8 : 9} className="h-24 text-center">
                    Loading costs...
                  </TableCell>
                </TableRow>
              ) : filteredCosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={supplier ? 8 : 9} className="h-24 text-center text-muted-foreground">
                    No cost data found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCosts.map((cost) => (
                  <TableRow key={cost.id}>
                    <TableCell>{cost.product_name}</TableCell>
                    <TableCell className="font-mono">{cost.product_sku}</TableCell>
                    {!supplier && <TableCell>{cost.supplier_name}</TableCell>}
                    <TableCell className="font-mono">{formatCurrency(cost.cost, cost.currency_code)}</TableCell>
                    <TableCell>{cost.currency_code}</TableCell>
                    <TableCell>
                      {cost.effective_date ? format(new Date(cost.effective_date), 'PP') : '—'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        cost.status === 'active' ? 'default' :
                        cost.status === 'pending_approval' ? 'outline' :
                        cost.status === 'expired' ? 'secondary' : 'destructive'
                      }>
                        {cost.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {cost.is_promotional && <Badge variant="outline" className="bg-amber-50">Promotional</Badge>}
                      {cost.is_contract && <Badge variant="outline" className="bg-blue-50">Contract</Badge>}
                      {!cost.is_promotional && !cost.is_contract && "Standard"}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => navigate(`/beta1/costs/${cost.id}`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/beta1/costs/${cost.id}/history`)}>
                            <History className="h-4 w-4 mr-2" />
                            View History
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(cost.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
