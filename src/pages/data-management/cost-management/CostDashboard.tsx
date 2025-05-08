
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Users, FileUp, FileText, Calculator, BarChart3, History, Search, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSupplierUploads } from '@/hooks/use-supplier-uploads';
import { SupplierUploadsTable } from '@/components/uploads/SupplierUploadsTable';

export default function CostDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: uploads = [], isLoading } = useSupplierUploads();
  
  const handleUploadClick = () => {
    navigate('/data-management/uploads/new');
  };

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supplier Costing</h1>
          <p className="text-muted-foreground mt-1">
            Upload and manage supplier cost data with advanced tools
          </p>
        </div>
        <Button onClick={handleUploadClick} size="lg" className="md:w-auto w-full">
          <Upload className="mr-2 h-4 w-4" />
          Upload Cost File
        </Button>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supplier Management</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Suppliers</div>
            <p className="text-xs text-muted-foreground mt-1">
              Manage supplier information and contacts
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">File Uploads</CardTitle>
            <FileUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Supplier Files</div>
            <p className="text-xs text-muted-foreground mt-1">
              Upload and manage supplier cost files
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Landed Costs</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Templates</div>
            <p className="text-xs text-muted-foreground mt-1">
              Configure landed cost calculation templates
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Analysis</CardTitle>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Insights</div>
            <p className="text-xs text-muted-foreground mt-1">
              View cost trends and supplier metrics
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tab navigation */}
      <Tabs defaultValue="file-uploads" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-4 h-auto p-1">
          <TabsTrigger value="supplier-management" className="py-2">Supplier Management</TabsTrigger>
          <TabsTrigger value="file-uploads" className="py-2">File Uploads</TabsTrigger>
          <TabsTrigger value="landed-costs" className="py-2">Landed Costs</TabsTrigger>
          <TabsTrigger value="cost-analysis" className="py-2">Cost Analysis</TabsTrigger>
          <TabsTrigger value="cost-history" className="py-2">Cost History</TabsTrigger>
        </TabsList>

        <TabsContent value="supplier-management">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Management</CardTitle>
              <CardDescription>
                Manage supplier information, contacts, and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search suppliers..."
                  className="pl-8"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                This tab will display supplier management functionality.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="file-uploads" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recent File Uploads</CardTitle>
              <CardDescription>
                View and manage your recently uploaded supplier cost files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SupplierUploadsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="landed-costs">
          <Card>
            <CardHeader>
              <CardTitle>Landed Costs</CardTitle>
              <CardDescription>
                Configure landed cost calculation templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This tab will display landed cost configuration functionality.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cost-analysis">
          <Card>
            <CardHeader>
              <CardTitle>Cost Analysis</CardTitle>
              <CardDescription>
                View cost trends and insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This tab will display cost analysis tools and visualizations.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cost-history">
          <Card>
            <CardHeader>
              <CardTitle>Cost History</CardTitle>
              <CardDescription>
                View historical cost changes over time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This tab will display cost history and changes.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
