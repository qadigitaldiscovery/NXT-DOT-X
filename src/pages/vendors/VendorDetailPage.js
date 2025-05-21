import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Mail, Phone, MapPin, Link } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { DocumentsTable } from '@/components/uploads/DocumentsTable';
export default function VendorDetailPage() {
    const { vendorId } = useParams();
    const [vendor, setVendor] = useState({
        id: vendorId,
        name: 'AudioTech Pro',
        contactEmail: 'info@audiotechpro.com',
        contactPhone: '+1 (555) 123-4567',
        address: '123 Tech Street, Suite 200, Innovation City, CA 91234',
        website: 'https://www.audiotechpro.com',
        status: 'active',
        description: 'AudioTech Pro is a leading supplier of professional audio equipment and solutions. With over 20 years of experience, they provide high-quality products and exceptional customer service to clients worldwide.',
        notes: 'Preferred vendor for audio equipment. Consistently delivers on time and within budget.',
        contractTerms: 'Net 30 payment terms. Annual contract renewal required.',
        performanceMetrics: {
            deliveryTime: '98%',
            qualityScore: '4.8/5',
            responseRate: '95%'
        }
    });
    useEffect(() => {
        // Simulate fetching vendor details from an API
        // In a real application, you would use `fetch` or `axios`
        // to get the vendor data based on the `vendorId`
        // For now, we'll just log the vendorId
        console.log('Fetching vendor details for vendorId:', vendorId);
    }, [vendorId]);
    // Replace 'success' variant with 'default' with green styling
    const getStatusBadge = (status) => {
        if (status === 'active' || status === 'approved') {
            return (_jsx(Badge, { variant: "outline", className: "bg-green-50 text-green-700 border-green-200", children: status === 'active' ? 'Active' : 'Approved' }));
        }
        else if (status === 'inactive' || status === 'rejected') {
            return _jsx(Badge, { variant: "destructive", children: status === 'inactive' ? 'Inactive' : 'Rejected' });
        }
        else {
            return _jsx(Badge, { variant: "outline", children: status });
        }
    };
    return (_jsxs("div", { className: "container mx-auto py-10", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { tag: "h4", children: vendor.name }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "h-8 w-8 p-0", children: [_jsx("span", { className: "sr-only", children: "Open menu" }), _jsx(MoreHorizontal, { className: "h-4 w-4" })] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuLabel, { children: "Actions" }), _jsxs(DropdownMenuItem, { children: [_jsx(Mail, { className: "h-4 w-4 mr-2" }), "Send Email"] }), _jsxs(DropdownMenuItem, { children: [_jsx(Phone, { className: "h-4 w-4 mr-2" }), "Call"] }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { children: "Edit Details" })] })] })] }), _jsxs(CardContent, { className: "grid gap-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-sm font-medium", children: "Status:" }), getStatusBadge(vendor.status)] }), _jsxs("div", { className: "grid gap-2", children: [_jsx("div", { className: "text-sm font-medium", children: "Contact Information" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Mail, { className: "h-4 w-4 text-muted-foreground" }), _jsx("a", { href: `mailto:${vendor.contactEmail}`, className: "hover:underline", children: vendor.contactEmail })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Phone, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: vendor.contactPhone })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: vendor.address })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Link, { className: "h-4 w-4 text-muted-foreground" }), _jsx("a", { href: vendor.website, target: "_blank", rel: "noopener noreferrer", className: "hover:underline", children: vendor.website })] })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx("div", { className: "text-sm font-medium", children: "Description" }), _jsx(CardDescription, { children: vendor.description })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx("div", { className: "text-sm font-medium", children: "Notes" }), _jsx(CardDescription, { children: vendor.notes })] })] })] }), _jsx("div", { className: "mt-6", children: _jsx(DocumentsTable, { supplier: { id: vendor.id, name: vendor.name } }) })] }));
}
