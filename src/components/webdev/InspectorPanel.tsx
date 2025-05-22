
import React from 'react';
import { useWebDev } from '@/context/WebDevContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const InspectorPanel: React.FC = () => {
  const { selectedNode, selectedEdge, updateNode, updateEdge } = useWebDev();

  const handleNodeLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedNode) return;
    updateNode(selectedNode.id, {
      data: { ...selectedNode.data, label: e.target.value },
    });
  };

  const handleNodePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedNode) return;
    updateNode(selectedNode.id, {
      data: { ...selectedNode.data, path: e.target.value },
    });
  };

  const handleEdgeLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedEdge) return;
    updateEdge(selectedEdge.id, { label: e.target.value });
  };

  return (
    <Card className="w-80 ml-4">
      <CardHeader>
        <CardTitle>Inspector</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedNode ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="nodeType">Type</Label>
              <Input
                id="nodeType"
                value={selectedNode.type}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="nodeLabel">Label</Label>
              <Input
                id="nodeLabel"
                value={selectedNode.data.label}
                onChange={handleNodeLabelChange}
              />
            </div>
            <div>
              <Label htmlFor="nodePath">Path</Label>
              <Input
                id="nodePath"
                value={selectedNode.data.path || ''}
                onChange={handleNodePathChange}
                placeholder="Route path"
              />
            </div>
          </div>
        ) : selectedEdge ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="edgeType">Connection Type</Label>
              <Input
                id="edgeType"
                value={selectedEdge.type || 'default'}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="edgeLabel">Label</Label>
              <Input
                id="edgeLabel"
                value={selectedEdge.label || ''}
                onChange={handleEdgeLabelChange}
                placeholder="Connection label"
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            Select an item to view and edit its properties
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InspectorPanel;
