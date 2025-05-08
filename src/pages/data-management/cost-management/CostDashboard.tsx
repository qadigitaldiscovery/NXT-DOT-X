
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Users, FileUp, FileText, Calculator, BarChart, History, Search, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CostDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleUploadClick = () => {
    navigate('/data-management/uploads/new');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Supplier Costing</h1>
          <p className="text-muted-foreground">
            Upload and manage supplier cost data with advanced tools
          </p>
        </div>
        <Button onClick={handleUploadClick}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Cost File
        </Button>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supplier Management</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Suppliers</div>
            <p className="text-xs text-muted-foreground">
              Manage supplier information and contacts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">File Uploads</CardTitle>
            <FileUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Supplier Files</div>
            <p className="text-xs text-muted-foreground">
              Upload and manage supplier cost files
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Landed Costs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Templates</div>
            <p className="text-xs text-muted-foreground">
              Configure landed cost calculation templates
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Analysis</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Insights</div>
            <p className="text-xs text-muted-foreground">
              View cost trends and supplier metrics
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tab navigation */}
      <Tabs defaultValue="file-uploads" className="space-y-4">
        <TabsList>
          <TabsTrigger value="supplier-management">Supplier Management</TabsTrigger>
          <TabsTrigger value="file-uploads">File Uploads</TabsTrigger>
          <TabsTrigger value="landed-costs">Landed Costs</TabsTrigger>
          <TabsTrigger value="cost-analysis">Cost Analysis</TabsTrigger>
          <TabsTrigger value="cost-history">Cost History</TabsTrigger>
        </TabsList>

        <TabsContent value="supplier-management">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Management</CardTitle>
              <CardDescription>
                Manage supplier information, contacts, and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This tab will display supplier management functionality.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="file-uploads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>File Uploads</CardTitle>
              <CardDescription>
                Manage supplier cost file uploads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search all fields..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Filename</TableHead>
                        <TableHead>Upload Date</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Records</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No data available.
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing 1 of 0 pages
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">per page</span>
                      <select className="h-8 rounded-md border border-input bg-background px-2">
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                        <option>100</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon" disabled>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" disabled>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
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
            <CardContent>
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
            <CardContent>
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
            <CardContent>
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
