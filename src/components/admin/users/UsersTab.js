import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EditUserDialog } from './EditUserDialog';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/toast';
export function UsersTab() {
    const [selectedUser, setSelectedUser] = useState(undefined);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const { user: currentUser } = useAuth();
    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsEditDialogOpen(true);
    };
    const handleUserUpdated = async (id, updatedUser) => {
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
        }
        catch (error) {
            toast.error('Failed to update user');
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Users Management" }), currentUser?.role === 'admin' && (_jsx(Button, { onClick: () => handleEditUser({
                            id: 'new',
                            username: '',
                            email: '',
                            role: 'viewer',
                            status: 'Active'
                        }), children: "Add User" }))] }), _jsx(EditUserDialog, { user: selectedUser, open: isEditDialogOpen, onOpenChange: setIsEditDialogOpen, onUserUpdated: handleUserUpdated })] }));
}
