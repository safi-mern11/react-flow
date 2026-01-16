import { useState } from 'react';
import { BrandType, brandConfigs } from '../nodes/BrandNode';

type NodeTemplate = {
  brand: BrandType;
  label: string;
  description: string;
};

const nodeTemplates: NodeTemplate[] = [
  // AI
  { brand: 'openai', label: 'OpenAI', description: 'GPT-4, DALL-E, Whisper APIs' },
  { brand: 'claude', label: 'Claude', description: 'Anthropic AI Assistant' },

  // Communication
  { brand: 'whatsapp', label: 'WhatsApp', description: 'Send messages and notifications' },
  { brand: 'slack', label: 'Slack', description: 'Team communication' },
  { brand: 'discord', label: 'Discord', description: 'Community messaging' },
  { brand: 'gmail', label: 'Gmail', description: 'Email automation' },
  { brand: 'twilio', label: 'Twilio', description: 'SMS and voice calls' },

  // Productivity
  { brand: 'google-sheets', label: 'Google Sheets', description: 'Spreadsheet operations' },
  { brand: 'notion', label: 'Notion', description: 'Knowledge management' },
  { brand: 'trello', label: 'Trello', description: 'Project management' },

  // Storage
  { brand: 'google-drive', label: 'Google Drive', description: 'File storage and sharing' },

  // Social
  { brand: 'linkedin', label: 'LinkedIn', description: 'Professional networking' },

  // Development
  { brand: 'github', label: 'GitHub', description: 'Code repository' },

  // E-commerce & Payment
  { brand: 'stripe', label: 'Stripe', description: 'Payment processing' },
  { brand: 'shopify', label: 'Shopify', description: 'E-commerce platform' },

  // Marketing
  { brand: 'mailchimp', label: 'Mailchimp', description: 'Email marketing' },

  // Automation
  { brand: 'zapier', label: 'Zapier', description: 'Workflow automation' },

  // Database
  { brand: 'airtable', label: 'Airtable', description: 'Collaborative database' },
];

type NodeLibraryProps = {
  onAddNode: (template: NodeTemplate) => void;
};

const NodeLibrary = ({ onAddNode }: NodeLibraryProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Get unique categories
  const categories = ['All', ...new Set(
    Object.values(brandConfigs).map(c => c.category)
  )].sort();

  // Filter nodes
  const filteredNodes = nodeTemplates.filter(node => {
    const matchesSearch = node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         node.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' ||
                           brandConfigs[node.brand].category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const onDragStart = (event: React.DragEvent, template: NodeTemplate) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(template));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`
        fixed top-0 left-0 h-screen bg-gray-900/98 backdrop-blur-sm border-r-2 border-gray-700
        shadow-2xl transition-all duration-300 z-50
        ${isOpen ? 'w-80' : 'w-14'}
      `}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded-full text-white text-xs font-bold shadow-lg transition-all"
      >
        {isOpen ? '←' : '→'}
      </button>

      {isOpen ? (
        <div className="flex flex-col h-full p-4">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white mb-1">Node Library</h2>
            <p className="text-xs text-gray-400">Drag nodes to canvas</p>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />

          {/* Category Filter */}
          <div className="flex flex-wrap gap-1 mb-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-2 py-1 rounded-md text-xs font-medium transition-all
                  ${selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Node List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {filteredNodes.map((template) => {
              const config = brandConfigs[template.brand];
              return (
                <div
                  key={template.brand}
                  draggable
                  onDragStart={(e) => onDragStart(e, template)}
                  className="bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-gray-600 rounded-lg p-3 cursor-move transition-all hover:scale-102 hover:shadow-lg group"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">{config.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white text-sm truncate">
                          {template.label}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                        {template.description}
                      </p>
                      <span
                        className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: config.color + '30',
                          color: config.color,
                        }}
                      >
                        {config.category}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Stats */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="text-xs text-gray-400">
              <div className="flex justify-between mb-1">
                <span>Available Nodes:</span>
                <span className="text-white font-semibold">{filteredNodes.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Categories:</span>
                <span className="text-white font-semibold">{categories.length - 1}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center pt-6 gap-4">
          <div className="text-2xl">📦</div>
          <div className="text-xs text-gray-400 writing-vertical-rl rotate-180">
            Nodes
          </div>
        </div>
      )}
    </div>
  );
};

export default NodeLibrary;
