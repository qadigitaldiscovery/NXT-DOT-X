
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { File } from 'lucide-react';

interface PageNodeProps {
  data: {
    label: string;
    path?: string;
  };
  isConnectable: boolean;
}

const PageNode: React.FC<PageNodeProps> = ({ data, isConnectable }) => {
  return (
    <div className="min-w-[180px] bg-white border-2 border-purple-500 rounded-md p-3 shadow-md">
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        isConnectable={isConnectable}
        className="w-3 h-3 bg-purple-500"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        isConnectable={isConnectable}
        className="w-3 h-3 bg-purple-500"
      />
      <div className="flex items-center">
        <File className="mr-2 h-5 w-5 text-purple-500" />
        <div className="font-medium text-sm">{data.label}</div>
      </div>
      {data.path && (
        <div className="text-xs text-gray-500 mt-1 truncate">
          Path: {data.path}
        </div>
      )}
    </div>
  );
};

export default PageNode;
