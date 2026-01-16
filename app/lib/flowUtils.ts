import { Node, Edge } from '@xyflow/react';
import { CustomNodeData } from '../components/nodes/CustomNode';
import { GroupNodeData } from '../components/nodes/GroupNode';

type NodeType = 'default' | 'input' | 'output' | 'process' | 'decision' | 'data';
type StatusType = 'active' | 'inactive' | 'warning' | 'error' | 'success';

// Generate a hierarchical network of nodes
export function generateHierarchicalNodes(levels: number, nodesPerLevel: number): {
  nodes: Node<CustomNodeData>[];
  edges: Edge[];
} {
  const nodes: Node<CustomNodeData>[] = [];
  const edges: Edge[] = [];

  const horizontalSpacing = 300;
  const verticalSpacing = 150;
  const nodeTypes: NodeType[] = ['input', 'process', 'decision', 'data', 'output'];
  const statuses: StatusType[] = ['active', 'inactive', 'warning', 'error', 'success'];

  for (let level = 0; level < levels; level++) {
    const levelNodeCount = nodesPerLevel;
    const startX = -(levelNodeCount * horizontalSpacing) / 2;

    for (let i = 0; i < levelNodeCount; i++) {
      const nodeId = `node-${level}-${i}`;
      const nodeType = level === 0 ? 'input' : level === levels - 1 ? 'output' : nodeTypes[Math.floor(Math.random() * 3) + 1];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      nodes.push({
        id: nodeId,
        type: 'custom',
        position: {
          x: startX + i * horizontalSpacing + Math.random() * 50 - 25,
          y: level * verticalSpacing + Math.random() * 30 - 15,
        },
        data: {
          label: `Node ${level}-${i}`,
          description: `Level ${level}`,
          type: nodeType,
          status: status,
        },
      });

      // Connect to previous level nodes
      if (level > 0) {
        const connectionsCount = Math.min(2, Math.max(1, Math.floor(Math.random() * 3)));
        for (let c = 0; c < connectionsCount; c++) {
          const sourceIndex = Math.floor(Math.random() * nodesPerLevel);
          const sourceId = `node-${level - 1}-${sourceIndex}`;

          edges.push({
            id: `edge-${sourceId}-${nodeId}-${c}`,
            source: sourceId,
            target: nodeId,
            type: 'smoothstep',
            animated: Math.random() > 0.7,
            style: {
              stroke: status === 'active' ? '#3b82f6' :
                      status === 'warning' ? '#eab308' :
                      status === 'error' ? '#ef4444' :
                      status === 'success' ? '#22c55e' : '#6b7280',
              strokeWidth: 2,
            },
          });
        }
      }
    }
  }

  return { nodes, edges };
}

// Generate a circular/radial layout
export function generateRadialNodes(rings: number, nodesPerRing: number): {
  nodes: Node<CustomNodeData>[];
  edges: Edge[];
} {
  const nodes: Node<CustomNodeData>[] = [];
  const edges: Edge[] = [];

  const nodeTypes: NodeType[] = ['input', 'process', 'decision', 'data', 'output'];
  const statuses: StatusType[] = ['active', 'inactive', 'warning', 'error', 'success'];

  // Center node
  nodes.push({
    id: 'center',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
      label: 'Central Hub',
      description: 'Main controller',
      type: 'input',
      status: 'active',
    },
  });

  for (let ring = 1; ring <= rings; ring++) {
    const radius = ring * 200;
    const nodesInRing = nodesPerRing * ring;

    for (let i = 0; i < nodesInRing; i++) {
      const angle = (i / nodesInRing) * 2 * Math.PI;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const nodeId = `ring-${ring}-node-${i}`;

      const nodeType = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      nodes.push({
        id: nodeId,
        type: 'custom',
        position: { x, y },
        data: {
          label: `R${ring}-N${i}`,
          description: `Ring ${ring}`,
          type: nodeType,
          status: status,
        },
      });

      // Connect to center or previous ring
      if (ring === 1) {
        edges.push({
          id: `edge-center-${nodeId}`,
          source: 'center',
          target: nodeId,
          type: 'smoothstep',
          animated: Math.random() > 0.6,
        });
      } else {
        const prevRingIndex = Math.floor((i / nodesInRing) * (nodesPerRing * (ring - 1)));
        const sourceId = `ring-${ring - 1}-node-${prevRingIndex}`;

        edges.push({
          id: `edge-${sourceId}-${nodeId}`,
          source: sourceId,
          target: nodeId,
          type: 'smoothstep',
          animated: Math.random() > 0.8,
        });
      }

      // Connect to adjacent nodes in same ring
      if (i > 0 && Math.random() > 0.5) {
        const adjacentId = `ring-${ring}-node-${i - 1}`;
        edges.push({
          id: `edge-${adjacentId}-${nodeId}-adj`,
          source: adjacentId,
          target: nodeId,
          type: 'smoothstep',
        });
      }
    }
  }

  return { nodes, edges };
}

// Generate a grid layout with groups
export function generateGridWithGroups(rows: number, cols: number): {
  nodes: Node<CustomNodeData | GroupNodeData>[];
  edges: Edge[];
} {
  const nodes: Node<CustomNodeData | GroupNodeData>[] = [];
  const edges: Edge[] = [];

  const horizontalSpacing = 250;
  const verticalSpacing = 150;
  const nodeTypes: NodeType[] = ['process', 'decision', 'data'];
  const statuses: StatusType[] = ['active', 'inactive', 'warning', 'error', 'success'];
  const groupColors = ['blue', 'purple', 'green', 'cyan'];

  // Create groups
  const groupsPerRow = 2;
  const groupsPerCol = 2;
  for (let gr = 0; gr < groupsPerRow; gr++) {
    for (let gc = 0; gc < groupsPerCol; gc++) {
      nodes.push({
        id: `group-${gr}-${gc}`,
        type: 'group',
        position: {
          x: gc * cols * horizontalSpacing / groupsPerCol,
          y: gr * rows * verticalSpacing / groupsPerRow,
        },
        data: {
          label: `Group ${gr * groupsPerCol + gc + 1}`,
          color: groupColors[(gr * groupsPerCol + gc) % groupColors.length],
        },
        style: {
          width: (cols * horizontalSpacing / groupsPerCol) - 50,
          height: (rows * verticalSpacing / groupsPerRow) - 50,
        },
      });
    }
  }

  // Create grid nodes
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const nodeId = `grid-${row}-${col}`;
      const nodeType = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      const groupCol = Math.floor(col / (cols / groupsPerCol));
      const groupRow = Math.floor(row / (rows / groupsPerRow));
      const parentGroup = `group-${groupRow}-${groupCol}`;

      nodes.push({
        id: nodeId,
        type: 'custom',
        position: {
          x: col * horizontalSpacing + 30,
          y: row * verticalSpacing + 50,
        },
        data: {
          label: `N${row}${col}`,
          description: `Grid ${row},${col}`,
          type: nodeType,
          status: status,
        },
        parentId: parentGroup,
        extent: 'parent' as const,
      });

      // Connect to right neighbor
      if (col < cols - 1) {
        edges.push({
          id: `edge-${nodeId}-right`,
          source: nodeId,
          target: `grid-${row}-${col + 1}`,
          type: 'smoothstep',
        });
      }

      // Connect to bottom neighbor
      if (row < rows - 1) {
        edges.push({
          id: `edge-${nodeId}-bottom`,
          source: nodeId,
          target: `grid-${row + 1}-${col}`,
          type: 'smoothstep',
        });
      }

      // Random diagonal connections
      if (row < rows - 1 && col < cols - 1 && Math.random() > 0.7) {
        edges.push({
          id: `edge-${nodeId}-diagonal`,
          source: nodeId,
          target: `grid-${row + 1}-${col + 1}`,
          type: 'smoothstep',
          animated: true,
        });
      }
    }
  }

  return { nodes, edges };
}

// Generate a complex network
export function generateComplexNetwork(nodeCount: number): {
  nodes: Node<CustomNodeData>[];
  edges: Edge[];
} {
  const nodes: Node<CustomNodeData>[] = [];
  const edges: Edge[] = [];

  const nodeTypes: NodeType[] = ['input', 'process', 'decision', 'data', 'output'];
  const statuses: StatusType[] = ['active', 'inactive', 'warning', 'error', 'success'];

  // Create nodes in a force-directed layout simulation
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * 2 * Math.PI;
    const radius = 300 + Math.random() * 400;
    const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 200;
    const y = Math.sin(angle) * radius + (Math.random() - 0.5) * 200;

    const nodeType = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    nodes.push({
      id: `node-${i}`,
      type: 'custom',
      position: { x, y },
      data: {
        label: `Node ${i}`,
        description: `Complex node ${i}`,
        type: nodeType,
        status: status,
      },
    });
  }

  // Create edges with preferential attachment
  for (let i = 0; i < nodeCount; i++) {
    const connectionsCount = Math.min(5, Math.max(1, Math.floor(Math.random() * 4)));

    for (let c = 0; c < connectionsCount; c++) {
      const targetIndex = Math.floor(Math.random() * nodeCount);

      if (targetIndex !== i) {
        const edgeId = `edge-${i}-${targetIndex}`;

        // Avoid duplicate edges
        if (!edges.find(e => e.id === edgeId)) {
          edges.push({
            id: edgeId,
            source: `node-${i}`,
            target: `node-${targetIndex}`,
            type: 'smoothstep',
            animated: Math.random() > 0.8,
          });
        }
      }
    }
  }

  return { nodes, edges };
}
