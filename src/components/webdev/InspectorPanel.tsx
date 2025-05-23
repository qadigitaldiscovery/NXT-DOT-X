
import React from 'react';
import { useWebDev } from '@/context/WebDevContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const InspectorPanel: React.FC = () => {
  const { selectedNode, selectedEdge, updateNode, updateEdge } = useWebDev();

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedNode && updateNode) {
      updateNode(selectedNode.id, {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          label: e.target.value,
        },
      });
    }
  };

  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedNode && updateNode) {
      updateNode(selectedNode.id, {
        ...selectedNode,
        data: {
          ...selectedNode.data,
          path: e.target.value,
        },
      });
    }
  };

  const handleEdgeLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedEdge && updateEdge) {
      updateEdge(selectedEdge.id, {
        ...selectedEdge,
        label: e.target.value,
      });
    }
  };

  return (
    <div className="w-64 h-full border-l border-gray-200 p-4 overflow-y-auto">
      <h3 className="font-semibold mb-4">Inspector</h3>
      
      {selectedNode && (
        <div className="space-y-4">
          <h4 className="font-medium">Node Properties</h4>
          
          <div className="space-y-2">
            <Label htmlFor="node-label">Label</Label>
            <Input
              id="node-label"
              value={selectedNode.data.label || ''}
              onChange={handleLabelChange}
            />
          </div>
          
          {(selectedNode.type === 'page' || selectedNode.type === 'menu') && (
            <div className="space-y-2">
              <Label htmlFor="node-path">Path</Label>
              <Input
                id="node-path"
                value={selectedNode.data.path || ''}
                onChange={handlePathChange}
                placeholder="/example/path"
              />
            </div>
          )}
          
          <div className="pt-2">
            <Button variant="destructive" size="sm" className="w-full">
              Delete Node
            </Button>
          </div>
        </div>
      )}
      
      {selectedEdge && (
        <div className="space-y-4">
          <h4 className="font-medium">Edge Properties</h4>
          
          <div className="space-y-2">
            <Label htmlFor="edge-label">Label</Label>
            <Input
              id="edge-label"
              value={selectedEdge.label || ''}
              onChange={handleEdgeLabelChange}
            />
          </div>
          
          <div className="pt-2">
            <Button variant="destructive" size="sm" className="w-full">
              Delete Edge
            </Button>
          </div>
        </div>
      )}
      
      {!selectedNode && !selectedEdge && (
        <p className="text-gray-500 text-sm">
          Select a node or edge to edit its properties
        </p>
      )}
    </div>
  );
};

export default InspectorPanel;
