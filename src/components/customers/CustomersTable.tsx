import { useState } from 'react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Trash2, FileText } from "lucide-react";
import { Button } from '@/components/ui/button';

// Mock customer data
const mockCustomers = [
  { 
    id: "1", 
    code: "ACME001", 
    name: "Acme Corporation", 
    contact_name: "John Doe", 
    email: "john@acme.com",
    status: "active",
    account_type: "enterprise" 
  },
  { 
    id: "2", 
    code: "GLOBEX002", 
    name: "Globex Industries", 
    contact_name: "Jane Smith", 
    email: "jane@globex.com",
    status: "active",
    account_type: "premium" 
  },
  { 
    id: "3", 
    code: "INITECH003", 
    name: "Initech LLC", 
    contact_name: "Mike Johnson", 
    email: "mike@initech.com",
    status: "inactive",
    account_type: "standard" 
  }
];

export function CustomersTable() {
  const navigate = useNavigate();
  const [customers] = useState(mockCustomers);
  
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete customer "${name}"?`)) {
      console.log(`Deleting customer ${id}`);
      // In a real implementation, this would delete the customer
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Account Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center h-32 text-muted-foreground">
                No customers found
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.code}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.contact_name || "—"}</TableCell>
                <TableCell>{customer.email || "—"}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {customer.account_type.charAt(0).toUpperCase() + customer.account_type.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={customer.status === "active" ? "default" : "secondary"}
                  >
                    {customer.status === "active" ? "Active" : "Inactive"}
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
                      <DropdownMenuItem onClick={() => navigate(`/customer-management/${customer.id}`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Customer
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/customer-management/${customer.id}/analytics`)}>
                        <FileText className="h-4 w-4 mr-2" />
                        View Analytics
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDelete(customer.id, customer.name)}
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
  );
}
