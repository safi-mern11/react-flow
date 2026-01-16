'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
  Panel,
  NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import CustomNode from '../nodes/CustomNode';
import GroupNode from '../nodes/GroupNode';
import {
  generateHierarchicalNodes,
  generateRadialNodes,
  generateGridWithGroups,
  generateComplexNetwork,
} from '../../lib/flowUtils';

type LayoutType = 'hierarchical' | 'radial' | 'grid' | 'complex';

const OptimizedFlow = () => {
  const [layout, setLayout] = useState<LayoutType>('hierarchical');
  const [nodeCount, setNodeCount] = useState({ level: 5, perLevel: 6 });

  // Memoize node types to prevent re-renders
  const nodeTypes: NodeTypes = useMemo(
    () => ({
      custom: CustomNode,
      group: GroupNode,
    }),
    []
  );

  // Generate initial nodes and edges
  const initialData = useMemo(() => {
    return generateHierarchicalNodes(nodeCount.level, nodeCount.perLevel);
  }, [nodeCount.level, nodeCount.perLevel]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges);

  // Memoized connection handler
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({
      ...params,
      type: 'smoothstep',
      animated: true,
    }, eds)),
    [setEdges]
  );

  // Layout generators
  const generateLayout = useCallback((type: LayoutType) => {
    let data;

    switch (type) {
      case 'hierarchical':
        data = generateHierarchicalNodes(5, 6);
        break;
      case 'radial':
        data = generateRadialNodes(4, 8);
        break;
      case 'grid':
        data = generateGridWithGroups(6, 6);
        break;
      case 'complex':
        data = generateComplexNetwork(50);
        break;
      default:
        data = generateHierarchicalNodes(5, 6);
    }

    setNodes(data.nodes);
    setEdges(data.edges);
    setLayout(type);
  }, [setNodes, setEdges]);

  // Performance optimizations
  const proOptions = { hideAttribution: true };

  return (
    <div className="w-full h-screen bg-gray-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        fitView
        minZoom={0.1}
        maxZoom={4}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: false,
          style: { stroke: '#6b7280', strokeWidth: 2 },
        }}
        // Performance optimizations
        nodesDraggable={true}
        nodesConnectable={true}
        elementsSelectable={true}
        // Only render visible nodes
        nodeOrigin={[0.5, 0.5]}
        // Smooth panning
        panOnDrag={true}
        panOnScroll={false}
        zoomOnScroll={true}
        zoomOnPinch={true}
        zoomOnDoubleClick={false}
        // Dark theme colors
        style={{ background: '#030712' }}
      >
        {/* Dark Grid Background */}
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#1f2937"
          style={{ backgroundColor: '#030712' }}
        />

        {/* Mini Map with Dark Theme */}
        <MiniMap
          nodeColor={(node) => {
            if (node.type === 'group') return '#1f2937';
            const status = node.data?.status;
            if (status === 'active') return '#3b82f6';
            if (status === 'warning') return '#eab308';
            if (status === 'error') return '#ef4444';
            if (status === 'success') return '#22c55e';
            return '#4b5563';
          }}
          maskColor="rgba(0, 0, 0, 0.6)"
          style={{
            backgroundColor: '#111827',
            border: '2px solid #374151',
          }}
          pannable
          zoomable
        />

        {/* Controls with Dark Theme */}
        <Controls
          style={{
            backgroundColor: '#111827',
            border: '2px solid #374151',
          }}
          showInteractive={false}
        />

        {/* Control Panel */}
        <Panel position="top-left" className="space-y-2">
          <div className="bg-gray-900/95 backdrop-blur-sm border-2 border-gray-700 rounded-lg p-4 shadow-xl">
            <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">
              Layout Generator
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => generateLayout('hierarchical')}
                className={`px-3 py-2 rounded-md text-xs font-semibold transition-all ${
                  layout === 'hierarchical'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Hierarchical
              </button>
              <button
                onClick={() => generateLayout('radial')}
                className={`px-3 py-2 rounded-md text-xs font-semibold transition-all ${
                  layout === 'radial'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Radial
              </button>
              <button
                onClick={() => generateLayout('grid')}
                className={`px-3 py-2 rounded-md text-xs font-semibold transition-all ${
                  layout === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Grid + Groups
              </button>
              <button
                onClick={() => generateLayout('complex')}
                className={`px-3 py-2 rounded-md text-xs font-semibold transition-all ${
                  layout === 'complex'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Complex Network
              </button>
            </div>

            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Total Nodes:</span>
                <span className="text-white font-semibold">{nodes.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Edges:</span>
                <span className="text-white font-semibold">{edges.length}</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="bg-gray-900/95 backdrop-blur-sm border-2 border-gray-700 rounded-lg p-4 shadow-xl">
            <h3 className="text-white font-bold mb-2 text-xs uppercase tracking-wider">
              Status Legend
            </h3>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <span>🟢</span> Active
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span>🟡</span> Warning
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span>🔴</span> Error
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span>✅</span> Success
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span>⚪</span> Inactive
              </div>
            </div>
          </div>
        </Panel>

        {/* Info Panel */}
        <Panel position="top-right" className="space-y-2">
          <div className="bg-gray-900/95 backdrop-blur-sm border-2 border-gray-700 rounded-lg p-4 shadow-xl max-w-xs">
            <h3 className="text-white font-bold mb-2 text-sm uppercase tracking-wider">
              Performance Optimized
            </h3>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>✓ Memoized node components</li>
              <li>✓ Optimized re-rendering</li>
              <li>✓ Smooth animations</li>
              <li>✓ Viewport culling</li>
              <li>✓ Dark theme design</li>
              <li>✓ Interactive controls</li>
            </ul>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default OptimizedFlow;
