'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
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
  ReactFlowInstance,
  OnConnect,
  OnNodesDelete,
  OnEdgesDelete,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import BrandNode, { BrandNodeData, brandConfigs } from '../nodes/BrandNode';
import NodeLibrary from './NodeLibrary';

type NodeTemplate = {
  brand: string;
  label: string;
  description: string;
};

const ProfessionalFlow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<BrandNodeData>>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<Node<BrandNodeData>, Edge> | null>(null);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const nodeIdCounter = useRef(0);

  // Memoize node types
  const nodeTypes: NodeTypes = useMemo(
    () => ({
      brand: BrandNode,
    }),
    []
  );

  // Connection handler
  const onConnect: OnConnect = useCallback(
    (params) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'smoothstep',
            animated: true,
            style: { strokeWidth: 2 },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  // Add node from library
  const onAddNode = useCallback(
    (template: NodeTemplate) => {
      if (!reactFlowInstance) return;

      const id = `node-${nodeIdCounter.current++}`;
      const position = reactFlowInstance.screenToFlowPosition({
        x: window.innerWidth / 2 - 100,
        y: window.innerHeight / 2 - 50,
      });

      const newNode: Node<BrandNodeData> = {
        id,
        type: 'brand',
        position,
        data: {
          label: template.label,
          brand: template.brand as any,
          description: template.description,
          status: 'idle',
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [reactFlowInstance, setNodes]
  );

  // Drag and drop handler
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const templateData = event.dataTransfer.getData('application/reactflow');
      if (!templateData) return;

      const template: NodeTemplate = JSON.parse(templateData);
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const id = `node-${nodeIdCounter.current++}`;
      const newNode: Node<BrandNodeData> = {
        id,
        type: 'brand',
        position,
        data: {
          label: template.label,
          brand: template.brand as any,
          description: template.description,
          status: 'idle',
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [reactFlowInstance, setNodes]
  );

  // Delete nodes handler
  const onNodesDelete: OnNodesDelete = useCallback(
    (deleted) => {
      // Remove edges connected to deleted nodes
      const deletedIds = deleted.map(n => n.id);
      setEdges((eds) => eds.filter(e =>
        !deletedIds.includes(e.source) && !deletedIds.includes(e.target)
      ));
    },
    [setEdges]
  );

  // Clear canvas
  const handleClearCanvas = useCallback(() => {
    if (window.confirm('Are you sure you want to clear the entire canvas?')) {
      setNodes([]);
      setEdges([]);
    }
  }, [setNodes, setEdges]);

  // Delete selected
  const handleDeleteSelected = useCallback(() => {
    setNodes((nds) => nds.filter((node) => !node.selected));
    setEdges((eds) => eds.filter((edge) => !edge.selected));
  }, [setNodes, setEdges]);

  // Export/Import handlers
  const handleExport = useCallback(() => {
    const flow = {
      nodes,
      edges,
      viewport: reactFlowInstance?.getViewport(),
    };
    const dataStr = JSON.stringify(flow, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `workflow-${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [nodes, edges, reactFlowInstance]);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const flow = JSON.parse(event.target?.result as string);
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
          if (flow.viewport && reactFlowInstance) {
            reactFlowInstance.setViewport(flow.viewport);
          }
        } catch (error) {
          alert('Error importing workflow. Please check the file format.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, [setNodes, setEdges, reactFlowInstance]);

  // Auto-layout (simple)
  const handleAutoLayout = useCallback(() => {
    setNodes((nds) => {
      return nds.map((node, idx) => ({
        ...node,
        position: {
          x: (idx % 4) * 300 + 100,
          y: Math.floor(idx / 4) * 200 + 100,
        },
      }));
    });
  }, [setNodes]);

  return (
    <div className="w-full h-screen bg-gray-950 relative">
      <NodeLibrary onAddNode={onAddNode} />

      <div ref={reactFlowWrapper} className="w-full h-full">
        <ReactFlow<Node<BrandNodeData>, Edge>
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodesDelete={onNodesDelete}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.1}
          maxZoom={4}
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: false,
            style: { stroke: '#6b7280', strokeWidth: 2 },
          }}
          nodesDraggable={true}
          nodesConnectable={true}
          elementsSelectable={true}
          deleteKeyCode="Delete"
          multiSelectionKeyCode="Shift"
          style={{ background: '#030712' }}
          proOptions={{ hideAttribution: true }}
        >
          {/* Dark Grid Background */}
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#1f2937"
            style={{ backgroundColor: '#030712' }}
          />

          {/* Mini Map */}
          <MiniMap
            nodeColor={(node) => {
              const brand = (node.data as BrandNodeData)?.brand;
              return brand ? brandConfigs[brand]?.color || '#4b5563' : '#4b5563';
            }}
            maskColor="rgba(0, 0, 0, 0.6)"
            style={{
              backgroundColor: '#111827',
              border: '2px solid #374151',
            }}
            pannable
            zoomable
          />

          {/* Controls */}
          <Controls
            style={{
              backgroundColor: '#111827',
              border: '2px solid #374151',
            }}
            showInteractive={false}
          />

          {/* Top Toolbar */}
          <Panel position="top-center" className="flex gap-2">
            <div className="bg-gray-900/95 backdrop-blur-sm border-2 border-gray-700 rounded-lg px-4 py-2 shadow-xl flex items-center gap-3">
              <button
                onClick={handleClearCanvas}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-md transition-all"
              >
                🗑️ Clear All
              </button>

              <button
                onClick={handleDeleteSelected}
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs font-semibold rounded-md transition-all"
              >
                ❌ Delete Selected
              </button>

              <div className="w-px h-6 bg-gray-700" />

              <button
                onClick={handleAutoLayout}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-md transition-all"
              >
                📐 Auto Layout
              </button>

              <div className="w-px h-6 bg-gray-700" />

              <button
                onClick={handleExport}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md transition-all"
              >
                💾 Export
              </button>

              <button
                onClick={handleImport}
                className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-md transition-all"
              >
                📂 Import
              </button>
            </div>
          </Panel>

          {/* Stats Panel */}
          <Panel position="top-right" className="space-y-2">
            <div className="bg-gray-900/95 backdrop-blur-sm border-2 border-gray-700 rounded-lg p-3 shadow-xl">
              <h3 className="text-white font-bold mb-2 text-xs uppercase tracking-wider">
                Canvas Stats
              </h3>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-400">Nodes:</span>
                  <span className="text-white font-semibold">{nodes.length}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-400">Connections:</span>
                  <span className="text-white font-semibold">{edges.length}</span>
                </div>
              </div>
            </div>
          </Panel>

          {/* Empty State */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="text-center px-4">
                <div className="text-6xl mb-4">📦</div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Start Building Your Workflow
                </h2>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  Drag and drop nodes from the left sidebar to create your automation workflow.
                  Connect nodes by dragging from the right handle to the left handle of another node.
                </p>
                <div className="mt-6 space-y-2 text-xs text-gray-500">
                  <p>💡 Tip: Press <kbd className="px-2 py-1 bg-gray-800 rounded">Delete</kbd> to remove selected items</p>
                  <p>💡 Tip: Hold <kbd className="px-2 py-1 bg-gray-800 rounded">Shift</kbd> to select multiple nodes</p>
                </div>
              </div>
            </div>
          )}
        </ReactFlow>
      </div>
    </div>
  );
};

export default ProfessionalFlow;
