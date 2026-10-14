# 🤝 Contributing to Zevylo

Thank you for your interest in contributing to **Zevylo**! We are building the internet's most comprehensive, privacy-first, zero-upload tool suite.

---

## 📜 Guiding Principles

1. 🛡️ **100% Client-Side Privacy**: All processing must occur strictly inside the user's browser (HTML5 Canvas, WebAssembly, Web Audio, Web Crypto, Web Workers). **Never send user files or raw data to external servers.**
2. ⚡ **Zero-Lag Performance**: Tools must be responsive, provide live feedback or progress bars, and handle large files gracefully without freezing the UI.
3. 📱 **Mobile & Dark-Mode First**: Every tool component must be fully responsive and support both Light and Dark modes using Tailwind CSS.
4. 🧩 **Modular Design**: Every tool must be encapsulated within its own folder with a dedicated `*.definition.ts` metadata file and `*.tsx` component.

---

## 🛠️ Step-by-Step Guide: How to Add a New Tool

Adding a new tool takes **less than 10 minutes** by following this 3-step convention:

### Step 1: Create the Definition File
Create `zevylo/src/tools/<category>/<my-tool>.definition.ts`:
```typescript
import { ToolDefinition } from '@/types/tool';

export const myToolDefinition: ToolDefinition = {
  id: 'my-custom-tool',
  slug: 'my-custom-tool',
  name: 'My Custom Tool',
  category: 'text', // Choose: image, video, pdf, developer, text, etc.
  subcategory: 'formatting',
  icon: 'FileText',
  shortDescription: 'Clean and format custom text data instantly.',
  longDescription:
    'Detailed description explaining what the tool does, input formats, and practical use cases.',
  features: [
    '100% Client-side in-browser processing',
    'Supports one-click copy and download',
    'Preserves formatting and encoding'
  ],
  keywords: ['my tool', 'formatter', 'text helper'],
  faq: [
    {
      question: 'Is my text sent to a server?',
      answer: 'No. Everything runs locally in your browser memory.'
    }
  ]
};
```

### Step 2: Create the Tool Component
Create `zevylo/src/tools/<category>/<my-tool>.tsx`:
```tsx
'use client';

import React, { useState } from 'react';

export default function MyCustomTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleProcess = () => {
    setOutput(input.toUpperCase());
  };

  return (
    <div className="space-y-4 p-4 bg-card rounded-xl border border-border">
      <textarea
        className="w-full h-32 p-3 bg-muted rounded-lg border border-border"
        placeholder="Enter your input here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={handleProcess}
        className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg"
      >
        Process Data
      </button>
      {output && (
        <div className="p-4 bg-muted/50 rounded-lg border border-border font-mono text-sm">
          {output}
        </div>
      )}
    </div>
  );
}
```

### Step 3: Register the Tool
1. In `zevylo/src/tools/<category>/index.ts`, export both your definition and component:
   ```typescript
   export { myToolDefinition } from './my-tool.definition';
   export { default as MyCustomTool } from './my-tool';
   ```
2. In `zevylo/src/lib/tools/component-map.tsx`, add the dynamic import:
   ```typescript
   'my-custom-tool': dynamic(() => import('@/tools/text/my-tool'), { ssr: false }),
   ```

### Step 4: Run Auto-Documentation
From the project root:
```bash
npm run docs:all
```
This automatically updates `zevylo/docs/tools/`, generates the Mermaid codebase graph, and updates `README.md` and `ARCHITECTURE.md`.

---

## 🧪 Local Testing & Verification

Before submitting a Pull Request, please ensure all checks pass:

```bash
# 1. Check TypeScript compilation
cd zevylo
npx tsc --noEmit

# 2. Check Next.js build
npm run build

# 3. Generate updated documentation
npm run docs:all
```

---

## 🚀 Submitting a Pull Request

1. Fork the repository and create your feature branch:
   ```bash
   git checkout -b feat/add-my-tool
   ```
2. Commit your changes following conventional commits:
   ```bash
   git commit -m "feat(text): add my-custom-tool utility"
   ```
3. Push to your branch:
   ```bash
   git push origin feat/add-my-tool
   ```
4. Open a Pull Request on GitHub with a description and screenshots if applicable!
