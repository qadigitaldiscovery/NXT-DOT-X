import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useModules } from '@/context/ModulesContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

interface User {
  id: string;
  email?: string;
  username?: string;
}

interface ModuleTogglePanelProps {
  userId: string;
}

const ModuleTogglePanel: React.FC<ModuleTogglePanelProps> = ({ userId }) => {
  const { modules, loading, toggleModule } = useModules();
  const [selectedUser, setSelectedUser] = useState(userId);
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useAuth();

  const handleUserChange = (uid: string) => setSelectedUser(uid);

  const handleToggleAccess = (moduleId: string) => {
    toggleModule(moduleId);
    toast.success('Module access updated');
  };

  /* demo user list */
  useEffect(() => {
    if (user) {
      setUsers([
        { id: user.id, email: user.email, username: user.email || user.id },
      ]);
    }
  }, [user]);

  return (
    <div className="space-y-8">
      {/* ───── Current access ───── */}
      <Card>
        <CardHeader>
          <CardTitle>Module Access Control</CardTitle>
          <CardDescription>
            Manage which modules each user can access
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* user selector */}
          <div className="mb-6">
            <Label htmlFor="userId">Select User</Label>
            <Select value={selectedUser} onValueChange={handleUserChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {users.map(u => (
                  <SelectItem key={u.id} value={u.id}>
                    {u.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-500" />
            </div>
          ) : modules.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              No modules configured
            </p>
          ) : (
            <div className="space-y-4">
              {modules.map(m => (
                <div
                  key={m.id}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div>
                    <div className="font-medium">{m.name}</div>
                    {Object.keys(m.features).length > 0 && (
                      <Badge variant="outline" className="mt-1">
                        {Object.keys(m.features).length} features
                      </Badge>
                    )}
                  </div>
                  <Switch
                    checked={m.enabled}
                    onCheckedChange={() => handleToggleAccess(m.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ───── Add access UI (stub, unchanged) ───── */}
      <Card>
        <CardHeader>
          <CardTitle>Add Module Access</CardTitle>
          <CardDescription>Grant access to another module</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={e => {
              e.preventDefault();
              toast.error('Adding module access not implemented yet');
            }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="moduleSlug">Module *</Label>
                <Select name="moduleSlug" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a module" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.map(m => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="submenuSlug">Submenu (optional)</Label>
                <Input id="submenuSlug" name="submenuSlug" />
              </div>
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
