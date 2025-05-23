
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Layers } from 'lucide-react';
import { Module } from '@/hooks/useModules';

interface ModuleNodeProps {
  data: {
    label: string;
    module?: Module;
  };
  isConnectable: boolean;
}

const ModuleNode: React.FC<ModuleNodeProps> = ({ data, isConnectable }) => {
  return (
    <div className="min-w-[180px] bg-white border-2 border-blue-500 rounded-md p-3 shadow-md">
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-500"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-500"
      />
      <div className="flex items-center">
        <Layers className="mr-2 h-5 w-5 text-blue-500" />
        <div className="font-medium text-sm">{data.label}</div>
      </div>
      {data.module?.description && (
        <div className="text-xs text-gray-500 mt-1 truncate">
          {data.module.description}
        </div>
      )}
    </div>
  );
};

export default ModuleNode;
