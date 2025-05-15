
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Server, Shield, FileJson } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DotXDataServices = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Services</h1>
        <p className="text-muted-foreground">Manage DOT-X data operations and services</p>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Data Sources</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Configure and manage data sources for DOT-X platform.</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <div className="font-medium">3 Active Sources</div>
                    <div className="text-muted-foreground">2 Pending</div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Data Pipelines</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Manage data processing and transformation workflows.</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <div className="font-medium">5 Active Pipelines</div>
                    <div className="text-muted-foreground">1 Error</div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">Data Security</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Configure data access controls and security policies.</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <div className="font-medium">Security Level: High</div>
                    <div className="text-muted-foreground">Last scan: Today</div>
                  </div>
                  <Button variant="outline" size="sm">Review</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Data service operations and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Pipeline Execution Completed</p>
                      <p className="text-sm text-muted-foreground">ETL-001 completed successfully</p>
                    </div>
                    <div className="text-sm text-muted-foreground">10 minutes ago</div>
                  </div>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">New Data Source Connected</p>
                      <p className="text-sm text-muted-foreground">CRM database connected</p>
                    </div>
                    <div className="text-sm text-muted-foreground">1 hour ago</div>
                  </div>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Security Alert</p>
                      <p className="text-sm text-muted-foreground">Unusual access pattern detected</p>
                    </div>
                    <div className="text-sm text-muted-foreground">3 hours ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="connections" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Connections</CardTitle>
              <CardDescription>Manage connections to external data sources</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Data connections feature will be available in the next release.
              </p>
              <Button>Request Early Access</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pipelines" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Pipelines</CardTitle>
              <CardDescription>Configure and monitor data processing workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Data pipelines feature will be available in the next release.
              </p>
              <Button>Request Early Access</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
              <CardDescription>Manage data access controls and policies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Enhanced data security features will be available in the next release.
              </p>
              <Button>Request Early Access</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DotXDataServices;
