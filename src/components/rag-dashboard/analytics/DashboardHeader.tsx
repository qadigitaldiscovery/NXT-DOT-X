
import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DashboardHeaderProps {
  selectedModule: string | undefined;
  setSelectedModule: (value: string | undefined) => void;
  timeRange: 'day' | 'week' | 'month';
  setTimeRange: (value: 'day' | 'week' | 'month') => void;
  chartTheme: 'light' | 'dark';
  setChartTheme: (value: 'light' | 'dark') => void;
  modules: any[];
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  selectedModule,
  setSelectedModule,
  timeRange,
  setTimeRange,
  chartTheme,
  setChartTheme,
  modules
}) => {
  return (
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
  );
};

export default DashboardHeader;
