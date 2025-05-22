
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Module, Feature } from '@/hooks/useModules';

interface Node {
  id: string;
  type: 'module' | 'menu' | 'page';
  data: {
    label: string;
    path?: string;
    module?: Module;
    feature?: Feature;
  };
  position: {
    x: number;
    y: number;
  };
}

interface Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
  label?: string;
  data?: any;
}

interface WebDevContextType {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  selectedEdge: Edge | null;
  addNode: (node: Omit<Node, 'id'> & { id?: string }) => void;
  addEdge: (edge: Omit<Edge, 'id'> & { id?: string }) => void;
  updateNode: (id: string, data: Partial<Node>) => void;
  updateEdge: (id: string, data: Partial<Edge>) => void;
  removeNode: (id: string) => void;
  removeEdge: (id: string) => void;
  selectNode: (node: Node | null) => void;
  selectEdge: (edge: Edge | null) => void;
  generateRoutes: () => any[];
}

const WebDevContext = createContext<WebDevContextType | undefined>(undefined);

export function WebDevProvider({ children }: { children: ReactNode }) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);

  const addNode = (node: Omit<Node, 'id'> & { id?: string }) => {
    const id = node.id || `node_${Date.now()}`;
    setNodes((prev) => [...prev, { ...node, id }]);
  };

  const updateNode = (id: string, data: Partial<Node>) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, ...data } : node
      )
    );
  };

  const removeNode = (id: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== id));
    // Also remove any connected edges
    setEdges((prev) =>
      prev.filter((edge) => edge.source !== id && edge.target !== id)
    );
  };

  const addEdge = (edge: Omit<Edge, 'id'> & { id?: string }) => {
    const id = edge.id || `edge_${edge.source}_${edge.target}_${Date.now()}`;
    setEdges((prev) => [...prev, { ...edge, id }]);
  };

  const updateEdge = (id: string, data: Partial<Edge>) => {
    setEdges((prev) =>
      prev.map((edge) =>
        edge.id === id ? { ...edge, ...data } : edge
      )
    );
  };

  const removeEdge = (id: string) => {
    setEdges((prev) => prev.filter((edge) => edge.id !== id));
  };

  const selectNode = (node: Node | null) => {
    setSelectedNode(node);
  };

  const selectEdge = (edge: Edge | null) => {
    setSelectedEdge(edge);
  };

  // Generate route configuration from the visual nodes and edges
  const generateRoutes = () => {
    const routes: any[] = [];

    // Generate routes based on connections between modules, menus, and pages
    nodes.forEach(node => {
      if (node.type === 'page' && node.data.path) {
        // Find connections to this page
        const incomingEdges = edges.filter(edge => edge.target === node.id);
        
        // For each connection, find the source node
        incomingEdges.forEach(edge => {
          const sourceNode = nodes.find(n => n.id === edge.source);
          
          if (sourceNode) {
            const route = {
              path: node.data.path,
              component: node.data.label,
              parent: sourceNode.type === 'module' ? sourceNode.data.label : undefined,
              menu: sourceNode.type === 'menu' ? sourceNode.data.label : undefined
            };
            
            routes.push(route);
          }
        });
      }
    });

    return routes;
  };

  const value = {
    nodes,
    edges,
    selectedNode,
    selectedEdge,
    addNode,
    addEdge,
    updateNode,
    updateEdge,
    removeNode,
    removeEdge,
    selectNode,
    selectEdge,
    generateRoutes
  };

  return (
    <WebDevContext.Provider value={value}>
      {children}
    </WebDevContext.Provider>
  );
}

export const useWebDev = () => {
  const context = useContext(WebDevContext);
  
  if (context === undefined) {
    throw new Error('useWebDev must be used within a WebDevProvider');
  }
  
  return context;
};
