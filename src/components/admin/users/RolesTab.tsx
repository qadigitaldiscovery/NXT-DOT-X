
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';
import { AddRoleDialog } from './AddRoleDialog';

const mockRoles = [
  { id: '1', name: 'Administrator', description: 'Full system access', permissions: ['read', 'write', 'delete', 'admin'] },
  { id: '2', name: 'Editor', description: 'Can edit content', permissions: ['read', 'write'] },
  { id: '3', name: 'Viewer', description: 'Read-only access', permissions: ['read'] },
];

// Available permissions
const availablePermissions = ['read', 'write', 'delete', 'admin', 'export', 'import', 'manage-users'];

export function RolesTab() {
  const [roles, setRoles] = React.useState(mockRoles);
  const [isAddingRole, setIsAddingRole] = React.useState(false);

  const handleAddRole = (role: { name: string; description: string; permissions: string[] }) => {
    setRoles([...roles, { id: Date.now().toString(), ...role }]);
    setIsAddingRole(false);
  };

  const handleEditRole = (id: string) => {
    console.log(`Editing role ${id}`);
    // Implement edit functionality
  };

  const handleDeleteRole = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the role "${name}"?`)) {
      setRoles(roles.filter(role => role.id !== id));
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Roles</CardTitle>
          <CardDescription>Manage system roles and permissions</CardDescription>
        </div>
        <AddRoleDialog 
          permissions={availablePermissions} 
          onAddRole={handleAddRole}
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No roles found
                </TableCell>
              </TableRow>
            ) : (
              roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description || '—'}</TableCell>
                  <TableCell>{role.permissions?.join(', ') || 'None'}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditRole(role.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteRole(role.id, role.name)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default RolesTab;
