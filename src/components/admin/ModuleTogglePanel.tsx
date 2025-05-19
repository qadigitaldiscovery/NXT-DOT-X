import React, { useState, useEffect, JSX } from 'react';
import { toast } from 'sonner';
import { useModules } from '@/context/ModulesContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

interface User {
  id: string;
  username: string;
}

interface ModuleTogglePanelProps {
  userId: string;
}

const ModuleTogglePanel: React.FC<ModuleTogglePanelProps> = ({ userId }): JSX.Element => {
  const { modules, moduleAccess, loading, error, toggleAccess, addModuleAccess, refreshAccess } = useModules();
  const [selectedUser, setSelectedUser] = useState<string>(userId);
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useAuth();

  // Filter access list for the selected user
  const userAccessList = moduleAccess.filter(access => access.user_id === selectedUser);

  const handleUserChange = (uid: string) => {
    setSelectedUser(uid);
  };

  const handleToggleAccess = async (id: string, currentValue: boolean) => {
    try {
      await toggleAccess(id, !currentValue);
      toast.success(`Module access ${!currentValue ? 'enabled' : 'disabled'}`);
    } catch (err) {
      console.error('Error toggling access:', err);
      toast.error('Failed to update module access');
    }
  };

  const handleAddModuleAccess = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const moduleSlug = formData.get('moduleSlug') as string;
    const submenuSlug = formData.get('submenuSlug') as string;
    const category = formData.get('category') as string;

    if (!moduleSlug) {
      toast.error('Module slug is required');
      return;
    }

    try {
      await addModuleAccess({
        user_id: selectedUser,
        module_slug: moduleSlug,
        submenu_slug: submenuSlug || undefined,
        category: category || undefined,
        is_enabled: true
      });

      // Refresh the access list
      await refreshAccess();

      // Reset the form
      (event.target as HTMLFormElement).reset();
      toast.success('Module access added successfully');
    } catch (err) {
      console.error('Error adding module access:', err);
      toast.error('Failed to add module access');
    }
  };

  useEffect(() => {
    // For demonstration, we'll just use the current user
    // In a real app, you'd fetch the list of users from your backend
    if (user) {
      setUsers([
        {
          id: user.id,
          username: user.email || user.id
        }
      ]);
    }
  }, [user]);

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading module access: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Module Access Control</CardTitle>
          <CardDescription>
            Manage which modules and submenus users can access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="userId">Select User</Label>
            <Select value={selectedUser} onValueChange={handleUserChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-t-2 border-b-2 border-gray-500 rounded-full animate-spin"></div>
            </div>
          ) : userAccessList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No module access settings found for this user
            </div>
          ) : (
            <div className="space-y-4">
              {userAccessList.map(access => (
                <div key={access.id} className="flex justify-between items-center border p-3 rounded-md">
                  <div>
                    <div className="font-medium">{access.module_slug}</div>
                    {access.submenu_slug && (
                      <div className="text-sm text-gray-500">
                        Submenu: {access.submenu_slug}
                      </div>
                    )}
                    {access.category && (
                      <Badge variant="outline" className="mt-1">
                        {access.category}
                      </Badge>
                    )}
                  </div>
                  <Switch 
                    checked={access.is_enabled} 
                    onCheckedChange={() => handleToggleAccess(access.id, access.is_enabled)} 
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Module Access</CardTitle>
          <CardDescription>
            Grant access to a module for this user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddModuleAccess} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="moduleSlug">Module Slug *</Label>
                <Select name="moduleSlug" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a module" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.map(module => (
                      <SelectItem key={module.id} value={module.id}>
                        {module.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="submenuSlug">Submenu Slug (Optional)</Label>
                <Input id="submenuSlug" name="submenuSlug" placeholder="e.g., analytics" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category (Optional)</Label>
              <Select name="category">
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project">Project</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Add Access
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleTogglePanel;
