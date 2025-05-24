
import React, { useState } from 'react';
import { PageTreeSidebar } from './PageTreeSidebar';
import { EnhancedWidgetGrid } from './EnhancedWidgetGrid';
import { FullScreenPreview } from './FullScreenPreview';

export const DashboardWithSidebar: React.FC = () => {
  const [selectedWidgetForPreview, setSelectedWidgetForPreview] = useState<{
    id: string;
    component: React.ComponentType | null;
    name: string | null;
  } | null>(null);

  const handleWidgetClick = (widget: { id: string; component: React.ComponentType | null; name: string | null }) => {
    if (widget.component) {
      setSelectedWidgetForPreview(widget);
    }
  };

  const handleClosePreview = () => {
    setSelectedWidgetForPreview(null);
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Page Tree */}
      <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
        <PageTreeSidebar />
      </div>
      
      {/* Main Content - Widget Grid */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Widget Dashboard</h1>
            <p className="text-gray-600 mt-2">Drag pages from the sidebar to add them to widget containers, then click to preview</p>
          </div>
          <EnhancedWidgetGrid onWidgetClick={handleWidgetClick} />
        </div>
      </div>

      {/* Full Screen Preview Modal */}
      {selectedWidgetForPreview && (
        <FullScreenPreview
          widget={selectedWidgetForPreview}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
};
