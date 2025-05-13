
import React, { useState } from 'react';
import { useModules } from '@/hooks/useModules';
import { useModuleMetrics, useSystemHealthScore } from '@/hooks/useModuleMetrics';
import SharedDashboardLayout from '@/components/layout/SharedDashboardLayout';
import { NavCategory } from '@/components/layout/sidebar/types';
import { BarChart3, Home, LineChart as LineChartIcon, AlertTriangle, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatusGauge from '@/components/rag-dashboard/StatusGauge';

const RAGAnalytics: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | undefined>(undefined);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');
  
  const { modules, loading: modulesLoading } = useModules();
  const { metrics, loading: metricsLoading } = useModuleMetrics(selectedModule, timeRange);
  const { score: healthScore, trend: healthTrend, loading: healthLoading } = useSystemHealthScore();

  // Define navigation categories for this module
  const navCategories: NavCategory[] = [
    {
      name: "RAG Dashboard",
      items: [
        { label: "Overview", path: "/dashboard/rag", icon: BarChart3 },
        { label: "Analytics", path: "/dashboard/rag/analytics", icon: LineChartIcon },
        { label: "Alerts", path: "/dashboard/rag/alerts", icon: AlertTriangle },
        { label: "Settings", path: "/dashboard/rag/settings", icon: Settings, roles: ["admin"] }
      ]
    }
  ];

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    if (timeRange === 'day') {
      return format(date, 'HH:mm');
    } else {
      return format(date, 'MMM dd');
    }
  };

  const getHealthScoreColor = (score: number): string => {
    if (score >= 90) return '#10b981'; // green
    if (score >= 70) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  const getHealthScoreStatus = (score: number): string => {
    if (score >= 90) return 'green';
    if (score >= 70) return 'orange';
    return 'red';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') {
      return <span className="text-green-500">↑</span>;
    } else if (trend === 'down') {
      return <span className="text-red-500">↓</span>;
    }
    return <span className="text-gray-500">→</span>;
  };

  return (
    <SharedDashboardLayout
      moduleTitle="RAG Analytics"
      navCategories={navCategories}
      sidebarClassName="bg-gradient-to-b from-indigo-950 via-blue-950 to-slate-950"
      removeBottomToggle={true}
      showTopLeftToggle={true}
    >
      <div className="container mx-auto py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between mb-6 items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold">System Analytics</h1>
            <p className="text-muted-foreground">Monitor performance metrics and system health</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
            <Select
              value={selectedModule || 'all'}
              onValueChange={(value) => setSelectedModule(value === 'all' ? undefined : value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select module" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Modules</SelectLabel>
                  <SelectItem value="all">All Modules</SelectItem>
                  {modules.map((module) => (
                    <SelectItem key={module.id} value={module.id}>{module.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Select 
              value={timeRange} 
              onValueChange={(value) => setTimeRange(value as 'day' | 'week' | 'month')}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Time Range</SelectLabel>
                  <SelectItem value="day">Last 24 Hours</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* System Health Score */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">System Health Score</CardTitle>
              <CardDescription>Overall system health assessment</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-6">
              {healthLoading ? (
                <div className="text-center">Loading...</div>
              ) : (
                <div className="flex flex-col items-center">
                  <StatusGauge 
                    status={getHealthScoreStatus(healthScore)} 
                    size="lg"
                    showLabel={true} 
                  />
                  <div className="mt-4 text-center">
                    <div className="text-3xl font-bold">
                      {healthScore}% {getTrendIcon(healthTrend)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {healthTrend === 'up' ? 'Improving' : healthTrend === 'down' ? 'Declining' : 'Stable'}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Status Distribution</CardTitle>
              <CardDescription>Current status of all modules</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              {modulesLoading ? (
                <div className="text-center">Loading...</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={[
                      { 
                        name: 'Status',
                        Operational: modules.filter(m => m.status === 'green').length,
                        Degraded: modules.filter(m => m.status === 'orange').length,
                        Outage: modules.filter(m => m.status === 'red').length
                      }
                    ]} 
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" hide />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Operational" fill="#10b981" stackId="stack" name="Operational" />
                    <Bar dataKey="Degraded" fill="#f59e0b" stackId="stack" name="Degraded" />
                    <Bar dataKey="Outage" fill="#ef4444" stackId="stack" name="Outage" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Metrics Charts */}
        <Tabs defaultValue="line">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="line">Line Charts</TabsTrigger>
              <TabsTrigger value="area">Area Charts</TabsTrigger>
              <TabsTrigger value="bar">Bar Charts</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="line" className="space-y-6">
            {metricsLoading ? (
              <div className="text-center py-12">Loading metrics data...</div>
            ) : metrics.map(metric => (
              <Card key={metric.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">{metric.name}</CardTitle>
                  <CardDescription>Measured in {metric.unit}</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={metric.data.map(d => ({ ...d, formattedTime: formatTimestamp(d.timestamp) }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="formattedTime" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#6366f1" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                        name={`${metric.name} (${metric.unit})`}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="area" className="space-y-6">
            {metricsLoading ? (
              <div className="text-center py-12">Loading metrics data...</div>
            ) : metrics.map(metric => (
              <Card key={metric.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">{metric.name}</CardTitle>
                  <CardDescription>Measured in {metric.unit}</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={metric.data.map(d => ({ ...d, formattedTime: formatTimestamp(d.timestamp) }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="formattedTime" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#6366f1" 
                        fill="#6366f1" 
                        fillOpacity={0.2} 
                        name={`${metric.name} (${metric.unit})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="bar" className="space-y-6">
            {metricsLoading ? (
              <div className="text-center py-12">Loading metrics data...</div>
            ) : metrics.map(metric => (
              <Card key={metric.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">{metric.name}</CardTitle>
                  <CardDescription>Measured in {metric.unit}</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={metric.data.map(d => ({ ...d, formattedTime: formatTimestamp(d.timestamp) }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="formattedTime" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        fill="#6366f1" 
                        name={`${metric.name} (${metric.unit})`}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </SharedDashboardLayout>
  );
};

export default RAGAnalytics;
