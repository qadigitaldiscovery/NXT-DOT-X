
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { EndpointFormValues, endpointSchema, ApiEndpoint } from './types';
import { useState, useEffect } from 'react';

interface AddEndpointDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: EndpointFormValues) => void;
  endpoint?: ApiEndpoint | null;
  onClose?: () => void;
}

export function AddEndpointDialog({ open, onOpenChange, onSubmit, endpoint, onClose }: AddEndpointDialogProps) {
  const isEditMode = Boolean(endpoint);
  
  const form = useForm<EndpointFormValues>({
    resolver: zodResolver(endpointSchema),
    defaultValues: {
      name: '',
      url: '',
      method: 'POST',
      apiKey: '',
      status: 'active',
      description: '',
    }
  });

  useEffect(() => {
    // When editing, populate form with endpoint data
    if (endpoint) {
      form.reset({
        name: endpoint.name,
        url: endpoint.url,
        method: endpoint.method,
        apiKey: endpoint.apiKey,
        status: endpoint.status,
        description: endpoint.description || ''
      });
    } else {
      form.reset({
        name: '',
        url: '',
        method: 'POST',
        apiKey: '',
        status: 'active',
        description: ''
      });
    }
  }, [endpoint, form]);

  const handleSubmit = (values: EndpointFormValues) => {
    onSubmit(values);
    form.reset();
    if (onClose) onClose();
  };

  const handleDialogChange = (open: boolean) => {
    onOpenChange(open);
    if (!open && onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Endpoint' : 'Add New Endpoint'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Endpoint Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="https://api.example.com/resource" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="API Key" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Endpoint Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{isEditMode ? 'Update' : 'Add'} Endpoint</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddEndpointDialog;
