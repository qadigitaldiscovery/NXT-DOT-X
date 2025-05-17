import React, { useState, useEffect } from 'react';
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, FileUp, BarChart2, Users, FileText, RefreshCw } from 'lucide-react';
import { Partner, vendorToPartner, supplierToPartner } from '@/types/partner';

export default function SupplierVendors() {
  const navigate = useNavigate();
  const { data: vendors = [], isLoading: vendorsLoading, refetch: refetchVendors } = useVendors();
  const { data: suppliers = [], isLoading: suppliersLoading, refetch: refetchSuppliers } = useSuppliers();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [partners, setPartners] = useState<Partner[]>([]);

  // Process vendors and suppliers into unified partners
  useEffect(() => {
    const vendorPartners = vendors.map(vendor => vendorToPartner(vendor));
    const supplierPartners = suppliers.map(supplier => supplierToPartner(supplier));
    setPartners([...vendorPartners, ...supplierPartners]);
  }, [vendors, suppliers]);

  // Mock data for credit scores
  const creditScores = {
    A: 'Very Low Risk',
    B: 'Low Risk',
    C: 'Moderate Risk',
    D: 'High Risk',
    F: 'Very High Risk'
  };

  // Filter function for partners
  const filterPartners = (items: Partner[], type: string, search: string) => {
    return items.filter(item => {
      // Filter by type
      if (type === 'vendor' && item.type !== 'vendor') return false;
      if (type === 'supplier' && item.type !== 'supplier') return false;
      if (type.startsWith('credit-') && item.credit_rating !== type.split('-')[1].toUpperCase()) return false;
      
      // Filter by search term
      if (search && !item.name?.toLowerCase().includes(search.toLowerCase())) return false;
      
      return true;
    });
  };

  // Filtered partners based on current filter settings
  const filteredPartners = filterPartners(
    partners, 
    filterType, 
    searchTerm
  );

  // Handle refresh of partners data
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([refetchVendors(), refetchSuppliers()]);
    } catch (error) {
      console.error("Error refreshing partners data", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Supplier Vendors</h1>
          <p className="text-gray-500">
            Unified management system for suppliers and vendors
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/data-management/supplier-vendors/new')} variant="default">
            Add New Partner
          </Button>
          <Button onClick={handleRefresh} variant="outline" disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => navigate('/data-management')} variant="outline">
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        <Card className="w-full md:w-1/4">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-800">Total Partners</p>
                <p className="text-2xl font-bold">{partners.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-md">
                <p className="text-sm text-green-800">Active</p>
                <p className="text-2xl font-bold">{partners.filter(p => p.status !== 'inactive').length}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-md">
                <p className="text-sm text-yellow-800">Vendors</p>
                <p className="text-2xl font-bold">{partners.filter(p => p.type === 'vendor').length}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-md">
                <p className="text-sm text-purple-800">Suppliers</p>
                <p className="text-2xl font-bold">{partners.filter(p => p.type === 'supplier').length}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileUp className="mr-2 h-4 w-4" />
                  Import Partners
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  View Reports
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Contacts
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full md:w-3/4">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle>Partners Directory</CardTitle>
              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    placeholder="Search partners..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Partners</SelectItem>
                    <SelectItem value="vendor">Vendors Only</SelectItem>
                    <SelectItem value="supplier">Suppliers Only</SelectItem>
                    <SelectItem value="credit-a">Credit Score A</SelectItem>
                    <SelectItem value="credit-b">Credit Score B</SelectItem>
                    <SelectItem value="credit-c">Credit Score C+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="unified">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="unified">Unified View</TabsTrigger>
                <TabsTrigger value="vendors">Vendors</TabsTrigger>
                <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
              </TabsList>

              <TabsContent value="unified" className="mt-6">
                {(vendorsLoading || suppliersLoading) ? (
                  <div className="p-12 text-center">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
                    <p>Loading partners data...</p>
                  </div>
                ) : filteredPartners.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-gray-500">No partners found matching your filters.</p>
                    <Button onClick={() => {setFilterType('all'); setSearchTerm('');}} variant="link" className="mt-2">
                      Clear filters
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Credit Rating</TableHead>
                        <TableHead>Credit Score</TableHead>
                        <TableHead>Annual Spend</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPartners.slice(0, 20).map((partner, index) => (
                        <TableRow 
                          key={`${partner.type}-${index}`} 
                          className="cursor-pointer hover:bg-gray-50" 
                          onClick={() => navigate(
                            partner.type === 'vendor' 
                              ? `/vendors/${partner.id || index}` 
                              : `/data-management/suppliers/${partner.id}`
                          )}
                        >
                          <TableCell className="font-medium">{partner.name}</TableCell>
                          <TableCell>
                            <span className={`${
                              partner.type === 'vendor' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                            } px-2 py-1 rounded-full text-xs`}>
                              {partner.type === 'vendor' ? 'Vendor' : 'Supplier'}
                            </span>
                          </TableCell>
                          <TableCell>{partner.credit_rating}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className={`h-3 w-3 rounded-full mr-2 ${
                                partner.credit_rating === 'A' ? 'bg-green-500' : 
                                partner.credit_rating === 'B' ? 'bg-yellow-500' : 
                                partner.credit_rating === 'C' ? 'bg-orange-500' : 'bg-red-500'
                              }`}></div>
                              {creditScores[partner.credit_rating || 'B']}
                            </div>
                          </TableCell>
                          <TableCell>${typeof partner.annual_spend === 'string' ? partner.annual_spend : partner.annual_spend?.toFixed(0)}</TableCell>
                          <TableCell>
                            <span className={`${
                              partner.status === 'inactive' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                            } px-2 py-1 rounded-full text-xs`}>
                              {partner.status || 'Active'}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>

              <TabsContent value="vendors" className="mt-6">
                <div className="max-h-[500px] overflow-y-auto">
                  <VendorsList />
                </div>
              </TabsContent>

              <TabsContent value="suppliers" className="mt-6">
                <div className="max-h-[500px] overflow-y-auto">
                  <SuppliersTable />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Credit Risk Overview</CardTitle>
          <CardDescription>Review credit ratings across all partners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries(creditScores).map(([rating, description]) => {
              const count = partners.filter(p => p.credit_rating === rating).length;
              return (
                <Card key={rating} className={`border-l-4 ${
                  rating === 'A' ? 'border-l-green-500' :
                  rating === 'B' ? 'border-l-yellow-500' :
                  rating === 'C' ? 'border-l-orange-500' :
                  rating === 'D' ? 'border-l-red-500' : 'border-l-red-700'
                }`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Rating</p>
                        <p className="text-3xl font-bold">{rating}</p>
                        <p className="text-sm mt-1">{description}</p>
                      </div>
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                        rating === 'A' ? 'bg-green-100 text-green-800' :
                        rating === 'B' ? 'bg-yellow-100 text-yellow-800' :
                        rating === 'C' ? 'bg-orange-100 text-orange-800' :
                        rating === 'D' ? 'bg-red-100 text-red-800' : 'bg-red-200 text-red-900'
                      }`}>
                        <span className="text-lg font-bold">{count || 0}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 