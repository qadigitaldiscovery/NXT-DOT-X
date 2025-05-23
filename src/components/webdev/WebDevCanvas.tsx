
import React, { useEffect, useState, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  NodeTypes,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Connection,
} from '@xyflow/react';
import { useWebDev } from '@/context/WebDevContext';
import ModuleNode from './nodes/ModuleNode';
import MenuNode from './nodes/MenuNode';
import PageNode from './nodes/PageNode';
import InspectorPanel from './InspectorPanel';
import '@xyflow/react/dist/style.css';

// Define custom node types
const nodeTypes: NodeTypes = {
  module: ModuleNode as any,
  menu: MenuNode as any,
  page: PageNode as any,
};

// The inner component that uses ReactFlow hooks
const InnerFlow = () => {
  const { 
    nodes, 
    edges, 
    addEdge: addContextEdge, 
    removeNode, 
    removeEdge, 
    selectNode, 
    selectEdge 
  } = useWebDev();
  
  const [reactFlowNodes, setReactFlowNodes] = useNodesState([]);
  const [reactFlowEdges, setReactFlowEdges] = useEdgesState([]);
  const [selectedElements, setSelectedElements] = useState<any[]>([]);

  // Convert context nodes/edges to ReactFlow format
  useEffect(() => {
    const formattedNodes = nodes.map((node) => ({
      id: node.id,
      type: node.type,
      data: node.data,
      position: node.position,
    }));
    setReactFlowNodes(formattedNodes);
    
    const formattedEdges = edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type || 'default',
      label: edge.label,
      data: edge.data,
    }));
    setReactFlowEdges(formattedEdges);
  }, [nodes, edges, setReactFlowNodes, setReactFlowEdges]);

  // Handle new connections
  const onConnect = useCallback(
    (connection: Connection) => {
      // Create a new edge in the context
      if (connection.source && connection.target) {
        addContextEdge({
          source: connection.source,
          target: connection.target,
          type: 'default',
        });
      }
    },
    [addContextEdge]
  );

  // Handle node deletion
  const onNodesDelete = useCallback(
    (deleted: Node[]) => {
      deleted.forEach((node) => removeNode(node.id));
    },
    [removeNode]
  );

  // Handle edge deletion
  const onEdgesDelete = useCallback(
    (deleted: Edge[]) => {
      deleted.forEach((edge) => removeEdge(edge.id));
    },
    [removeEdge]
  );

  // Handle selection changes
  const onSelectionChange = useCallback(
    ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => {
      setSelectedElements([...nodes, ...edges]);
      
      if (nodes.length === 1) {
        selectNode(nodes[0] as any);
      } else if (nodes.length === 0 && edges.length === 1) {
        selectEdge(edges[0] as any);
      } else {
        selectNode(null);
        selectEdge(null);
      }
    },
    [selectNode, selectEdge]
  );

  return (
    <ReactFlow
      nodes={reactFlowNodes}
      edges={reactFlowEdges}
      onNodesDelete={onNodesDelete}
      onEdgesDelete={onEdgesDelete}
      onConnect={onConnect}
      onSelectionChange={onSelectionChange}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
};

// The outer component that provides ReactFlow context
const WebDevCanvas: React.FC = () => {
  return (
    <div className="flex h-[700px]">
      <div className="flex-1">
        <ReactFlowProvider>
          <InnerFlow />
        </ReactFlowProvider>
      </div>
      <InspectorPanel />
    </div>
  );
};

export default WebDevCanvas;
