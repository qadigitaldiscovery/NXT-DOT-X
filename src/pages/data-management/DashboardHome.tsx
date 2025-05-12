
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, FileUp, BarChart3, LineChart, FileCog, FileArchive, Users, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Data Management Module</h1>
        <p className="text-muted-foreground">Access and manage supplier data, costs, and documents</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Supplier Management</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Manage suppliers, track performance, and optimize procurement processes.</p>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate('/supplier-management')}
            >
              Access <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Customer Management</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Manage customer relationships, track interactions, and analyze customer data.</p>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate('/customer-management')}
            >
              Access <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Supplier Costing</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Monitor and analyze supplier costs and pricing data.</p>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate('/data-management/cost-management')}
            >
              Access <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Cost Analysis</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Deep dive into cost structures and optimization opportunities.</p>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate('/data-management/cost-analysis')}
            >
              Analyze <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Document Repository</CardTitle>
            <FileArchive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Manage supplier contracts, specifications and other documents.</p>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate('/data-management/documents')}
            >
              View Documents <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Competitor Pricing</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Track and analyze competitor pricing strategies.</p>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate('/data-management/pricing/competitor-pricing')}
            >
              View Pricing <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Price Management</CardTitle>
            <FileCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Set and manage product pricing and discounts.</p>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate('/data-management/pricing/price-management')}
            >
              Manage Prices <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">File Uploads</CardTitle>
            <FileUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Upload and process supplier cost files.</p>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate('/data-management/uploads')}
            >
              Upload Files <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
