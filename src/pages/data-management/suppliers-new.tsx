
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Building, Truck, FileUp } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  type: z.enum(['vendor', 'supplier']),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(6, { message: 'Please enter a valid phone number.' }),
  website: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  address: z.string().min(5, { message: 'Address must be at least 5 characters.' }),
  description: z.string().optional(),
  annual_spend: z.string().optional(),
  credit_rating: z.enum(['A', 'B', 'C', 'D', 'F']).optional(),
  payment_terms: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('active')
});

type FormValues = z.infer<typeof formSchema>;

export default function NewPartnerPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: 'supplier',
      email: '',
      phone: '',
      website: '',
      address: '',
      description: '',
      annual_spend: '',
      credit_rating: 'B',
      payment_terms: 'Net 30',
      status: 'active'
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      console.log(values);
      
      toast.success(`${values.name} has been added as a supplier.`);
      
      setTimeout(() => {
        navigate('/data-management/suppliers');
      }, 1500);
    } catch (error) {
      toast.error("There was an error creating the partner. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Add New Partner</h1>
          <p className="text-gray-500">
            Add a new supplier or vendor to your partners directory
          </p>
        </div>
        <Button onClick={() => navigate('/data-management/suppliers')} variant="outline">
          Cancel
        </Button>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Partner Details</TabsTrigger>
          <TabsTrigger value="financial">Financial Information</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Enter the basic details about this partner
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Partner Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter partner name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Partner Type*</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select partner type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="supplier">
                                <div className="flex items-center">
                                  <Truck className="h-4 w-4 mr-2" />
                                  <span>Supplier</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="vendor">
                                <div className="flex items-center">
                                  <Building className="h-4 w-4 mr-2" />
                                  <span>Vendor</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Suppliers provide products, Vendors provide services
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address*</FormLabel>
                          <FormControl>
                            <Input placeholder="partner@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number*</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address*</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter full address" 
                            className="min-h-[80px]" 
                            {...field} 
                          />
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
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter a brief description of this partner" 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="financial" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Details</CardTitle>
                  <CardDescription>
                    Enter financial information and credit data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="annual_spend"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Annual Spend</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. 75000" 
                              {...field} 
                              type="number"
                            />
                          </FormControl>
                          <FormDescription>
                            How much do you spend with this partner annually?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="payment_terms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Terms</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Net 30" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="credit_rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Credit Rating</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select credit rating" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="A">A - Very Low Risk</SelectItem>
                              <SelectItem value="B">B - Low Risk</SelectItem>
                              <SelectItem value="C">C - Moderate Risk</SelectItem>
                              <SelectItem value="D">D - High Risk</SelectItem>
                              <SelectItem value="F">F - Very High Risk</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Rate the credit risk of this partner
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>
                    Upload related documents and files
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                    <FileUp className="h-12 w-12 mx-auto text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold">Upload documents</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Drag and drop files or click to browse
                    </p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Choose Files
                    </Button>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <p>Accepted file types: PDF, DOCX, XLSX, JPG, PNG</p>
                    <p>Maximum file size: 10MB</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <div className="flex justify-end gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/data-management/suppliers')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Partner'}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
}
