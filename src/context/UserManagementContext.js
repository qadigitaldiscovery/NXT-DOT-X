import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const UserManagementContext = createContext(undefined);
export function UserManagementProvider({ children }) {
    // For development, we'll use a mock current user
    const [currentUser] = useState({
        id: '1',
        email: 'admin@example.com',
        role: 'admin',
        permissions: ['suppliers.view', 'suppliers.edit', 'suppliers.create', 'suppliers.delete']
    });
    const [users] = useState([
        currentUser,
        // Add more users as needed
    ]);
    const [permissions] = useState([
        'suppliers.view',
        'suppliers.edit',
        'suppliers.create',
        'suppliers.delete',
        // Add more permissions as needed
    ]);
    const hasPermission = (permission) => {
        return currentUser?.permissions.includes(permission) ?? false;
    };
    const updateUserPermissions = (userId, newPermissions) => {
        // Implementation for updating user permissions
        console.log('Update permissions for user:', userId, newPermissions);
    };
    return (_jsx(UserManagementContext.Provider, { value: {
            users,
            currentUser,
            permissions,
            hasPermission,
            updateUserPermissions
        }, children: children }));
}
export function useUserManagement() {
    const context = useContext(UserManagementContext);
    if (context === undefined) {
        throw new Error('useUserManagement must be used within a UserManagementProvider');
    }
    return context;
}
