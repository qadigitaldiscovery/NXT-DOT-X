import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
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
export default function NewPartnerPage() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
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
    async function onSubmit(values) {
        setIsLoading(true);
        try {
            // Here you would normally submit to an API
            console.log(values);
            // Show success message
            toast({
                title: "Supplier created successfully",
                description: `${values.name} has been added as a supplier.`,
                action: _jsx(ToastAction, { children: "View" }),
            });
            // Navigate back to suppliers list
            setTimeout(() => {
                navigate('/data-management/suppliers');
            }, 1500);
        }
        catch (error) {
            toast({
                title: "Error creating partner",
                description: "There was an error creating the partner. Please try again.",
                variant: "destructive",
            });
        }
        finally {
            setIsLoading(false);
        }
    }
    return (_jsxs("div", { className: "container mx-auto py-6 space-y-8", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Add New Partner" }), _jsx("p", { className: "text-gray-500", children: "Add a new supplier or vendor to your partners directory" })] }), _jsx(Button, { onClick: () => navigate('/data-management/suppliers'), variant: "outline", children: "Cancel" })] }), _jsxs(Tabs, { defaultValue: "details", className: "space-y-6", children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "details", children: "Partner Details" }), _jsx(TabsTrigger, { value: "financial", children: "Financial Information" }), _jsx(TabsTrigger, { value: "documents", children: "Documents" })] }), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-8", children: [_jsx(TabsContent, { value: "details", className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Basic Information" }), _jsx(CardDescription, { children: "Enter the basic details about this partner" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Partner Name*" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "Enter partner name", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "type", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Partner Type*" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select partner type" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "supplier", children: _jsxs("div", { className: "flex items-center", children: [_jsx(Truck, { className: "h-4 w-4 mr-2" }), _jsx("span", { children: "Supplier" })] }) }), _jsx(SelectItem, { value: "vendor", children: _jsxs("div", { className: "flex items-center", children: [_jsx(Building, { className: "h-4 w-4 mr-2" }), _jsx("span", { children: "Vendor" })] }) })] })] }), _jsx(FormDescription, { children: "Suppliers provide products, Vendors provide services" }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email Address*" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "partner@example.com", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "phone", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Phone Number*" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "+1 (555) 123-4567", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "website", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Website" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "https://example.com", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "status", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Status" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select status" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "active", children: "Active" }), _jsx(SelectItem, { value: "inactive", children: "Inactive" })] })] }), _jsx(FormMessage, {})] })) })] }), _jsx(FormField, { control: form.control, name: "address", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Address*" }), _jsx(FormControl, { children: _jsx(Textarea, { placeholder: "Enter full address", className: "min-h-[80px]", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "description", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Description" }), _jsx(FormControl, { children: _jsx(Textarea, { placeholder: "Enter a brief description of this partner", className: "min-h-[120px]", ...field }) }), _jsx(FormMessage, {})] })) })] })] }) }), _jsx(TabsContent, { value: "financial", className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Financial Details" }), _jsx(CardDescription, { children: "Enter financial information and credit data" })] }), _jsx(CardContent, { className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(FormField, { control: form.control, name: "annual_spend", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Annual Spend" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "e.g. 75000", ...field, type: "number" }) }), _jsx(FormDescription, { children: "How much do you spend with this partner annually?" }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "payment_terms", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Payment Terms" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "e.g. Net 30", ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "credit_rating", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Credit Rating" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select credit rating" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "A", children: "A - Very Low Risk" }), _jsx(SelectItem, { value: "B", children: "B - Low Risk" }), _jsx(SelectItem, { value: "C", children: "C - Moderate Risk" }), _jsx(SelectItem, { value: "D", children: "D - High Risk" }), _jsx(SelectItem, { value: "F", children: "F - Very High Risk" })] })] }), _jsx(FormDescription, { children: "Rate the credit risk of this partner" }), _jsx(FormMessage, {})] })) })] }) })] }) }), _jsx(TabsContent, { value: "documents", className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Documents" }), _jsx(CardDescription, { children: "Upload related documents and files" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "border-2 border-dashed border-gray-200 rounded-lg p-6 text-center", children: [_jsx(FileUp, { className: "h-12 w-12 mx-auto text-gray-400" }), _jsx("h3", { className: "mt-2 text-sm font-semibold", children: "Upload documents" }), _jsx("p", { className: "mt-1 text-xs text-gray-500", children: "Drag and drop files or click to browse" }), _jsx(Button, { variant: "outline", size: "sm", className: "mt-4", children: "Choose Files" })] }), _jsxs("div", { className: "text-sm text-gray-500", children: [_jsx("p", { children: "Accepted file types: PDF, DOCX, XLSX, JPG, PNG" }), _jsx("p", { children: "Maximum file size: 10MB" })] })] })] }) }), _jsxs("div", { className: "flex justify-end gap-4", children: [_jsx(Button, { variant: "outline", onClick: () => navigate('/data-management/suppliers'), children: "Cancel" }), _jsx(Button, { type: "submit", disabled: isLoading, children: isLoading ? 'Creating...' : 'Create Partner' })] })] }) })] })] }));
}
