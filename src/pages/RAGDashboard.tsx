
import React from 'react';
import { PlatformLayout } from '@/components/layouts/PlatformLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Bell, Settings } from 'lucide-react';
import { ragDashboardNavigation } from '@/components/rag-dashboard/config/dashboardNavigation';

const RAGDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <PlatformLayout moduleTitle="RAG Dashboard" navCategories={ragDashboardNavigation}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2 text-amber-500" />
              RAG System Dashboard
            </h1>
            <p className="text-muted-foreground">Monitor and manage system health and alerts</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/rag/alerts')} className="flex items-center gap-1">
              <Bell className="h-4 w-4" />
              Alerts
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/rag/settings')} className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            { title: "Critical Issues", count: 3, color: "bg-red-100 text-red-800" },
            { title: "Warnings", count: 7, color: "bg-amber-100 text-amber-800" },
            { title: "Healthy Systems", count: 24, color: "bg-green-100 text-green-800" }
          ].map((stat, i) => (
            <Card key={i} className={`${stat.color} border-0`}>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold">{stat.count}</div>
                <p className="font-medium">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>System Modules Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">This is a placeholder for the RAG dashboard content. In a complete implementation, this would show the status of different system modules.</p>
            
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { name: "Authentication", status: "Online", statusClass: "bg-green-100 text-green-800", updated: "5 mins ago" },
                    { name: "Database", status: "Warning", statusClass: "bg-amber-100 text-amber-800", updated: "2 mins ago" },
                    { name: "API Services", status: "Critical", statusClass: "bg-red-100 text-red-800", updated: "Just now" },
                    { name: "Storage", status: "Online", statusClass: "bg-green-100 text-green-800", updated: "10 mins ago" },
                  ].map((module, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{module.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${module.statusClass}`}>
                          {module.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{module.updated}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Button variant="outline" size="sm">View Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6">
              <Button onClick={() => navigate('/master')}>Back to Master Dashboard</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PlatformLayout>
  );
};

export default RAGDashboard;
