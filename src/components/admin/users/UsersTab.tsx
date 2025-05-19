import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EditUserDialog } from './EditUserDialog';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/toast';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  status: string;
}

export function UsersTab() {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { user: currentUser } = useAuth();

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleUserUpdated = async (
    id: string,
    updatedUser: { username: string; email: string; role: string; status: string }
  ) => {
    try {
      // Update user logic here
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      toast.success('User updated successfully');
      setIsEditDialogOpen(false);
      setSelectedUser(undefined);
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users Management</h2>
        {currentUser?.role === 'admin' && (
          <Button
            onClick={() =>
              handleEditUser({
                id: 'new',
                username: '',
                email: '',
                role: 'viewer',
                status: 'Active'
              })
            }
          >
            Add User
          </Button>
        )}
      </div>

      {/* User list would go here */}
      
      <EditUserDialog
        user={selectedUser}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUserUpdated={handleUserUpdated}
      />
    </div>
  );
}
