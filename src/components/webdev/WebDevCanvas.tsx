
import React from 'react';

interface WebDevCanvasProps {
  onNodeSelect: (node: any) => void;
}

const WebDevCanvas: React.FC<WebDevCanvasProps> = ({ onNodeSelect }) => {
  return (
    <div className="h-full bg-gray-100 p-4">
      <div className="h-full bg-white rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-lg">WebDev Canvas</p>
          <p className="text-sm">Drag modules here to build your application</p>
        </div>
      </div>
    </div>
  );
};

export default WebDevCanvas;
