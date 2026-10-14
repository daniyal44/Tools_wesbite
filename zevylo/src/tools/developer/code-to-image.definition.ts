import { ToolDefinition } from '@/lib/tools/types';

export const codeToImageDefinition: ToolDefinition = {
  id: 'developer-code-to-image',
  slug: 'code-to-image',
  name: 'Code to Image Generator',
  shortDescription: 'Generate beautiful syntax-highlighted code images for Twitter, blog posts, and slides.',
  longDescription: 'Turn your source code snippets into gorgeous, shareable images with customizable editor themes (Dracula, Nord, Monokai, Synthwave, GitHub Light), window controls, padding, and vibrant gradient backgrounds. The ultimate free Ray.so alternative.',
  category: 'developer',
  icon: 'code-2',
  keywords: ['code to image', 'code screenshot', 'ray so alternative', 'code snippet card', 'carbon alternative', 'syntax highlighter to png'],
  searchableText: 'code to image generator ray.so carbon code snippet screenshot syntax highlight png export dracula theme',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: true,
  supportsCopy: true,
  seo: {
    title: 'Code to Image Generator — Create Beautiful Code Screenshots | Zevylo',
    description: 'Transform source code snippets into beautiful syntax-highlighted images with themes and gradients. 100% free Ray.so alternative.',
  },
  faq: [
    {
      question: 'Is this an alternative to Ray.so and Carbon?',
      answer: 'Yes! Zevylo Code to Image provides stunning code card exports with customizable padding, multiple IDE themes, window dots, and vibrant gradients without watermarks.',
    },
    {
      question: 'Can I copy the generated code card directly to clipboard?',
      answer: 'Yes, you can click "Copy Image" to instantly paste the PNG into Slack, Discord, Twitter, or Google Docs, or download the high-DPI image.',
    },
    {
      question: 'Is my source code uploaded to any server?',
      answer: 'No. Everything is rendered 100% locally in your browser using the HTML5 Canvas API. Your code never leaves your computer.',
    },
  ],
  relatedTools: ['json-formatter', 'json-to-typescript', 'base64'],
  status: 'active',
  visibility: 'public',
  sortOrder: 6,
  component: 'code-to-image',
};
