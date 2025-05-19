import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, UserPlus } from 'lucide-react';
import { AddUserDialog } from './AddUserDialog';

const mockUsers = [
  { id: '1', username: 'admin', email: 'admin@example.com', role: 'Administrator', status: 'Active' },
  { id: '2', username: 'johndoe', email: 'john@example.com', role: 'Editor', status: 'Active' },
  { id: '3', username: 'janesmith', email: 'jane@example.com', role: 'Viewer', status: 'Inactive' },
];

export function UsersTab() {
  const [users, setUsers] = React.useState(mockUsers);
  const [isAddingUser, setIsAddingUser] = React.useState(false);

  const handleAddUser = (user: { username: string; email: string; role: string }) => {
    setUsers([...users, { id: Date.now().toString(), ...user, status: 'Active' }]);
    setIsAddingUser(false);
  };

  const handleEditUser = (id: string) => {
    console.log(`Editing user ${id}`);
    // Implement edit functionality
  };

  const handleDeleteUser = (id: string, username: string) => {
    if (window.confirm(`Are you sure you want to delete the user "${username}"?`)) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </div>
        <AddUserDialog open={isAddingUser} onOpenChange={setIsAddingUser} onUserAdded={handleAddUser} />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditUser(user.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id, user.username)}>
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
