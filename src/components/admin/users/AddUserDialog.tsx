import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { UserPlus } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, ControllerRenderProps } from 'react-hook-form';
import * as z from 'zod';
import { Role } from '@/context/UserManagementContext';

// Enhanced form schema with validation
const userFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(50, { message: "Username must be less than 50 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { 
      message: "Username can only contain letters, numbers and underscores" 
    }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(100, { message: "Email must be less than 100 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    }),
  role: z
    .string()
    .min(1, { message: "Please select a role" }),
});

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUser: (user: any) => void;
  rolesData: Role[];
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({ open, onOpenChange, onAddUser, rolesData }) => {
  const userForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      role: '',
    },
  });

  const handleAddUser = (data: z.infer<typeof userFormSchema>) => {
    const newUser = {
      id: Math.random().toString(36).substring(2, 11),
      username: data.username,
      email: data.email,
      role: data.role,
      status: 'active',
      created: new Date().toISOString().split('T')[0]
    };
    
    onAddUser(newUser);
    userForm.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof userFormSchema>, "username"> }) => (
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
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof userFormSchema>, "email"> }) => (
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
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof userFormSchema>, "password"> }) => (
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
              render={({ field }: { field: ControllerRenderProps<z.infer<typeof userFormSchema>, "role"> }) => (
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
  );
};

export default AddUserDialog;
