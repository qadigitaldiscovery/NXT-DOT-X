
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import StatusGauge from '@/components/rag-dashboard/StatusGauge';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface SystemHealthSectionProps {
  healthScore: number;
  healthLoading: boolean;
  pieData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  chartTheme: 'light' | 'dark';
}

const SystemHealthSection: React.FC<SystemHealthSectionProps> = ({
  healthScore,
  healthLoading,
  pieData,
  chartTheme
}) => {
  return (
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
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemHealthSection;
