import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { VendorsList } from '@/components/vendorDetail/VendorsList';
import { SuppliersTable } from '@/components/suppliers/SuppliersTable';
import { useVendors } from '@/hooks/useVendorDetail';
import { useSuppliers } from '@/hooks/use-suppliers';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function VendorSupplierComparison() {
  const navigate = useNavigate();
  const { data: vendors = [], isLoading: vendorsLoading } = useVendors();
  const { data: suppliers = [], isLoading: suppliersLoading } = useSuppliers();

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vendor & Supplier Comparison</h1>
          <p className="text-gray-500">
            Compare vendor and supplier functionality to decide on integration strategy
          </p>
        </div>
        <Button onClick={() => navigate('/data-management')}>
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feature Comparison</CardTitle>
          <CardDescription>Compare features between vendors and suppliers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Feature</TableHead>
                <TableHead className="w-1/3">Vendors</TableHead>
                <TableHead className="w-1/3">Suppliers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Credit Scoring</TableCell>
                <TableCell className="text-green-600">✓ (Advanced)</TableCell>
                <TableCell className="text-red-600">✗ (Not available)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Cost Data</TableCell>
                <TableCell className="text-yellow-600">✓ (Basic)</TableCell>
                <TableCell className="text-green-600">✓ (Advanced)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Performance Tracking</TableCell>
                <TableCell className="text-green-600">✓ (Available)</TableCell>
                <TableCell className="text-red-600">✗ (Not available)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Report Generation</TableCell>
                <TableCell className="text-green-600">✓ (Available)</TableCell>
                <TableCell className="text-red-600">✗ (Not available)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Contact Management</TableCell>
                <TableCell className="text-green-600">✓ (Available)</TableCell>
                <TableCell className="text-yellow-600">✓ (Basic)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">File Upload</TableCell>
                <TableCell className="text-red-600">✗ (Not available)</TableCell>
                <TableCell className="text-green-600">✓ (Advanced)</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Recommendation:</h3>
            <p>
              Consider merging vendor and supplier functionality into a unified "Partners" module with the 
              following integration strategy:
            </p>
            <ul className="list-disc list-inside mt-2 ml-2 space-y-1 text-blue-700">
              <li>Keep supplier cost data management and file upload workflows</li>
              <li>Integrate vendor credit scoring and performance tracking</li>
              <li>Combine contact management into a single interface</li>
              <li>Migrate to a single data model that supports both feature sets</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="side-by-side">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="side-by-side">Side-by-Side View</TabsTrigger>
          <TabsTrigger value="vendors">Vendors View</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers View</TabsTrigger>
        </TabsList>

        <TabsContent value="side-by-side" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vendors</CardTitle>
                <CardDescription>Healthcare suppliers with credit scoring</CardDescription>
              </CardHeader>
              <CardContent>
                {vendorsLoading ? (
                  <div className="py-8 text-center">Loading vendors...</div>
                ) : (
                  <div className="max-h-[400px] overflow-y-auto">
                    <VendorsList />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suppliers</CardTitle>
                <CardDescription>Cost data suppliers</CardDescription>
              </CardHeader>
              <CardContent>
                {suppliersLoading ? (
                  <div className="py-8 text-center">Loading suppliers...</div>
                ) : (
                  <div className="max-h-[400px] overflow-y-auto">
                    <SuppliersTable />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vendors" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendors</CardTitle>
              <CardDescription>Healthcare suppliers with credit scoring</CardDescription>
            </CardHeader>
            <CardContent>
              <VendorsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Suppliers</CardTitle>
              <CardDescription>Cost data suppliers</CardDescription>
            </CardHeader>
            <CardContent>
              <SuppliersTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 