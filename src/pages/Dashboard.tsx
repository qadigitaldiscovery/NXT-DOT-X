
import React from 'react';
import WidgetGrid from '@/components/widgets/WidgetGrid';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto">
        <WidgetGrid />
      </div>
    </div>
  );
};

export default Dashboard;
