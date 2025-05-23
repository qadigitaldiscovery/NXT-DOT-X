
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Feature } from '@/hooks/useModules';
import { Menu } from 'lucide-react';

const MenuNode: React.FC<NodeProps<{ label: string; feature?: Feature }>> = ({ data }) => {
  return (
    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 shadow-md">
      <div className="flex items-center">
        <Menu className="w-5 h-5 text-green-600 mr-2" />
        <div className="font-medium">{data.label || 'Menu'}</div>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {data.feature?.path || 'Menu Item'}
      </div>
      
      {/* Handles for connections */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="w-2 h-2 bg-green-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="w-2 h-2 bg-green-500"
      />
    </div>
  );
};

export default MenuNode;
