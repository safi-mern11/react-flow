import { memo, useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';

export type BrandType =
  | 'whatsapp'
  | 'linkedin'
  | 'openai'
  | 'claude'
  | 'google-sheets'
  | 'google-drive'
  | 'gmail'
  | 'slack'
  | 'discord'
  | 'notion'
  | 'github'
  | 'stripe'
  | 'shopify'
  | 'mailchimp'
  | 'twilio'
  | 'zapier'
  | 'airtable'
  | 'trello';

export type BrandNodeData = {
  label: string;
  brand: BrandType;
  description?: string;
  status?: 'idle' | 'running' | 'success' | 'error';
};

const brandConfigs: Record<BrandType, {
  color: string;
  bgGradient: string;
  icon: string;
  category: string;
}> = {
  whatsapp: {
    color: '#25D366',
    bgGradient: 'from-green-500/20 to-green-600/20',
    icon: '💬',
    category: 'Communication'
  },
  linkedin: {
    color: '#0A66C2',
    bgGradient: 'from-blue-500/20 to-blue-700/20',
    icon: '💼',
    category: 'Social'
  },
  openai: {
    color: '#10A37F',
    bgGradient: 'from-emerald-500/20 to-teal-600/20',
    icon: '🤖',
    category: 'AI'
  },
  claude: {
    color: '#CC9B7A',
    bgGradient: 'from-amber-500/20 to-orange-600/20',
    icon: '🧠',
    category: 'AI'
  },
  'google-sheets': {
    color: '#0F9D58',
    bgGradient: 'from-green-600/20 to-emerald-600/20',
    icon: '📊',
    category: 'Productivity'
  },
  'google-drive': {
    color: '#4285F4',
    bgGradient: 'from-blue-500/20 to-sky-600/20',
    icon: '📁',
    category: 'Storage'
  },
  gmail: {
    color: '#EA4335',
    bgGradient: 'from-red-500/20 to-red-600/20',
    icon: '📧',
    category: 'Communication'
  },
  slack: {
    color: '#4A154B',
    bgGradient: 'from-purple-600/20 to-purple-800/20',
    icon: '💬',
    category: 'Communication'
  },
  discord: {
    color: '#5865F2',
    bgGradient: 'from-indigo-500/20 to-indigo-600/20',
    icon: '🎮',
    category: 'Communication'
  },
  notion: {
    color: '#000000',
    bgGradient: 'from-gray-700/20 to-gray-900/20',
    icon: '📝',
    category: 'Productivity'
  },
  github: {
    color: '#181717',
    bgGradient: 'from-gray-700/20 to-gray-800/20',
    icon: '🐙',
    category: 'Development'
  },
  stripe: {
    color: '#635BFF',
    bgGradient: 'from-indigo-500/20 to-purple-600/20',
    icon: '💳',
    category: 'Payment'
  },
  shopify: {
    color: '#96BF48',
    bgGradient: 'from-lime-500/20 to-green-600/20',
    icon: '🛒',
    category: 'E-commerce'
  },
  mailchimp: {
    color: '#FFE01B',
    bgGradient: 'from-yellow-400/20 to-yellow-500/20',
    icon: '📮',
    category: 'Marketing'
  },
  twilio: {
    color: '#F22F46',
    bgGradient: 'from-red-500/20 to-pink-600/20',
    icon: '📱',
    category: 'Communication'
  },
  zapier: {
    color: '#FF4A00',
    bgGradient: 'from-orange-500/20 to-orange-600/20',
    icon: '⚡',
    category: 'Automation'
  },
  airtable: {
    color: '#18BFFF',
    bgGradient: 'from-cyan-500/20 to-blue-500/20',
    icon: '📋',
    category: 'Database'
  },
  trello: {
    color: '#0079BF',
    bgGradient: 'from-blue-500/20 to-blue-600/20',
    icon: '📌',
    category: 'Productivity'
  },
};

const BrandNode = memo(({ data, selected, id }: NodeProps<BrandNodeData>) => {
  const [isHovered, setIsHovered] = useState(false);
  const config = brandConfigs[data.brand];
  const status = data.status || 'idle';

  const getStatusIndicator = () => {
    if (status === 'running') return '⚙️';
    if (status === 'success') return '✅';
    if (status === 'error') return '❌';
    return '⚪';
  };

  const getStatusColor = () => {
    if (status === 'running') return 'border-blue-500 shadow-blue-500/50';
    if (status === 'success') return 'border-green-500 shadow-green-500/50';
    if (status === 'error') return 'border-red-500 shadow-red-500/50';
    return 'border-gray-600';
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {/* Delete button - shows on hover */}
      {isHovered && (
        <button
          className="absolute -top-3 -right-3 z-10 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full text-white text-xs font-bold shadow-lg transition-all"
          onClick={(e) => {
            e.stopPropagation();
            // Deletion handled by parent
          }}
        >
          ×
        </button>
      )}

      <div
        className={`
          relative bg-gradient-to-br ${config.bgGradient} bg-gray-800
          border-2 ${getStatusColor()}
          rounded-xl shadow-xl
          px-4 py-3 min-w-[200px]
          transition-all duration-300
          ${selected ? 'ring-4 ring-blue-400/50 scale-105' : ''}
          ${isHovered ? 'shadow-2xl scale-105' : ''}
        `}
        style={{
          borderColor: selected ? config.color : undefined,
        }}
      >
        {/* Input Handle */}
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 !bg-gray-700 border-2 hover:!bg-blue-400 transition-colors"
          style={{ borderColor: config.color }}
        />

        {/* Node Content */}
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className="text-3xl flex-shrink-0 mt-1"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          >
            {config.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-white text-sm truncate">
                {data.label}
              </h3>
              <span className="text-xs">{getStatusIndicator()}</span>
            </div>

            {data.description && (
              <p className="text-xs text-gray-300 mb-2 line-clamp-2">
                {data.description}
              </p>
            )}

            {/* Brand badge */}
            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: config.color + '30',
                  color: config.color,
                  border: `1px solid ${config.color}50`
                }}
              >
                {data.brand.toUpperCase()}
              </span>
              <span className="text-[9px] text-gray-500 uppercase tracking-wider">
                {config.category}
              </span>
            </div>
          </div>
        </div>

        {/* Status bar */}
        {status !== 'idle' && (
          <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl overflow-hidden">
            <div
              className={`h-full ${
                status === 'running' ? 'bg-blue-500 animate-pulse' :
                status === 'success' ? 'bg-green-500' :
                'bg-red-500'
              }`}
            />
          </div>
        )}

        {/* Output Handle */}
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 !bg-gray-700 border-2 hover:!bg-blue-400 transition-colors"
          style={{ borderColor: config.color }}
        />
      </div>
    </div>
  );
});

BrandNode.displayName = 'BrandNode';

export default BrandNode;
export { brandConfigs };
