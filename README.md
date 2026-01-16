# Professional React Flow - Brand Integration Platform

A professional, production-ready React Flow implementation featuring brand-themed nodes, drag-and-drop interface, and workflow automation capabilities with dark theme design.

## Features

### Professional Brand Nodes
18 pre-built professional brand nodes including:

**AI & Automation**
- OpenAI (GPT-4, DALL-E, Whisper)
- Claude (Anthropic AI Assistant)
- Zapier (Workflow Automation)

**Communication**
- WhatsApp, Slack, Discord
- Gmail, Twilio

**Productivity & Storage**
- Google Sheets, Google Drive
- Notion, Trello
- Airtable

**Social & Business**
- LinkedIn

**Development**
- GitHub

**E-commerce & Payment**
- Stripe, Shopify

**Marketing**
- Mailchimp

Each node features:
- Brand-accurate colors and styling
- Category badges
- Status indicators (Idle, Running, Success, Error)
- Animated status bars
- Hover effects with delete button
- Professional gradient backgrounds

### Interactive Canvas

**Empty Start State**
- Clean canvas on load
- Helpful onboarding messages
- Keyboard shortcuts guide

**Drag & Drop Interface**
- Collapsible node library sidebar
- Search functionality
- Category filtering (AI, Communication, Productivity, etc.)
- Drag nodes directly to canvas
- Visual feedback during drag

**Node Management**
- Add nodes via drag-and-drop
- Delete nodes (hover delete button or Delete key)
- Multi-select (Shift + Click)
- Connect nodes by dragging handles
- Disconnect edges (select and Delete)
- Auto-layout tool

**Toolbar Features**
- Clear All - Reset entire canvas
- Delete Selected - Remove selected items
- Auto Layout - Organize nodes automatically
- Export - Save workflow as JSON
- Import - Load workflow from JSON

### Performance Optimizations
- Memoized components (React.memo)
- Optimized state management
- Viewport culling
- Smooth 60fps animations
- Dynamic imports (no SSR)

### Dark Theme Design
- Modern professional UI
- Brand-accurate colors
- Gradient effects
- Smooth transitions
- Custom scrollbars

## Technology Stack

- **Next.js 16.1.2** - React framework with App Router
- **React 19.2.3** - Latest React version
- **@xyflow/react** - React Flow library
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling

## Project Structure

```
react-flow/
├── app/
│   ├── components/
│   │   ├── nodes/
│   │   │   ├── BrandNode.tsx        # Professional brand nodes
│   │   │   ├── CustomNode.tsx       # Original custom nodes
│   │   │   └── GroupNode.tsx        # Group container nodes
│   │   └── flow/
│   │       ├── ProfessionalFlow.tsx # Main flow component (NEW)
│   │       ├── OptimizedFlow.tsx    # Original demo flow
│   │       └── NodeLibrary.tsx      # Sidebar node library
│   ├── lib/
│   │   ├── flowUtils.ts             # Layout generators
│   │   └── types.ts                 # TypeScript types
│   ├── globals.css                  # Styles & animations
│   ├── layout.tsx                   # Root layout
│   └── page.tsx                     # Main page
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Usage Guide

### Adding Nodes

1. **From Sidebar**: Drag any node from the left sidebar onto the canvas
2. **Search**: Use the search box to quickly find specific nodes
3. **Filter**: Click category buttons to filter by type (AI, Communication, etc.)
4. **Collapse**: Click the arrow button to minimize the sidebar

### Connecting Nodes

1. Hover over a node to see connection handles (circles on left/right)
2. Click and drag from the **right handle** (source)
3. Drop onto another node's **left handle** (target)
4. Connection appears as animated line

### Deleting Items

**Nodes:**
- Hover over node and click red × button
- Select node and press Delete key
- Use "Delete Selected" toolbar button

**Connections:**
- Click on the edge line to select it
- Press Delete key
- Or use "Delete Selected" button

### Multi-Selection

1. Hold **Shift** key
2. Click multiple nodes/edges
3. Release Shift
4. Use "Delete Selected" or move together

### Organizing Workflow

**Auto Layout**: Click "Auto Layout" button to automatically organize nodes in a grid

**Manual**: Drag nodes to desired positions

### Saving & Loading

**Export:**
1. Build your workflow
2. Click "Export" button
3. JSON file downloads automatically

**Import:**
1. Click "Import" button
2. Select a previously exported JSON file
3. Workflow loads onto canvas

## Keyboard Shortcuts

- `Delete` - Remove selected nodes/edges
- `Shift + Click` - Multi-select
- Mouse wheel - Zoom in/out
- Click + Drag (background) - Pan canvas
- `Ctrl/Cmd + Scroll` - Zoom (alternative)

## Customization

### Adding New Brand Nodes

Edit [app/components/nodes/BrandNode.tsx](app/components/nodes/BrandNode.tsx):

```typescript
// 1. Add to BrandType
export type BrandType = 'whatsapp' | 'your-brand';

// 2. Add configuration
const brandConfigs = {
  'your-brand': {
    color: '#FF6B6B',
    bgGradient: 'from-red-500/20 to-red-600/20',
    icon: '🚀',
    category: 'Your Category'
  },
};
```

Then add to [app/components/flow/NodeLibrary.tsx](app/components/flow/NodeLibrary.tsx):

```typescript
const nodeTemplates = [
  {
    brand: 'your-brand',
    label: 'Your Brand',
    description: 'Description here'
  },
];
```

### Styling

Edit [app/globals.css](app/globals.css) for global styles or modify component className props for specific styling.

## Features Checklist

- ✅ Empty canvas on start
- ✅ Drag & drop node addition
- ✅ Search and filter nodes
- ✅ Connect/disconnect nodes
- ✅ Delete nodes and edges
- ✅ Multi-selection
- ✅ Export/Import workflows
- ✅ Auto-layout
- ✅ Professional brand styling
- ✅ Status indicators
- ✅ Dark theme
- ✅ Keyboard shortcuts
- ✅ Responsive design
- ✅ Performance optimized

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Performance Notes

- Handles 100+ nodes smoothly
- Optimized re-rendering
- Hardware-accelerated animations
- Efficient state management

## License

This project is created for demonstration purposes.

## Resources

- [React Flow Documentation](https://reactflow.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
