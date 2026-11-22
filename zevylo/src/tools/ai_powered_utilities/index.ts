// AI Powered Utilities
import { registerTools } from '@/lib/tools/registry';
import { ToolDefinition } from '@/lib/tools/types';

const tools: ToolDefinition[] = [
  {
    id: 'ai-util-1',
    slug: 'ai-utility',
    name: 'AI Summary Tool',
    shortDescription: 'Summarize text using AI',
    longDescription: 'Generate AI-powered summaries of long text',
    category: 'ai_powered_utilities',
    subcategory: 'summarization',
    icon: 'Brain',
    keywords: ['ai', 'summary', 'text', 'processing'],
    searchableText: 'ai summary tool',
    version: '2.0',
    executionMode: 'ai',
    requiresAuth: true,
    requiresUpload: true,
    supportsBatch: true,
    supportsDownload: true,
    supportsShare: true,
    supportsCopy: true,
    seo: {
      title: 'AI Summary Tool',
      description: 'Generate AI-powered text summaries',
      keywords: ['ai', 'summary', 'text'],
      canonical: undefined,
    },
    relatedTools: [],
    status: 'active',
    visibility: 'public',
    sortOrder: 1,
    component: 'AISummary',
  },
];

registerTools(tools);
