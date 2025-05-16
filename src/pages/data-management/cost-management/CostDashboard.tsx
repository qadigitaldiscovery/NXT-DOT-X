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
import { toast } from 'sonner';

export default function CostDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: uploads = [], isLoading } = useSupplierUploads();
  const [baseCurrency, setBaseCurrency] = useState('ZAR');
  const [activeTab, setActiveTab] = useState('file-uploads');
  
  const handleUploadClick = () => {
    toast.info('Upload page will be available soon');
    // navigate('/data-management/uploads/new');
  };

  const handleAnalysisClick = () => {
    toast.info('Cost analysis tools will be available soon');
    // navigate('/data-management/cost-analysis');
  };

  const handleSupplierManagementClick = () => {
    toast.info('Navigating to supplier management...');
    navigate('/data-management/suppliers');
  };

  const handleLandedCostsClick = () => {
    toast.info('Landed costs configuration will be available soon');
  };

  const handleCostHistoryClick = () => {
    toast.info('Cost history view will be available soon');
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // For tabs, we just show the content and don't navigate away from this page
    // This prevents navigation to potentially non-existent pages
    if (value !== 'file-uploads' && value !== activeTab) {
      toast.info(`Showing ${value.replace('-', ' ')} tab content`);
    }
  };

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supplier Costing</h1>
          <p className="text-muted-foreground mt-1">
            Upload and manage supplier cost data with advanced tools (ZAR)
          </p>
        </div>
        <div className="flex gap-2">
          <div className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-md border border-gray-300">
            Base Currency: ZAR
          </div>
          <Button onClick={handleUploadClick} size="lg" className="md:w-auto w-full">
            <Upload className="mr-2 h-4 w-4" />
            Upload Cost File
          </Button>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card 
          className="hover:shadow-md transition-shadow backdrop-blur-md bg-white/30 border border-white/10 cursor-pointer"
          onClick={handleSupplierManagementClick}
        >
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

        <Card 
          className="hover:shadow-md transition-shadow backdrop-blur-md bg-white/30 border border-white/10 cursor-pointer"
          onClick={handleUploadClick}
        >
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

        <Card 
          className="hover:shadow-md transition-shadow backdrop-blur-md bg-white/30 border border-white/10 cursor-pointer"
          onClick={handleLandedCostsClick}
        >
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

        <Card 
          className="hover:shadow-md transition-shadow backdrop-blur-md bg-white/30 border border-white/10 cursor-pointer"
          onClick={handleAnalysisClick}
        >
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
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-4 h-auto p-1">
          <TabsTrigger value="supplier-management" className="py-2">Supplier Management</TabsTrigger>
          <TabsTrigger value="file-uploads" className="py-2">File Uploads</TabsTrigger>
          <TabsTrigger value="landed-costs" className="py-2">Landed Costs</TabsTrigger>
          <TabsTrigger value="cost-analysis" className="py-2">Cost Analysis</TabsTrigger>
          <TabsTrigger value="cost-history" className="py-2">Cost History</TabsTrigger>
        </TabsList>

        <TabsContent value="supplier-management">
          <Card className="backdrop-blur-md bg-white/30 border border-white/10">
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
              <Button onClick={handleSupplierManagementClick}>
                Go to Supplier Management
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="file-uploads" className="space-y-4">
          <Card className="backdrop-blur-md bg-white/30 border border-white/10">
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
          <Card className="backdrop-blur-md bg-white/30 border border-white/10">
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
              <Button onClick={handleLandedCostsClick}>
                Configure Landed Costs
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cost-analysis">
          <Card className="backdrop-blur-md bg-white/30 border border-white/10">
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
              <Button onClick={handleAnalysisClick}>
                Go to Cost Analysis
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cost-history">
          <Card className="backdrop-blur-md bg-white/30 border border-white/10">
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
              <Button onClick={handleCostHistoryClick}>
                View Cost History
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
