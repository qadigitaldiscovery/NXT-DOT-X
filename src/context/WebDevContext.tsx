
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Module } from '@/hooks/useModules';

export interface Feature {
  name: string;
  path: string;
  description?: string;
}

interface WebDevNode {
  id: string;
  type: 'module' | 'menu' | 'page';
  position: { x: number; y: number };
  data: {
    label: string;
    path?: string;
    module?: any;
    feature?: Feature;
  };
}

interface WebDevEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
  label?: string;
  data?: any;
}

interface WebDevContextType {
  nodes: WebDevNode[];
  edges: WebDevEdge[];
  selectedNode: WebDevNode | null;
  selectedEdge: WebDevEdge | null;
  addNode: (node: Omit<WebDevNode, 'id'>) => void;
  addEdge: (edge: Omit<WebDevEdge, 'id'>) => void;
  removeNode: (nodeId: string) => void;
  removeEdge: (edgeId: string) => void;
  selectNode: (node: WebDevNode | null) => void;
  selectEdge: (edge: WebDevEdge | null) => void;
  updateNode?: (nodeId: string, data: Partial<WebDevNode>) => void;
  updateEdge?: (edgeId: string, data: Partial<WebDevEdge>) => void;
  generateRoutes?: () => string;
}

const WebDevContext = createContext<WebDevContextType | undefined>(undefined);

export const WebDevProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nodes, setNodes] = useState<WebDevNode[]>([]);
  const [edges, setEdges] = useState<WebDevEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<WebDevNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<WebDevEdge | null>(null);

  const addNode = useCallback((node: Omit<WebDevNode, 'id'>) => {
    const newNode: WebDevNode = {
      ...node,
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setNodes(prev => [...prev, newNode]);
  }, []);

  const addEdge = useCallback((edge: Omit<WebDevEdge, 'id'>) => {
    const newEdge: WebDevEdge = {
      ...edge,
      id: `edge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setEdges(prev => [...prev, newEdge]);
  }, []);

  const removeNode = useCallback((nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setEdges(prev => prev.filter(edge => edge.source !== nodeId && edge.target !== nodeId));
  }, []);

  const removeEdge = useCallback((edgeId: string) => {
    setEdges(prev => prev.filter(edge => edge.id !== edgeId));
  }, []);

  const selectNode = useCallback((node: WebDevNode | null) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  const selectEdge = useCallback((edge: WebDevEdge | null) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);
  
  const updateNode = useCallback((nodeId: string, data: Partial<WebDevNode>) => {
    setNodes(prev => 
      prev.map(node => 
        node.id === nodeId 
          ? { ...node, ...data } 
          : node
      )
    );
  }, []);
  
  const updateEdge = useCallback((edgeId: string, data: Partial<WebDevEdge>) => {
    setEdges(prev => 
      prev.map(edge => 
        edge.id === edgeId 
          ? { ...edge, ...data } 
          : edge
      )
    );
  }, []);
  
  const generateRoutes = useCallback(() => {
    const routes = nodes.filter(node => node.type === 'page')
      .map(node => `Route path="${node.data.path}" element={<Page />}`).join('\n');
    return routes;
  }, [nodes]);

  const value: WebDevContextType = {
    nodes,
    edges,
    selectedNode,
    selectedEdge,
    addNode,
    addEdge,
    removeNode,
    removeEdge,
    selectNode,
    selectEdge,
    updateNode,
    updateEdge,
    generateRoutes
  };

  return (
    <WebDevContext.Provider value={value}>
      {children}
    </WebDevContext.Provider>
  );
};

export const useWebDev = () => {
  const context = useContext(WebDevContext);
  if (context === undefined) {
    throw new Error('useWebDev must be used within a WebDevProvider');
  }
  return context;
};
