import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Mail, Phone, MapPin, Link } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DocumentsTable } from '@/components/uploads/DocumentsTable';

export default function VendorDetailPage() {
  const { vendorId } = useParams<{ vendorId: string }>();
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
  const getStatusBadge = (status: string) => {
    if (status === 'active' || status === 'approved') {
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          {status === 'active' ? 'Active' : 'Approved'}
        </Badge>
      );
    } else if (status === 'inactive' || status === 'rejected') {
      return <Badge variant="destructive">{status === 'inactive' ? 'Inactive' : 'Rejected'}</Badge>;
    } else {
      return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle tag="h4">{vendor.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Phone className="h-4 w-4 mr-2" />
                Call
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Edit Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Status:</span>
            {getStatusBadge(vendor.status)}
          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium">Contact Information</div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${vendor.contactEmail}`} className="hover:underline">
                {vendor.contactEmail}
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{vendor.contactPhone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{vendor.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Link className="h-4 w-4 text-muted-foreground" />
              <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {vendor.website}
              </a>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium">Description</div>
            <CardDescription>{vendor.description}</CardDescription>
          </div>
          <div className="grid gap-2">
            <div className="text-sm font-medium">Notes</div>
            <CardDescription>{vendor.notes}</CardDescription>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <DocumentsTable supplier={{ id: vendor.id, name: vendor.name }} />
      </div>
    </div>
  );
}
