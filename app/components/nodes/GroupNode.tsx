import { memo } from 'react';
import { NodeProps, Node } from '@xyflow/react';

export type GroupNodeData = {
  label: string;
  color?: string;
};

const GroupNode = memo(({ data, selected }: NodeProps<Node<GroupNodeData>>) => {
  const color = data.color || 'blue';

  const getBorderColor = () => {
    const colors: Record<string, string> = {
      blue: 'border-blue-500/30',
      purple: 'border-purple-500/30',
      green: 'border-green-500/30',
      red: 'border-red-500/30',
      yellow: 'border-yellow-500/30',
      cyan: 'border-cyan-500/30',
    };
    return colors[color] || colors.blue;
  };

  const getBgColor = () => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-500/5',
      purple: 'bg-purple-500/5',
      green: 'bg-green-500/5',
      red: 'bg-red-500/5',
      yellow: 'bg-yellow-500/5',
      cyan: 'bg-cyan-500/5',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div
      className={`
        rounded-xl border-2 ${getBorderColor()} ${getBgColor()}
        backdrop-blur-sm p-6 min-w-[300px] min-h-[200px]
        transition-all duration-200
        ${selected ? 'ring-2 ring-white/20' : ''}
      `}
    >
      <div className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
        {data.label}
      </div>
    </div>
  );
});

GroupNode.displayName = 'GroupNode';

export default GroupNode;
