
import React from 'react';
import EnhancedLineChart from '@/components/rag-dashboard/EnhancedLineChart';
import KpiCard from '@/components/rag-dashboard/KpiCard';
import ModuleStatusFilter from '@/components/rag-dashboard/ModuleStatusFilter';
import AlertsList from '@/components/rag-dashboard/AlertsList';
import StatusTimeline from '@/components/rag-dashboard/StatusTimeline';
import CustomerImpactsList from '@/components/rag-dashboard/CustomerImpactsList';
import ScheduledTaskCard from '@/components/rag-dashboard/ScheduledTaskCard';

export default function RAGDashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">RAG Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KpiCard 
          title="System Health" 
          value="96%" 
          status="Green"
          className=""
        />
        <KpiCard 
          title="Critical Alerts" 
          value="3" 
          status="Amber"
          className=""
        />
        <KpiCard 
          title="Modules Status" 
          value="18/20" 
          status="Green"
          className=""
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">System Performance</h2>
              <ModuleStatusFilter 
                selectedStatus={null}
                onStatusSelect={() => {}}
                searchQuery=""
                onSearchChange={() => {}}
              />
            </div>
            <EnhancedLineChart 
              data={[
                { name: 'Jan', value: 400 },
                { name: 'Feb', value: 300 },
                { name: 'Mar', value: 500 },
                { name: 'Apr', value: 280 },
                { name: 'May', value: 590 },
              ]} 
              dataKey="value" 
              xAxisKey="name"
              height={300}
            />
          </div>
        </div>
        <div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow h-full">
            <h2 className="text-lg font-medium mb-4">Recent Alerts</h2>
            <AlertsList 
              alerts={[]}
              onResolve={() => {}}
              loading={true}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <StatusTimeline
            logs={[]}
            loading={true}
          />
        </div>
        <div>
          <CustomerImpactsList
            impacts={[]}
            loading={true}
          />
        </div>
        <div>
          <ScheduledTaskCard
            title="Health Check"
            description="Run a system-wide health check"
            taskName="health-check"
          />
        </div>
      </div>
    </div>
  );
}
