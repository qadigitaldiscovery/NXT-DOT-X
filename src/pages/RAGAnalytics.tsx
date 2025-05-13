
import React, { useState, useMemo } from 'react';
import { useModules } from '@/hooks/useModules';
import { useModuleMetrics, useSystemHealthScore } from '@/hooks/useModuleMetrics';
import SharedDashboardLayout from '@/components/layout/SharedDashboardLayout';
import { NavCategory } from '@/components/layout/sidebar/types';
import { BarChart3, LineChart as LineChartIcon, AlertTriangle, Settings, Activity, Cpu, Clock, AlertOctagon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatusGauge from '@/components/rag-dashboard/StatusGauge';
import StatisticCard from '@/components/rag-dashboard/StatisticCard';
import EnhancedLineChart from '@/components/rag-dashboard/EnhancedLineChart';
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
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const RAGAnalytics: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | undefined>(undefined);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week');
  const [chartTheme, setChartTheme] = useState<'light' | 'dark'>('dark');
  
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

  const getModuleStatusCounts = useMemo(() => {
    return {
      operational: modules.filter(m => m.status === 'green').length,
      degraded: modules.filter(m => m.status === 'orange').length,
      outage: modules.filter(m => m.status === 'red').length
    };
  }, [modules]);

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  const pieData = useMemo(() => [
    { name: 'Operational', value: getModuleStatusCounts.operational, color: COLORS[0] },
    { name: 'Degraded', value: getModuleStatusCounts.degraded, color: COLORS[1] },
    { name: 'Outage', value: getModuleStatusCounts.outage, color: COLORS[2] }
  ], [getModuleStatusCounts]);

  // Calculate average response time
  const avgResponseTime = useMemo(() => {
    const responseTimeMetric = metrics.find(metric => metric.name === 'Response Time');
    if (!responseTimeMetric) return null;
    
    const sum = responseTimeMetric.data.reduce((acc, item) => acc + item.value, 0);
    return Math.round(sum / responseTimeMetric.data.length);
  }, [metrics]);

  // Calculate error rate
  const errorRate = useMemo(() => {
    const errorRateMetric = metrics.find(metric => metric.name === 'Error Rate');
    if (!errorRateMetric) return null;
    
    return errorRateMetric.data[errorRateMetric.data.length - 1]?.value || 0;
  }, [metrics]);

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
            
            <Select 
              value={chartTheme} 
              onValueChange={(value) => setChartTheme(value as 'light' | 'dark')}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chart theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Chart Theme</SelectLabel>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatisticCard 
            value={healthScore + "%"}
            label="System Health"
            valueColor={healthScore >= 90 ? 'success' : healthScore >= 70 ? 'warning' : 'danger'}
            trend={healthTrend}
            trendValue={healthTrend === 'up' ? 'Improving' : healthTrend === 'down' ? 'Declining' : 'Stable'}
            icon={<Activity className="h-4 w-4" />}
          />
          
          <StatisticCard
            value={avgResponseTime !== null ? `${avgResponseTime} ms` : 'N/A'}
            label="Average Response Time"
            valueColor={avgResponseTime && avgResponseTime < 100 ? 'success' : avgResponseTime && avgResponseTime < 200 ? 'warning' : 'danger'}
            icon={<Clock className="h-4 w-4" />}
          />
          
          <StatisticCard
            value={modules.length}
            label="Total Modules"
            trendValue={`${getModuleStatusCounts.operational} operational`}
            icon={<Cpu className="h-4 w-4" />}
          />
          
          <StatisticCard
            value={errorRate !== null ? errorRate : 'N/A'}
            label="Current Error Rate"
            valueColor={errorRate === 0 ? 'success' : errorRate < 2 ? 'warning' : 'danger'}
            trendValue="errors/min"
            icon={<AlertOctagon className="h-4 w-4" />}
          />
        </div>
        
        {/* System Health Score and Status Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="md:col-span-1 bg-card/50 backdrop-blur border-border/50">
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
                    status={healthScore >= 90 ? 'green' : healthScore >= 70 ? 'orange' : 'red'} 
                    size="lg"
                    showLabel={true} 
                  />
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Status Distribution</CardTitle>
              <CardDescription>Current status of all modules</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              {modulesLoading ? (
                <div className="text-center">Loading...</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: chartTheme === 'dark' ? 'rgba(0,0,0,0.85)' : '#fff', 
                        border: chartTheme === 'dark' ? '1px solid #333' : '1px solid #ddd',
                        borderRadius: '4px',
                        color: chartTheme === 'dark' ? '#fff' : '#000'
                      }}
                      formatter={(value) => [`${value} module${value !== 1 ? 's' : ''}`]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Metrics Charts */}
        <Tabs defaultValue="line" className="bg-card/30 backdrop-blur rounded-lg p-4 border border-border/30">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-background/50">
              <TabsTrigger value="line">Line</TabsTrigger>
              <TabsTrigger value="area">Area</TabsTrigger>
              <TabsTrigger value="bar">Bar</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="line" className="space-y-6">
            {metricsLoading ? (
              <div className="text-center py-12">Loading metrics data...</div>
            ) : metrics.map(metric => {
              // Calculate threshold values based on metric type
              let threshold: number | undefined = undefined;
              if (metric.name === 'CPU Usage') threshold = 80;
              if (metric.name === 'Memory Usage') threshold = 1400;
              if (metric.name === 'Response Time') threshold = 200;
              if (metric.name === 'Error Rate') threshold = 3;
              
              return (
                <Card key={metric.id} className="overflow-hidden bg-card/50 backdrop-blur border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{metric.name}</CardTitle>
                    <CardDescription>Measured in {metric.unit}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EnhancedLineChart
                      data={metric.data.map(d => ({ ...d, formattedTime: formatTimestamp(d.timestamp) }))}
                      dataKey="value"
                      xAxisKey="formattedTime"
                      name={metric.name}
                      unit={metric.unit}
                      color="#6366f1"
                      threshold={threshold}
                    />
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
          
          <TabsContent value="area" className="space-y-6">
            {metricsLoading ? (
              <div className="text-center py-12">Loading metrics data...</div>
            ) : metrics.map(metric => (
              <Card key={metric.id} className="overflow-hidden bg-card/50 backdrop-blur border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{metric.name}</CardTitle>
                  <CardDescription>Measured in {metric.unit}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={metric.data.map(d => ({ ...d, formattedTime: formatTimestamp(d.timestamp) }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartTheme === 'dark' ? '#333' : '#ddd'} opacity={0.1} />
                      <XAxis 
                        dataKey="formattedTime"
                        tick={{ fill: chartTheme === 'dark' ? '#999' : '#333', fontSize: 12 }}
                        axisLine={{ stroke: chartTheme === 'dark' ? '#333' : '#ddd', opacity: 0.2 }}
                      />
                      <YAxis 
                        tick={{ fill: chartTheme === 'dark' ? '#999' : '#333', fontSize: 12 }}
                        axisLine={{ stroke: chartTheme === 'dark' ? '#333' : '#ddd', opacity: 0.2 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: chartTheme === 'dark' ? 'rgba(0,0,0,0.85)' : '#fff', 
                          border: chartTheme === 'dark' ? '1px solid #333' : '1px solid #ddd',
                          borderRadius: '4px',
                          color: chartTheme === 'dark' ? '#fff' : '#000'
                        }}
                        formatter={(value) => [`${value} ${metric.unit}`, metric.name]}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#6366f1" 
                        fill="#6366f1" 
                        fillOpacity={0.2} 
                        name={`${metric.name}`}
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
              <Card key={metric.id} className="overflow-hidden bg-card/50 backdrop-blur border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{metric.name}</CardTitle>
                  <CardDescription>Measured in {metric.unit}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={metric.data.map(d => ({ ...d, formattedTime: formatTimestamp(d.timestamp) }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartTheme === 'dark' ? '#333' : '#ddd'} opacity={0.1} />
                      <XAxis 
                        dataKey="formattedTime"
                        tick={{ fill: chartTheme === 'dark' ? '#999' : '#333', fontSize: 12 }}
                        axisLine={{ stroke: chartTheme === 'dark' ? '#333' : '#ddd', opacity: 0.2 }}
                      />
                      <YAxis 
                        tick={{ fill: chartTheme === 'dark' ? '#999' : '#333', fontSize: 12 }}
                        axisLine={{ stroke: chartTheme === 'dark' ? '#333' : '#ddd', opacity: 0.2 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: chartTheme === 'dark' ? 'rgba(0,0,0,0.85)' : '#fff', 
                          border: chartTheme === 'dark' ? '1px solid #333' : '1px solid #ddd',
                          borderRadius: '4px',
                          color: chartTheme === 'dark' ? '#fff' : '#000'
                        }}
                        formatter={(value) => [`${value} ${metric.unit}`, metric.name]}
                      />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        fill="#6366f1"
                        name={`${metric.name}`}
                        radius={[4, 4, 0, 0]}
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
