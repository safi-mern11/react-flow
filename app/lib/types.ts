import { Node, Edge } from '@xyflow/react';

// Node data types
export type NodeType = 'default' | 'input' | 'output' | 'process' | 'decision' | 'data';
export type StatusType = 'active' | 'inactive' | 'warning' | 'error' | 'success';

export interface CustomNodeData {
  label: string;
  description?: string;
  type?: NodeType;
  status?: StatusType;
}

export interface GroupNodeData {
  label: string;
  color?: string;
}

// Layout types
export type LayoutType = 'hierarchical' | 'radial' | 'grid' | 'complex';

export interface FlowData {
  nodes: Node[];
  edges: Edge[];
}

// Statistics
export interface FlowStats {
  nodeCount: number;
  edgeCount: number;
  nodesByType: Record<NodeType, number>;
  nodesByStatus: Record<StatusType, number>;
}
