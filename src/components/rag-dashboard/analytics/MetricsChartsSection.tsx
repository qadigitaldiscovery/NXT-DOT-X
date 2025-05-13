
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EnhancedLineChart from '@/components/rag-dashboard/EnhancedLineChart';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface MetricDataPoint {
  timestamp: string;
  value: number;
  module_id: string;
}

interface ModuleMetric {
  id: string;
  name: string;
  unit: string;
  data: MetricDataPoint[];
}

interface MetricsChartsSectionProps {
  metrics: ModuleMetric[];
  metricsLoading: boolean;
  formatTimestamp: (timestamp: string) => string;
  chartTheme: 'light' | 'dark';
}

const MetricsChartsSection: React.FC<MetricsChartsSectionProps> = ({
  metrics,
  metricsLoading,
  formatTimestamp,
  chartTheme
}) => {
  return (
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
  );
};

export default MetricsChartsSection;
