
import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Module } from '@/hooks/useModules';
import { LayoutGrid } from 'lucide-react';

const ModuleNode: React.FC<NodeProps<{ label: string; module?: Module }>> = ({ data }) => {
  return (
    <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4 shadow-md">
      <div className="flex items-center">
        <LayoutGrid className="w-5 h-5 text-blue-600 mr-2" />
        <div className="font-medium">{data.label || 'Module'}</div>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {data.module?.description || 'Module Component'}
      </div>
      
      {/* Handles for connections */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="w-2 h-2 bg-blue-500"
      />
    </div>
  );
};

export default ModuleNode;
