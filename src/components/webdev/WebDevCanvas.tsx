
import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Node,
  Edge,
  Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useModules } from '@/hooks/useModules';
import ModuleNode from './nodes/ModuleNode';
import MenuNode from './nodes/MenuNode';
import PageNode from './nodes/PageNode';

const nodeTypes = {
  module: ModuleNode,
  menu: MenuNode,
  page: PageNode,
};

interface CanvasNode extends Node {
  type: 'module' | 'menu' | 'page';
  data: {
    label: string;
    path?: string;
    module?: any;
    feature?: any;
  };
}

interface CanvasEdge extends Edge {
  data: any;
}

const WebDevCanvas: React.FC = () => {
  const { modules } = useModules();
  const [nodes, setNodes, onNodesChange] = useNodesState<CanvasNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<CanvasEdge>([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const generateNodes = useCallback(() => {
    if (!modules || modules.length === 0) return;

    const newNodes: CanvasNode[] = modules.map((module, index) => ({
      id: `module-${module.id}`,
      type: 'module' as const,
      data: {
        label: module.name,
        path: module.path,
        module: module,
      },
      position: { x: 100 + (index % 3) * 300, y: 100 + Math.floor(index / 3) * 200 },
    }));

    setNodes(newNodes);

    const newEdges: CanvasEdge[] = modules.flatMap((module, moduleIndex) => {
      if (!module.features) return [];
      
      return module.features.map((feature, featureIndex) => ({
        id: `edge-${module.id}-${feature.name}`,
        source: `module-${module.id}`,
        target: `menu-${module.id}-${featureIndex}`,
        type: 'default',
        label: feature.name,
        data: feature,
      }));
    });

    setEdges(newEdges);
  }, [modules, setNodes, setEdges]);

  React.useEffect(() => {
    generateNodes();
  }, [generateNodes]);

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default WebDevCanvas;
