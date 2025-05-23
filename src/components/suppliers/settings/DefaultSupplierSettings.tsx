
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  defaultStatus: z.string().min(1, 'Status is required'),
  defaultPaymentTerms: z.string().optional(),
  defaultCurrency: z.string().min(1, 'Currency is required'),
  defaultEmailTemplate: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const DefaultSupplierSettings = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      defaultStatus: 'active',
      defaultPaymentTerms: 'Net 30',
      defaultCurrency: 'ZAR',
      defaultEmailTemplate: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // In a real implementation, you would save these settings to Supabase
      // For now, we'll just show a toast for demonstration
      console.log('Saving supplier defaults:', data);
      
      toast.success('Default supplier settings saved successfully');
    } catch (error) {
      console.error('Error saving supplier defaults:', error);
      toast.error('Failed to save default supplier settings');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="defaultStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select default status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Default status for newly created suppliers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="defaultPaymentTerms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Payment Terms</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Net 30">Net 30</SelectItem>
                    <SelectItem value="Net 45">Net 45</SelectItem>
                    <SelectItem value="Net 60">Net 60</SelectItem>
                    <SelectItem value="Immediate">Immediate</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Default payment terms for new suppliers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="defaultCurrency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default Currency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ZAR">ZAR - South African Rand</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Default currency for supplier costs.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="defaultEmailTemplate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Email Template</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter default email template for supplier communications..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Template used when emailing suppliers. Use {'{supplier_name}'} as placeholder.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4">Save Default Settings</Button>
      </form>
    </Form>
  );
};
