
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { MoreHorizontal, Plus } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface ApiPermission {
  id: string;
  roleName: string;
  readAccess: boolean;
  writeAccess: boolean;
  deleteAccess: boolean;
  adminAccess: boolean;
}

const samplePermissions: ApiPermission[] = [
  {
    id: '1',
    roleName: 'Administrator',
    readAccess: true,
    writeAccess: true,
    deleteAccess: true,
    adminAccess: true
  },
  {
    id: '2',
    roleName: 'Data Analyst',
    readAccess: true,
    writeAccess: false,
    deleteAccess: false,
    adminAccess: false
  },
  {
    id: '3',
    roleName: 'Content Manager',
    readAccess: true,
    writeAccess: true,
    deleteAccess: false,
    adminAccess: false
  },
  {
    id: '4',
    roleName: 'External Partner',
    readAccess: true,
    writeAccess: false,
    deleteAccess: false,
    adminAccess: false
  }
];

const ApiPermissionsTable: React.FC = () => {
  const [permissions, setPermissions] = useState<ApiPermission[]>(samplePermissions);
  
  const handleTogglePermission = (id: string, field: keyof ApiPermission) => {
    setPermissions(permissions.map(permission => {
      if (permission.id === id) {
        return {
          ...permission,
          [field]: !permission[field]
        };
      }
      return permission;
    }));
    
    toast.success(`Permission updated successfully`);
  };
  
  const handleAddRole = () => {
    toast.info("Opening role configuration dialog");
    // In a real app, this would open a modal to add a new role
  };
  
  const handleDeleteRole = (id: string) => {
    setPermissions(permissions.filter(permission => permission.id !== id));
    toast.success("Role removed successfully");
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>API Permissions</CardTitle>
          <CardDescription>Configure access control and permissions for APIs</CardDescription>
        </div>
        <Button onClick={handleAddRole}>
          <Plus className="h-4 w-4 mr-1" /> Add Role
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead className="text-center">Read Access</TableHead>
                <TableHead className="text-center">Write Access</TableHead>
                <TableHead className="text-center">Delete Access</TableHead>
                <TableHead className="text-center">Admin Access</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell className="font-medium">{permission.roleName}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Switch 
                        checked={permission.readAccess}
                        onCheckedChange={() => handleTogglePermission(permission.id, 'readAccess')}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Switch 
                        checked={permission.writeAccess}
                        onCheckedChange={() => handleTogglePermission(permission.id, 'writeAccess')}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Switch 
                        checked={permission.deleteAccess}
                        onCheckedChange={() => handleTogglePermission(permission.id, 'deleteAccess')}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Switch 
                        checked={permission.adminAccess}
                        onCheckedChange={() => handleTogglePermission(permission.id, 'adminAccess')}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast.info(`Editing ${permission.roleName} role`)}>
                          Edit role
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteRole(permission.id)}
                        >
                          Delete role
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <p className="text-sm text-muted-foreground mt-4">
          Configure which roles can access different API operations. Changes take effect immediately.
        </p>
      </CardContent>
    </Card>
  );
};

export default ApiPermissionsTable;
