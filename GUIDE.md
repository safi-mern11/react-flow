# Quick Start Guide

## Professional React Flow - Brand Integration Platform

### 🚀 Getting Started in 3 Steps

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

3. **Start building!**
   - Drag nodes from the sidebar
   - Connect them together
   - Build your workflow

---

## 📦 Available Brand Nodes (18 Total)

### 🤖 AI & Automation
- **OpenAI** 🤖 - GPT-4, DALL-E, Whisper APIs
- **Claude** 🧠 - Anthropic AI Assistant
- **Zapier** ⚡ - Workflow Automation

### 💬 Communication
- **WhatsApp** 💬 - Send messages and notifications
- **Slack** 💬 - Team communication
- **Discord** 🎮 - Community messaging
- **Gmail** 📧 - Email automation
- **Twilio** 📱 - SMS and voice calls

### 📊 Productivity & Storage
- **Google Sheets** 📊 - Spreadsheet operations
- **Google Drive** 📁 - File storage and sharing
- **Notion** 📝 - Knowledge management
- **Trello** 📌 - Project management

### 💼 Social & Business
- **LinkedIn** 💼 - Professional networking

### 🐙 Development
- **GitHub** 🐙 - Code repository

### 💳 E-commerce & Payment
- **Stripe** 💳 - Payment processing
- **Shopify** 🛒 - E-commerce platform

### 📮 Marketing
- **Mailchimp** 📮 - Email marketing

### 📋 Database
- **Airtable** 📋 - Collaborative database

---

## 🎯 How to Use

### Adding Nodes to Canvas

**Method 1: Drag & Drop (Recommended)**
1. Find your node in the left sidebar
2. Click and hold on the node card
3. Drag onto the canvas
4. Release to drop

**Method 2: Search**
1. Type in the search box at top of sidebar
2. Find your node
3. Drag it to canvas

**Method 3: Filter by Category**
1. Click category buttons (AI, Communication, etc.)
2. Browse filtered list
3. Drag desired node

### Connecting Nodes

1. Hover over any node
2. You'll see small circles (handles) on left and right
3. Click and drag from **right handle** (source)
4. Drag to another node's **left handle** (target)
5. Release to create connection
6. Connection line appears with animation

### Deleting Items

**Delete a Node:**
- **Option 1**: Hover over node → Click red × button
- **Option 2**: Click node → Press `Delete` key
- **Option 3**: Select node → Click "Delete Selected" button

**Delete a Connection:**
- **Option 1**: Click the connection line → Press `Delete` key
- **Option 2**: Select connection → Click "Delete Selected" button

**Delete Everything:**
- Click "Clear All" button (⚠️ confirmation required)

### Selecting Multiple Items

1. Hold `Shift` key
2. Click on nodes/connections you want to select
3. Release `Shift`
4. All selected items have blue highlight
5. Delete together or move as a group

---

## 🛠️ Toolbar Actions

Located at the top center of the canvas:

| Button | Icon | Action |
|--------|------|--------|
| Clear All | 🗑️ | Remove everything from canvas |
| Delete Selected | ❌ | Remove selected nodes/connections |
| Auto Layout | 📐 | Organize nodes in a grid automatically |
| Export | 💾 | Download workflow as JSON file |
| Import | 📂 | Load workflow from JSON file |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Delete` | Remove selected items |
| `Shift + Click` | Multi-select nodes/edges |
| Mouse wheel | Zoom in/out |
| Click + Drag (background) | Pan canvas |
| `Backspace` | Alternative to Delete |

---

## 💡 Pro Tips

### Organizing Your Workflow

1. **Use Auto Layout** when you have many nodes scattered
2. **Group related nodes** by positioning them close together
3. **Use categories** to keep similar operations near each other
4. **Name your exports** meaningfully (e.g., "email-automation-workflow.json")

### Best Practices

1. **Start with inputs** (left side of canvas)
2. **End with outputs** (right side of canvas)
3. **Flow left to right** for better readability
4. **Test connections** by selecting them to verify they're correct
5. **Save frequently** using the Export button

### Common Workflows

**Example 1: Email Automation**
```
Gmail → OpenAI → Slack
```
Read emails → Process with AI → Send to Slack

**Example 2: Social Media Posting**
```
Airtable → OpenAI → LinkedIn
```
Get content → Generate post → Publish

**Example 3: E-commerce Order**
```
Shopify → Stripe → Gmail → Google Sheets
```
New order → Process payment → Send receipt → Log data

---

## 🎨 Node Features

Each node displays:
- **Icon** - Visual brand identifier
- **Label** - Node name
- **Description** - What it does
- **Category Badge** - Type classification
- **Status Indicator** - Current state (⚪ Idle, ⚙️ Running, ✅ Success, ❌ Error)
- **Delete Button** - Appears on hover
- **Connection Handles** - Left (input) and Right (output)

---

## 🔄 Status States

Nodes can have different statuses (future feature for execution):

- ⚪ **Idle** - Not running
- ⚙️ **Running** - Currently executing (animated blue bar)
- ✅ **Success** - Completed successfully (green bar)
- ❌ **Error** - Failed (red bar)

---

## 💾 Export/Import

### Export Workflow
1. Build your workflow
2. Click "Export" button
3. File downloads as `workflow-[timestamp].json`
4. Save it somewhere safe

### Import Workflow
1. Click "Import" button
2. Select your `.json` file
3. Workflow loads instantly
4. All nodes and connections restored

**File Format:**
```json
{
  "nodes": [...],
  "edges": [...],
  "viewport": {...}
}
```

---

## 🎓 Tutorial: Build Your First Workflow

Let's create a simple AI content workflow:

### Step 1: Add Notion Node
1. Search "notion" in sidebar
2. Drag Notion node to canvas (left side)
3. This will be your content source

### Step 2: Add OpenAI Node
1. Search "openai"
2. Drag OpenAI node to middle of canvas
3. This will process the content

### Step 3: Add LinkedIn Node
1. Search "linkedin"
2. Drag LinkedIn node to right side
3. This will publish the content

### Step 4: Connect Them
1. Hover over Notion node
2. Click and drag from right handle
3. Drop on OpenAI's left handle
4. Repeat: OpenAI right → LinkedIn left

### Step 5: Admire Your Work!
You've created your first workflow! 🎉

### Step 6: Save It
Click "Export" to save your workflow for later.

---

## 🆘 Troubleshooting

**Node won't connect?**
- Make sure you're dragging from right handle to left handle
- Some nodes might not be compatible (depends on your setup)

**Sidebar disappeared?**
- Click the arrow button (→) on the left edge to reopen

**Can't delete something?**
- Make sure it's selected (should have blue highlight)
- Try clicking it first, then pressing Delete

**Lost your nodes?**
- Use the minimap (bottom right) to navigate
- Zoom out with mouse wheel to see everything
- Use "Auto Layout" to reorganize

**Imported workflow looks wrong?**
- The JSON file might be corrupted
- Try re-exporting from source
- Check that you're using the latest version

---

## 🌟 Next Steps

1. **Explore all 18 nodes** - Try each one
2. **Build complex workflows** - Connect multiple nodes
3. **Experiment with layouts** - Find what works for you
4. **Save your favorites** - Export workflows you like
5. **Share your creations** - JSON files are portable!

---

## 📚 Additional Resources

- [Full README](./README.md) - Detailed documentation
- [React Flow Docs](https://reactflow.dev/) - Official React Flow documentation
- [Next.js Docs](https://nextjs.org/docs) - Next.js framework documentation

---

**Happy workflow building! 🚀**
