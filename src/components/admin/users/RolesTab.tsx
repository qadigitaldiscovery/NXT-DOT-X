import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import AddRoleDialog from './AddRoleDialog';
import { useUserManagement } from '@/context/UserManagementContext';

const RolesTab: React.FC = () => {
  const { hasPermission } = useAuth();
  const { roles, permissions, addRole } = useUserManagement();
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);

  const handleAddRole = (newRole: any) => {
    addRole(newRole);
    toast.success(`Role ${newRole.name} created successfully`);
    setRoleDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>All Roles</CardTitle>
          {hasPermission('users.create') && (
            <AddRoleDialog 
              open={roleDialogOpen} 
              onOpenChange={setRoleDialogOpen} 
              onAddRole={handleAddRole} 
              permissions={permissions}
            />
          )}
        </div>
        <CardDescription>
          Manage roles and their associated permissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map(p => (
                      <Badge key={p} variant="outline" className="mr-1 mb-1">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" onClick={() => toast.info("Edit feature coming soon")}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RolesTab;
