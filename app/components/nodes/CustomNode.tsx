import { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';

export type CustomNodeData = {
  label: string;
  description?: string;
  type?: 'default' | 'input' | 'output' | 'process' | 'decision' | 'data';
  status?: 'active' | 'inactive' | 'warning' | 'error' | 'success';
};

const CustomNode = memo(({ data, selected }: NodeProps<Node<CustomNodeData>>) => {
  const nodeType = data.type || 'default';
  const status = data.status || 'inactive';

  // Define colors based on node type and status
  const getNodeStyles = () => {
    const baseStyles = 'px-4 py-3 rounded-lg border-2 shadow-lg transition-all duration-200 min-w-[180px]';

    let borderColor = 'border-gray-600';
    let bgColor = 'bg-gray-800';
    let textColor = 'text-gray-100';

    // Status-based styling
    if (status === 'active') {
      borderColor = 'border-blue-500';
      bgColor = 'bg-blue-900/30';
    } else if (status === 'warning') {
      borderColor = 'border-yellow-500';
      bgColor = 'bg-yellow-900/30';
    } else if (status === 'error') {
      borderColor = 'border-red-500';
      bgColor = 'bg-red-900/30';
    } else if (status === 'success') {
      borderColor = 'border-green-500';
      bgColor = 'bg-green-900/30';
    }

    // Type-based styling
    if (nodeType === 'input') {
      borderColor = 'border-purple-500';
      bgColor = 'bg-purple-900/30';
    } else if (nodeType === 'output') {
      borderColor = 'border-cyan-500';
      bgColor = 'bg-cyan-900/30';
    } else if (nodeType === 'process') {
      borderColor = 'border-emerald-500';
      bgColor = 'bg-emerald-900/30';
    } else if (nodeType === 'decision') {
      borderColor = 'border-amber-500';
      bgColor = 'bg-amber-900/30';
    } else if (nodeType === 'data') {
      borderColor = 'border-pink-500';
      bgColor = 'bg-pink-900/30';
    }

    const selectedStyles = selected ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-900 scale-105' : '';

    return `${baseStyles} ${borderColor} ${bgColor} ${textColor} ${selectedStyles}`;
  };

  const getStatusIndicator = () => {
    if (status === 'active') return '🟢';
    if (status === 'warning') return '🟡';
    if (status === 'error') return '🔴';
    if (status === 'success') return '✅';
    return '⚪';
  };

  return (
    <div className={getNodeStyles()}>
      {/* Input Handle */}
      {nodeType !== 'input' && (
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 !bg-gray-400 border-2 border-gray-700 hover:!bg-blue-400 transition-colors"
        />
      )}

      {/* Node Content */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-xs">{getStatusIndicator()}</span>
          <div className="font-semibold text-sm">{data.label}</div>
        </div>
        {data.description && (
          <div className="text-xs text-gray-400 mt-1">{data.description}</div>
        )}
        <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">
          {nodeType}
        </div>
      </div>

      {/* Output Handle */}
      {nodeType !== 'output' && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 !bg-gray-400 border-2 border-gray-700 hover:!bg-blue-400 transition-colors"
        />
      )}
    </div>
  );
});

CustomNode.displayName = 'CustomNode';

export default CustomNode;
