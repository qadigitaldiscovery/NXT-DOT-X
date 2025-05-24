
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InspectorPanelProps {
  selectedNode: any;
}

const InspectorPanel: React.FC<InspectorPanelProps> = ({ selectedNode }) => {
  if (!selectedNode) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Select a node to view properties</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Node Properties</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="space-y-2">
            <div>
              <label className="text-xs font-medium">ID</label>
              <p className="text-xs text-gray-600">{selectedNode.id}</p>
            </div>
            <div>
              <label className="text-xs font-medium">Type</label>
              <p className="text-xs text-gray-600">{selectedNode.type}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InspectorPanel;
