import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { PlusCircle, Search, Users, UserPlus, Shield, Settings, CheckCircle2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Sample user data
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    created: '2023-01-10'
  },
  {
    id: '2',
    username: 'manager',
    email: 'manager@example.com',
    role: 'manager',
    status: 'active',
    created: '2023-02-15'
  },
  {
    id: '3',
    username: 'user',
    email: 'user@example.com',
    role: 'user',
    status: 'active',
    created: '2023-03-20'
  }
];

// Sample roles
const roles = [
  {
    id: '1',
    name: 'admin',
    description: 'Full access to all system functions',
    permissions: ['users.view', 'users.create', 'users.edit', 'users.delete', 'settings.access', 'modules.all']
  },
  {
    id: '2',
    name: 'manager',
    description: 'Access to manage specific modules',
    permissions: ['users.view', 'settings.access', 'modules.data', 'modules.loyalty']
  },
  {
    id: '3',
    name: 'user',
    description: 'Limited access to basic functions',
    permissions: ['modules.data']
  }
];

// Sample permissions
const permissions = [
  { id: 'users.view', name: 'View Users', category: 'Users' },
  { id: 'users.create', name: 'Create Users', category: 'Users' },
  { id: 'users.edit', name: 'Edit Users', category: 'Users' },
  { id: 'users.delete', name: 'Delete Users', category: 'Users' },
  { id: 'settings.access', name: 'Access Settings', category: 'Settings' },
  { id: 'modules.all', name: 'Access All Modules', category: 'Modules' },
  { id: 'modules.data', name: 'Access Data Module', category: 'Modules' },
  { id: 'modules.loyalty', name: 'Access Loyalty Module', category: 'Modules' }
];

// Form schemas
const userFormSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.string().min(1, { message: "Please select a role" }),
});

const roleFormSchema = z.object({
  name: z.string().min(3, { message: "Role name must be at least 3 characters" }),
  description: z.string().optional(),
  permissions: z.array(z.string()).nonempty({ message: "Select at least one permission" }),
});

const UserManagement = () => {
  const { user, hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(mockUsers);
  const [rolesData, setRolesData] = useState(roles);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);

  // User form
  const userForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      role: '',
    },
  });

  // Role form
  const roleForm = useForm<z.infer<typeof roleFormSchema>>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: '',
      description: '',
      permissions: [],
    },
  });

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = (data: z.infer<typeof userFormSchema>) => {
    const newUser = {
      id: (users.length + 1).toString(),
      username: data.username,
      email: data.email,
      role: data.role,
      status: 'active',
      created: new Date().toISOString().split('T')[0]
    };
    
    setUsers([...users, newUser]);
    toast.success(`User ${data.username} created successfully`);
    userForm.reset();
    setDialogOpen(false);
  };

  const handleAddRole = (data: z.infer<typeof roleFormSchema>) => {
    const newRole = {
      id: (rolesData.length + 1).toString(),
      name: data.name,
      description: data.description || '',
      permissions: data.permissions
    };
    
    setRolesData([...rolesData, newRole]);
    toast.success(`Role ${data.name} created successfully`);
    roleForm.reset();
    setRoleDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-500">Manage system users, roles, and permissions</p>
        </div>
        {hasPermission('users.create') && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account with specific role and permissions.
                </DialogDescription>
              </DialogHeader>
              <Form {...userForm}>
                <form onSubmit={userForm.handleSubmit(handleAddUser)} className="space-y-4 py-4">
                  <FormField
                    control={userForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={userForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={userForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={userForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {rolesData.map(role => (
                              <SelectItem key={role.id} value={role.name}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit">Create User</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="users" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Permissions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>All Users</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <CardDescription>
                Manage user accounts and access permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'manager' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'outline'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.created}</TableCell>
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
        </TabsContent>
        
        <TabsContent value="roles">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>All Roles</CardTitle>
                {hasPermission('users.create') && (
                  <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Role
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Add New Role</DialogTitle>
                        <DialogDescription>
                          Create a new role with specific permissions.
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...roleForm}>
                        <form onSubmit={roleForm.handleSubmit(handleAddRole)} className="space-y-4 py-4">
                          <FormField
                            control={roleForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Role Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter role name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={roleForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter description" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={roleForm.control}
                            name="permissions"
                            render={() => (
                              <FormItem>
                                <div className="mb-4">
                                  <FormLabel className="text-base">Permissions</FormLabel>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  {permissions.map((permission) => (
                                    <FormField
                                      key={permission.id}
                                      control={roleForm.control}
                                      name="permissions"
                                      render={({ field }) => {
                                        return (
                                          <FormItem
                                            key={permission.id}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                          >
                                            <FormControl>
                                              <Checkbox
                                                checked={field.value?.includes(permission.id)}
                                                onCheckedChange={(checked) => {
                                                  const currentPermissions = field.value || [];
                                                  const newPermissions = checked
                                                    ? [...currentPermissions, permission.id]
                                                    : currentPermissions.filter(
                                                        (p) => p !== permission.id
                                                      );
                                                  field.onChange(newPermissions);
                                                }}
                                              />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                              {permission.name}
                                              <span className="text-xs text-muted-foreground ml-1">
                                                ({permission.category})
                                              </span>
                                            </FormLabel>
                                          </FormItem>
                                        );
                                      }}
                                    />
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <DialogFooter>
                            <Button type="submit">Create Role</Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
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
                  {rolesData.map((role) => (
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
        </TabsContent>
        
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Permission Management</CardTitle>
              <CardDescription>
                View all available permissions in the system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Group permissions by category */}
              {Object.entries(
                permissions.reduce((acc, permission) => {
                  const { category } = permission;
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(permission);
                  return acc;
                }, {} as Record<string, typeof permissions>)
              ).map(([category, perms]) => (
                <div key={category} className="mb-8">
                  <h3 className="text-lg font-medium mb-4">{category} Permissions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {perms.map((permission) => (
                      <div 
                        key={permission.id} 
                        className="p-4 border rounded-md flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{permission.name}</p>
                          <p className="text-sm text-muted-foreground">{permission.id}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;
