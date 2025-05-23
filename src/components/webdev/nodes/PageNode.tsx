
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { File } from 'lucide-react';

const PageNode: React.FC<NodeProps<{ label: string; path?: string }>> = ({ data }) => {
  return (
    <div className="bg-amber-50 border-2 border-amber-500 rounded-lg p-4 shadow-md">
      <div className="flex items-center">
        <File className="w-5 h-5 text-amber-600 mr-2" />
        <div className="font-medium">{data.label || 'Page'}</div>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {data.path || 'Page Component'}
      </div>
      
      {/* Handles for connections */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="w-2 h-2 bg-amber-500"
      />
    </div>
  );
};

export default PageNode;
