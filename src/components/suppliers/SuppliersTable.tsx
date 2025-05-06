
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, Search, MoreHorizontal, Edit, Trash2, FileText } from "lucide-react";
import { Supplier, useSuppliers, useDeleteSupplier } from '@/hooks/use-suppliers';
import { Badge } from '@/components/ui/badge';

export function SuppliersTable() {
  const navigate = useNavigate();
  const { data: suppliers = [], isLoading, error } = useSuppliers();
  const { mutate: deleteSupplier } = useDeleteSupplier();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuppliers = suppliers.filter(supplier => 
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    supplier.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete supplier "${name}"?`)) {
      deleteSupplier(id);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Suppliers</CardTitle>
          <CardDescription>Loading suppliers...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Suppliers</CardTitle>
          <CardDescription>Error loading suppliers</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Failed to load suppliers. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Suppliers</CardTitle>
          <CardDescription>
            Manage your supplier information and cost data
          </CardDescription>
        </div>
        <Button onClick={() => navigate("/beta1/suppliers/new")}>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Supplier
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search suppliers..." 
            className="max-w-sm"
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-32 text-muted-foreground">
                    {searchTerm ? "No suppliers match your search" : "No suppliers found"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.code}</TableCell>
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell>{supplier.contact_name || "—"}</TableCell>
                    <TableCell>{supplier.email || "—"}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={supplier.status === "active" ? "default" : "secondary"}
                      >
                        {supplier.status === "active" ? "Active" : "Inactive"}
                      </Badge>
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
                          <DropdownMenuItem onClick={() => navigate(`/beta1/suppliers/${supplier.id}`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Supplier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/beta1/suppliers/${supplier.id}/costs`)}>
                            <FileText className="h-4 w-4 mr-2" />
                            View Costs
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(supplier.id, supplier.name)}
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
